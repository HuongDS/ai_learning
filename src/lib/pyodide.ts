"use client";

/**
 * Singleton Pyodide WebAssembly Runner for Auros AI Lab
 * Runs full CPython 3.12+ directly in the browser via WebAssembly
 */

declare global {
  interface Window {
    loadPyodide?: (options: {
      indexURL: string;
      stdout?: (text: string) => void;
      stderr?: (text: string) => void;
    }) => Promise<any>;
  }
}

export type PyodideStatus = "idle" | "loading" | "ready" | "running" | "error";

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  result?: any;
  executionTimeMs: number;
}

let pyodideInstance: any = null;
let pyodideLoadingPromise: Promise<any> | null = null;
let currentStdoutHandler: ((text: string) => void) | null = null;
let currentStderrHandler: ((text: string) => void) | null = null;

const PYODIDE_CDN_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
const PYODIDE_SCRIPT_URL = `${PYODIDE_CDN_URL}pyodide.js`;

/**
 * Dynamically loads the Pyodide script tag if not already injected
 */
function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Pyodide can only run in the browser."));
      return;
    }

    if (window.loadPyodide) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src="${PYODIDE_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.src = PYODIDE_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(new Error(`Không thể nạp Pyodide Wasm từ CDN: ${err}`));
    document.head.appendChild(script);
  });
}

/**
 * Returns or initializes the singleton Pyodide instance
 */
export async function getPyodideInstance(
  onStatusUpdate?: (status: string) => void
): Promise<any> {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (pyodideLoadingPromise) {
    return pyodideLoadingPromise;
  }

  pyodideLoadingPromise = (async () => {
    onStatusUpdate?.("Đang tải script Pyodide WebAssembly (CDN)...");
    await loadScript();

    if (!window.loadPyodide) {
      throw new Error("window.loadPyodide is not defined after script load.");
    }

    onStatusUpdate?.("Đang biên dịch CPython 3.12 WebAssembly Runtime...");
    const pyodide = await window.loadPyodide({
      indexURL: PYODIDE_CDN_URL,
      stdout: (text: string) => {
        if (currentStdoutHandler) currentStdoutHandler(text);
      },
      stderr: (text: string) => {
        if (currentStderrHandler) currentStderrHandler(text);
      },
    });

    pyodideInstance = pyodide;
    onStatusUpdate?.("Python WebAssembly đã sẵn sàng!");
    return pyodide;
  })();

  try {
    return await pyodideLoadingPromise;
  } catch (err) {
    pyodideLoadingPromise = null;
    throw err;
  }
}

/**
 * Executes Python code inside Pyodide with stdout/stderr capture and runtime measurement
 */
export async function executePythonCode(
  code: string,
  options?: {
    requiredPackages?: string[];
    onStdout?: (text: string) => void;
    onStderr?: (text: string) => void;
    onStatusUpdate?: (status: string) => void;
  }
): Promise<ExecutionResult> {
  const startTime = performance.now();
  let accumulatedStdout = "";
  let accumulatedStderr = "";

  currentStdoutHandler = (text: string) => {
    accumulatedStdout += text + "\n";
    options?.onStdout?.(text);
  };

  currentStderrHandler = (text: string) => {
    accumulatedStderr += text + "\n";
    options?.onStderr?.(text);
  };

  try {
    const pyodide = await getPyodideInstance(options?.onStatusUpdate);

    // Auto-detect and load extra packages (e.g. numpy)
    const packagesToLoad: string[] = [...(options?.requiredPackages || [])];
    if (code.includes("import numpy") || code.includes("from numpy")) {
      if (!packagesToLoad.includes("numpy")) packagesToLoad.push("numpy");
    }

    if (packagesToLoad.length > 0) {
      options?.onStatusUpdate?.(`Đang nạp thư viện Wasm: ${packagesToLoad.join(", ")}...`);
      await pyodide.loadPackage(packagesToLoad);
    }

    options?.onStatusUpdate?.("Đang thực thi mã nguồn Python...");
    const result = await pyodide.runPythonAsync(code);
    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      success: true,
      stdout: accumulatedStdout,
      stderr: accumulatedStderr,
      result,
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    const errorString = err?.message || String(err);
    accumulatedStderr += (accumulatedStderr ? "\n" : "") + errorString;

    return {
      success: false,
      stdout: accumulatedStdout,
      stderr: accumulatedStderr,
      executionTimeMs,
    };
  } finally {
    currentStdoutHandler = null;
    currentStderrHandler = null;
  }
}
