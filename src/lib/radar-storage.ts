import fs from "fs";
import path from "path";
import { DispatchData } from "./types";
import { fetchTrendingAIRepos } from "./github";
import { generateDispatchWithOpenAI } from "./openai-agent";

const DATA_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(DATA_DIR, "dispatches.json");

// In-memory cache fallback for fast response
let memoryCache: DispatchData | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadAllDispatches(): DispatchData[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("[Storage] Failed to read dispatches.json:", err);
    return [];
  }
}

function saveDispatch(dispatch: DispatchData) {
  try {
    ensureDataDir();
    const all = loadAllDispatches();
    // Replace if same id exists, or unshift
    const filtered = all.filter((d) => d.id !== dispatch.id);
    filtered.unshift(dispatch);
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(filtered.slice(0, 30), null, 2), "utf-8");
    memoryCache = dispatch;
  } catch (err) {
    console.error("[Storage] Failed to save dispatch:", err);
  }
}

export async function getTodayDispatch(
  forceSync = false,
  customApiKey?: string
): Promise<DispatchData> {
  const todayId = `dispatch-${new Date().toISOString().split("T")[0]}`;

  // If not forcing sync, check memory or file cache first
  if (!forceSync) {
    if (memoryCache && memoryCache.id === todayId) {
      return memoryCache;
    }

    const all = loadAllDispatches();
    const existing = all.find((d) => d.id === todayId);
    if (existing) {
      memoryCache = existing;
      return existing;
    }
  }

  // Generate new dispatch using live GitHub + OpenAI pipeline
  console.log(`[Radar Pipeline] Generating fresh dispatch (forceSync: ${forceSync})...`);
  const repos = await fetchTrendingAIRepos();
  const dispatch = await generateDispatchWithOpenAI(repos, customApiKey);

  // Save to persistent storage
  saveDispatch(dispatch);
  return dispatch;
}

export function getDispatchHistory(): DispatchData[] {
  return loadAllDispatches();
}
