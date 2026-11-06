import OpenAI from "openai";
import { DispatchData, GitHubRepoItem } from "./types";
import { fetchRepoReadme } from "./github";

export async function generateDispatchWithOpenAI(
  repos: GitHubRepoItem[],
  customApiKey?: string
): Promise<DispatchData> {
  const apiKey = customApiKey || process.env.OPENAI_API_KEY;

  const topRepo = repos[0];
  const otherRepos = repos.slice(1, 5);

  // If no OpenAI key is configured yet, return a high-quality fallback curated response
  if (!apiKey) {
    return createCuratedFallback(topRepo, otherRepos);
  }

  try {
    const openai = new OpenAI({ apiKey });

    // Fetch brief readme of the top repo for deep analysis
    const readmeContext = await fetchRepoReadme(topRepo.fullName);

    const promptContext = `
TOP REPOSITORIES TODAY:
1. ${topRepo.fullName} (${topRepo.stars} stars, ${topRepo.language}): ${topRepo.description}
Topics: ${topRepo.topics.join(", ")}
${readmeContext ? `README EXCERPT:\n${readmeContext.slice(0, 1200)}` : ""}

OTHER NOTABLE REPOS TODAY:
${otherRepos.map((r, i) => `${i + 2}. ${r.fullName} (${r.stars} stars): ${r.description}`).join("\n")}
`;

    const systemPrompt = `
You are the Chief AI Curator at ORYZO AI Lab. Your role is to examine today's hottest AI open-source codebases and synthesize an inspiring, high-signal, darkroom-editorial Daily AI Dispatch for software engineers learning AI.

Tone: Authoritative, pragmatic, museum-editorial, zero fluff, fluent Vietnamese with standard technical terms preserved (GEMM, Tensor Cores, VRAM, Quantization, KV-Cache, LoRA, Attention).

You must respond ONLY with a valid JSON object matching this TypeScript interface:
{
  "headline": string (5-8 words in Vietnamese, uppercase, e.g. "ĐỘT PHÁ TỐI ƯU HÓA NHÂN INFERENCE & BĂNG THÔNG HBM"),
  "tag": string (uppercase, e.g. "ARCHITECTURE SHIFT" or "INFERENCE SPEEDUP"),
  "quote": string (1-2 sentences in Vietnamese, conversational tone, explaining the fundamental breakthrough in today's open source AI developments),
  "keyTakeaway": string (1-2 sentences of actionable advice for a software engineer building AI products),
  "hotRepo": {
    "name": string (full name),
    "description": string (in Vietnamese),
    "url": string,
    "stars": string (e.g. "35.2k"),
    "forks": string,
    "whyItMatters": string (1-2 sentences explaining why this repo is revolutionary),
    "howToTry": string[] (3 short CLI steps to clone, setup env, and run sample inference)
  },
  "otherTopRepos": [
    {
      "name": string,
      "url": string,
      "stars": string,
      "description": string (in Vietnamese),
      "highlight": string (what makes this repo worth bookmarking)
    }
  ],
  "microChallenge": {
    "title": string (Tiêu đề thử thách thực hành),
    "task": string (Đề bài cụ thể: ví dụ tải model, cấu hình hoặc viết code test),
    "expectedOutcome": string (Kết quả kỳ vọng thu được)
  }
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast, cost-effective, great structured reasoning
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the live GitHub intelligence today:\n${promptContext}` },
      ],
      temperature: 0.4,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const parsed = JSON.parse(content);
    const now = new Date();
    const issueNum = String(Math.floor((Date.now() - new Date("2026-09-01").getTime()) / 86400000)).padStart(3, "0");

    const result: DispatchData = {
      id: `dispatch-${now.toISOString().split("T")[0]}`,
      issueNumber: issueNum,
      date: `${now.getDate()} THÁNG ${now.getMonth() + 1}, ${now.getFullYear()}`,
      timestamp: Date.now(),
      headline: parsed.headline || "BẢN TIN CÔNG NGHỆ AI TOÀN CẦU",
      tag: parsed.tag || "RADAR INTELLIGENCE",
      quote: parsed.quote || "Công nghệ AI đang chuyển dịch mạnh mẽ từ quy mô tham số sang hiệu suất suy luận và tính toán vi mô.",
      keyTakeaway: parsed.keyTakeaway || "Tối ưu hóa bộ nhớ và tính toán lượng tử hóa là chìa khóa để triển khai AI thực tế.",
      hotRepo: {
        name: parsed.hotRepo?.name || topRepo.fullName,
        description: parsed.hotRepo?.description || topRepo.description,
        url: parsed.hotRepo?.url || topRepo.url,
        stars: parsed.hotRepo?.stars || `${(topRepo.stars / 1000).toFixed(1)}k`,
        forks: parsed.hotRepo?.forks || `${(topRepo.forks / 1000).toFixed(1)}k`,
        whyItMatters: parsed.hotRepo?.whyItMatters || "Đột phá về tốc độ phục vụ mô hình.",
        howToTry: parsed.hotRepo?.howToTry || [
          `git clone ${topRepo.url}`,
          "pip install -e .",
          "python -m examples.quickstart",
        ],
      },
      otherTopRepos: parsed.otherTopRepos || otherRepos.map((r) => ({
        name: r.fullName,
        url: r.url,
        stars: `${(r.stars / 1000).toFixed(1)}k`,
        description: r.description,
        highlight: `Ngôn ngữ: ${r.language}`,
      })),
      microChallenge: parsed.microChallenge || {
        title: "Thử nghiệm Inference với Repo hôm nay",
        task: `Clone repo ${topRepo.name} về máy cá nhân và đo lường thời gian đáp ứng (latency).`,
        expectedOutcome: "Hiểu được cách cấu trúc code của thư viện inference mã nguồn mở hàng đầu.",
      },
      generatedBy: "openai_gpt4o",
    };

    return result;
  } catch (error) {
    console.error("[OpenAI Agent] Error generating dispatch:", error);
    return createCuratedFallback(topRepo, otherRepos);
  }
}

function createCuratedFallback(
  topRepo: GitHubRepoItem,
  otherRepos: GitHubRepoItem[]
): DispatchData {
  const now = new Date();
  const issueNum = String(Math.floor((Date.now() - new Date("2026-09-01").getTime()) / 86400000)).padStart(3, "0");

  return {
    id: `dispatch-${now.toISOString().split("T")[0]}`,
    issueNumber: issueNum,
    date: `${now.getDate()} THÁNG ${now.getMonth() + 1}, ${now.getFullYear()}`,
    timestamp: Date.now(),
    headline: "TỐI ƯU HÓA INFERENCE & BĂNG THÔNG HBM CHO MÔ HÌNH SUY LUẬN",
    tag: "LIVE INTELLIGENCE",
    quote:
      "Tối ưu hóa Tensor Cores và giảm độ chính xác xuống INT4 không làm suy giảm năng lực suy luận đa bước, mà ngược lại tăng thông lượng tính toán lên gấp 3.2 lần trên phần cứng phổ thông.",
    keyTakeaway:
      "Lời khuyên cho AI Engineer: Băng thông bộ nhớ (Memory Bandwidth) là nút thắt cổ chai lớn nhất khi chạy suy luận LLM, chứ không phải xung nhịp tính toán thuần túy. Hãy luôn bắt đầu từ việc tối ưu hóa Memory-bound.",
    hotRepo: {
      name: topRepo.fullName,
      description: "Thư viện phục vụ inference và serving LLM với thông lượng cao nhất hiện nay nhờ PagedAttention và nhân FP8 GEMM tối ưu.",
      url: topRepo.url,
      stars: `${(topRepo.stars / 1000).toFixed(1)}k`,
      forks: `${(topRepo.forks / 1000).toFixed(1)}k`,
      whyItMatters: "Giảm 60% lãng phí VRAM thông qua quản lý bộ nhớ phân trang PagedAttention và hỗ trợ FP8 GEMM kernels trực tiếp.",
      howToTry: [
        "git clone https://github.com/vllm-project/vllm",
        "pip install vllm",
        "vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000",
      ],
    },
    otherTopRepos: otherRepos.map((r) => ({
      name: r.fullName,
      url: r.url,
      stars: `${(r.stars / 1000).toFixed(1)}k`,
      description: r.description,
      highlight: `Chủ đề hot: ${r.topics.slice(0, 3).join(", ") || r.language}`,
    })),
    microChallenge: {
      title: "Chạy thử nghiệm Serving API với mô hình cục bộ",
      task: "Tải vllm hoặc llama.cpp về, khởi chạy một OpenAI-compatible API server cục bộ trên máy và dùng curl để test sinh 50 tokens.",
      expectedOutcome: "Làm chủ việc dựng API endpoint AI cục bộ thay vì chỉ phụ thuộc vào OpenAI Cloud API.",
    },
    generatedBy: "curated_fallback",
  };
}
