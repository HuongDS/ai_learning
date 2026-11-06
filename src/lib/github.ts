import { GitHubRepoItem } from "./types";

const FALLBACK_REPOS: GitHubRepoItem[] = [
  {
    name: "vllm",
    fullName: "vllm-project/vllm",
    url: "https://github.com/vllm-project/vllm",
    description: "A high-throughput and memory-efficient inference and serving engine for LLMs with PagedAttention and FP8 GEMM kernels.",
    stars: 35200,
    forks: 5300,
    language: "Python",
    topics: ["llm", "inference", "pytorch", "cuda", "serving"],
    updatedAt: new Date().toISOString(),
  },
  {
    name: "DeepSeek-V3",
    fullName: "deepseek-ai/DeepSeek-V3",
    url: "https://github.com/deepseek-ai/DeepSeek-V3",
    description: "An advanced strong Mixture-of-Experts (MoE) language model with Multi-head Latent Attention (MLA) and DeepSeekMoE architecture.",
    stars: 48900,
    forks: 6700,
    language: "Python",
    topics: ["llm", "moe", "deep-learning", "reasoning"],
    updatedAt: new Date().toISOString(),
  },
  {
    name: "llama.cpp",
    fullName: "ggerganov/llama.cpp",
    url: "https://github.com/ggerganov/llama.cpp",
    description: "LLM inference in C/C++ with 1.5-bit to 8-bit quantization on CPUs and commodity GPUs without dependencies.",
    stars: 72400,
    forks: 10800,
    language: "C++",
    topics: ["llm", "quantization", "gguf", "c-plus-plus"],
    updatedAt: new Date().toISOString(),
  },
  {
    name: "ollama",
    fullName: "ollama/ollama",
    url: "https://github.com/ollama/ollama",
    description: "Get up and running with Llama 3.3, Mistral, Gemma 2, and other large language models locally.",
    stars: 112000,
    forks: 9400,
    language: "Go",
    topics: ["llm", "local-ai", "inference", "macos"],
    updatedAt: new Date().toISOString(),
  },
  {
    name: "modelcontextprotocol",
    fullName: "modelcontextprotocol/servers",
    url: "https://github.com/modelcontextprotocol/servers",
    description: "Model Context Protocol (MCP) reference servers enabling LLMs to securely interact with local databases, tools, and developer environments.",
    stars: 28500,
    forks: 3200,
    language: "TypeScript",
    topics: ["mcp", "agents", "llm-tools", "protocols"],
    updatedAt: new Date().toISOString(),
  },
];

export async function fetchTrendingAIRepos(): Promise<GitHubRepoItem[]> {
  try {
    // Search for hot AI repos updated recently with high star activity
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    const dateStr = oneMonthAgo.toISOString().split("T")[0];

    const query = encodeURIComponent(`topic:llm OR topic:ai-agents OR topic:inference pushed:>${dateStr} stars:>500`);
    const apiUrl = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=6`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Oryzo-AI-Lab-Radar",
      },
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[GitHub API] Returned ${res.status}, falling back to curated list.`);
      return FALLBACK_REPOS;
    }

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return FALLBACK_REPOS;
    }

    const repos: GitHubRepoItem[] = data.items.map((item: any) => ({
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

    return repos;
  } catch (err) {
    console.warn("[GitHub API] Fetch failed or timed out:", err);
    return FALLBACK_REPOS;
  }
}

export async function fetchRepoReadme(fullName: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/readme`, {
      headers: {
        Accept: "application/vnd.github.raw+json",
        "User-Agent": "Oryzo-AI-Lab-Radar",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;
    const text = await res.text();
    // Return first 2000 chars for prompt context
    return text.slice(0, 2000);
  } catch {
    return null;
  }
}
