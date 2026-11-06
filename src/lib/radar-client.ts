import { DispatchData, GitHubRepoItem } from "./types";

const FALLBACK_DISPATCH: DispatchData = {
  id: "dispatch-2026-11-06",
  issueNumber: "043",
  date: "06 THÁNG 11, 2026",
  timestamp: Date.now(),
  headline: "TỐI ƯU HÓA INFERENCE & BĂNG THÔNG HBM CHO MÔ HÌNH SUY LUẬN",
  tag: "LIVE INTELLIGENCE",
  quote:
    "Tối ưu hóa Tensor Cores và giảm độ chính xác xuống INT4 không làm suy giảm năng lực suy luận đa bước, mà ngược lại tăng thông lượng tính toán lên gấp 3.2 lần trên phần cứng phổ thông.",
  keyTakeaway:
    "Lời khuyên cho AI Engineer: Băng thông bộ nhớ (Memory Bandwidth) là nút thắt cổ chai lớn nhất khi chạy suy luận LLM, chứ không phải xung nhịp tính toán thuần túy. Hãy luôn bắt đầu từ việc tối ưu hóa Memory-bound.",
  hotRepo: {
    name: "vllm-project / vllm",
    description: "Thư viện phục vụ inference và serving LLM với thông lượng cao nhất hiện nay nhờ PagedAttention và nhân FP8 GEMM tối ưu.",
    url: "https://github.com/vllm-project/vllm",
    stars: "35.2k",
    forks: "5.3k",
    whyItMatters: "Giảm 60% lãng phí VRAM thông qua quản lý bộ nhớ phân trang PagedAttention và hỗ trợ FP8 GEMM kernels trực tiếp.",
    howToTry: [
      "git clone https://github.com/vllm-project/vllm",
      "pip install vllm",
      "vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000",
    ],
  },
  otherTopRepos: [
    {
      name: "deepseek-ai / DeepSeek-V3",
      url: "https://github.com/deepseek-ai/DeepSeek-V3",
      stars: "48.9k",
      description: "Mô hình MoE mã nguồn mở với Multi-head Latent Attention (MLA) tối ưu hóa VRAM vượt trội.",
      highlight: "Chủ đề: MoE, Reasoning",
    },
    {
      name: "ggerganov / llama.cpp",
      url: "https://github.com/ggerganov/llama.cpp",
      stars: "72.4k",
      description: "Suy luận LLM bằng C/C++ thuần túy với lượng tử hóa 1.5-bit đến 8-bit trên CPU và GPU phổ thông.",
      highlight: "Chủ đề: Quantization, GGUF",
    },
    {
      name: "ollama / ollama",
      url: "https://github.com/ollama/ollama",
      stars: "112k",
      description: "Công cụ chạy cục bộ các mô hình Llama 3.3, Mistral, Gemma 2 nhanh nhất hiện nay.",
      highlight: "Chủ đề: Local AI, CLI",
    },
    {
      name: "modelcontextprotocol / servers",
      url: "https://github.com/modelcontextprotocol/servers",
      stars: "28.5k",
      description: "Chuẩn giao thức MCP giúp LLM kết nối an toàn với database, terminal và môi trường dev.",
      highlight: "Chủ đề: MCP, Agents",
    },
  ],
  microChallenge: {
    title: "Chạy thử nghiệm Serving API với mô hình cục bộ",
    task: "Tải vllm hoặc llama.cpp về, khởi chạy một OpenAI-compatible API server cục bộ trên máy và dùng curl để test sinh 50 tokens.",
    expectedOutcome: "Làm chủ việc dựng API endpoint AI cục bộ thay vì chỉ phụ thuộc vào OpenAI Cloud API.",
  },
  generatedBy: "curated_fallback",
};

export async function fetchLiveGitHubRepos(): Promise<GitHubRepoItem[]> {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    const dateStr = oneMonthAgo.toISOString().split("T")[0];

    const query = encodeURIComponent(`topic:llm OR topic:ai-agents OR topic:inference pushed:>${dateStr} stars:>500`);
    const apiUrl = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=6`;

    const res = await fetch(apiUrl, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (!res.ok) return [];
    const data = await res.json();
    if (!data.items) return [];

    return data.items.map((item: any) => ({
      name: item.name,
      fullName: item.full_name,
      url: item.html_url,
      description: item.description || "Cutting-edge open source AI repository.",
      stars: item.stargazers_count,
      forks: item.forks_count,
      language: item.language || "Python",
      topics: item.topics || [],
      updatedAt: item.pushed_at,
    }));
  } catch (err) {
    console.warn("Client GitHub fetch fallback:", err);
    return [];
  }
}

export async function getOrLoadRadarDispatch(): Promise<DispatchData> {
  if (typeof window === "undefined") return FALLBACK_DISPATCH;

  try {
    const cached = localStorage.getItem("oryzo_cached_dispatch");
    if (cached) {
      const parsed = JSON.parse(cached);
      const isToday = new Date(parsed.timestamp).toDateString() === new Date().toDateString();
      if (isToday) return parsed;
    }
  } catch {}

  return FALLBACK_DISPATCH;
}

export async function syncRadarLiveWithAI(apiKey?: string): Promise<DispatchData> {
  const effectiveKey = apiKey || (typeof window !== "undefined" ? localStorage.getItem("oryzo_openai_api_key") || "" : "");

  const repos = await fetchLiveGitHubRepos();
  const topRepo = repos[0];
  const otherRepos = repos.slice(1, 5);

  if (!effectiveKey || !effectiveKey.startsWith("sk-") || !topRepo) {
    return FALLBACK_DISPATCH;
  }

  try {
    const promptContext = `
TOP REPOSITORIES TODAY:
1. ${topRepo.fullName} (${topRepo.stars} stars, ${topRepo.language}): ${topRepo.description}
Topics: ${topRepo.topics.join(", ")}

OTHER NOTABLE REPOS:
${otherRepos.map((r, i) => `${i + 2}. ${r.fullName} (${r.stars} stars): ${r.description}`).join("\n")}
`;

    const systemPrompt = `
You are the Chief AI Curator at ORYZO AI Lab. Examine today's hottest AI open-source codebases and synthesize an inspiring, high-signal, darkroom-editorial Daily AI Dispatch for software engineers learning AI.
Tone: Authoritative, pragmatic, museum-editorial, fluent Vietnamese with standard technical terms preserved.
Respond ONLY with a valid JSON matching this schema:
{
  "headline": string (uppercase, in Vietnamese, 5-8 words),
  "tag": string (uppercase),
  "quote": string (1-2 sentences in Vietnamese, conversational tone, explaining the breakthrough),
  "keyTakeaway": string (actionable advice for software engineers),
  "hotRepo": {
    "name": string,
    "description": string (in Vietnamese),
    "url": string,
    "stars": string,
    "forks": string,
    "whyItMatters": string,
    "howToTry": string[] (3 short CLI steps to clone, setup, and run sample inference)
  },
  "otherTopRepos": [
    {
      "name": string,
      "url": string,
      "stars": string,
      "description": string (in Vietnamese),
      "highlight": string
    }
  ],
  "microChallenge": {
    "title": string,
    "task": string,
    "expectedOutcome": string
  }
}
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${effectiveKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Live GitHub intelligence:\n${promptContext}` },
        ],
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      console.warn("OpenAI API returned", res.status);
      return FALLBACK_DISPATCH;
    }

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    const now = new Date();
    const issueNum = String(Math.floor((Date.now() - new Date("2026-09-01").getTime()) / 86400000)).padStart(3, "0");

    const newDispatch: DispatchData = {
      id: `dispatch-${now.toISOString().split("T")[0]}`,
      issueNumber: issueNum,
      date: `${now.getDate()} THÁNG ${now.getMonth() + 1}, ${now.getFullYear()}`,
      timestamp: Date.now(),
      headline: parsed.headline || "BẢN TIN CÔNG NGHỆ AI TOÀN CẦU",
      tag: parsed.tag || "RADAR INTELLIGENCE",
      quote: parsed.quote || FALLBACK_DISPATCH.quote,
      keyTakeaway: parsed.keyTakeaway || FALLBACK_DISPATCH.keyTakeaway,
      hotRepo: {
        name: parsed.hotRepo?.name || topRepo.fullName,
        description: parsed.hotRepo?.description || topRepo.description,
        url: parsed.hotRepo?.url || topRepo.url,
        stars: parsed.hotRepo?.stars || `${(topRepo.stars / 1000).toFixed(1)}k`,
        forks: parsed.hotRepo?.forks || `${(topRepo.forks / 1000).toFixed(1)}k`,
        whyItMatters: parsed.hotRepo?.whyItMatters || "Đột phá về hiệu năng.",
        howToTry: parsed.hotRepo?.howToTry || [
          `git clone ${topRepo.url}`,
          "pip install -e .",
          "python main.py",
        ],
      },
      otherTopRepos: parsed.otherTopRepos || otherRepos.map((r) => ({
        name: r.fullName,
        url: r.url,
        stars: `${(r.stars / 1000).toFixed(1)}k`,
        description: r.description,
        highlight: `Ngôn ngữ: ${r.language}`,
      })),
      microChallenge: parsed.microChallenge || FALLBACK_DISPATCH.microChallenge,
      generatedBy: "openai_gpt4o",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("oryzo_cached_dispatch", JSON.stringify(newDispatch));
    }
    return newDispatch;
  } catch (err) {
    console.error("Client AI sync error:", err);
    return FALLBACK_DISPATCH;
  }
}
