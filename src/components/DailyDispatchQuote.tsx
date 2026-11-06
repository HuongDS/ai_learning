"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, RefreshCw, GitFork, ExternalLink } from "lucide-react";

interface DailyDispatchQuoteProps {
  onOpenRepoMission?: () => void;
}

export default function DailyDispatchQuote({ onOpenRepoMission }: DailyDispatchQuoteProps) {
  const [copied, setCopied] = useState(false);

  // Dynamic Daily AI Dispatch Data (This will be fetched from our GPT Cronjob in Phase 2)
  const dispatchData = {
    issueNumber: "042",
    date: "05 NOV 2026",
    headline: "DEEPSEEK & LLAMA-3 REASONING MATRIX",
    quote:
      "Tối ưu hóa Tensor Cores và giảm độ chính xác xuống INT4 không làm suy giảm năng lực suy luận đa bước, mà ngược lại tăng thông lượng tính toán lên gấp 3.2 lần trên phần cứng phổ thông.",
    sourceTitle: "vllm-project / vllm (PR #14022: Scaled FP8 GEMM kernels)",
    githubUrl: "https://github.com/vllm-project/vllm",
    aiInsight:
      "Lời khuyên hôm nay: Băng thông bộ nhớ (Memory Bandwidth) là nút thắt cổ chai lớn hơn nhiều so với tốc độ tính toán thuần túy. Hãy luôn bắt đầu từ tối ưu hóa Memory-bound.",
  };

  return (
    <div className="w-full max-w-2xl bg-[#18100a]/80 backdrop-blur-md border border-[#40372e] rounded-[12px] p-6 relative overflow-hidden transition-all duration-300 hover:border-[#6c5f51]">
      {/* Top Meta Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#dc5000] animate-pulse" />
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#ffedd7]">
            DISPATCH #{dispatchData.issueNumber} // {dispatchData.date}
          </span>
          <span className="text-[10px] text-[#dc5000] tracking-wider uppercase font-medium px-2 py-0.5 rounded-full border border-[#dc5000]/30 bg-[#dc5000]/10">
            DAILY AI RADAR
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-wider text-[#6c5f51]">
          CURATED BY GPT-4o
        </span>
      </div>

      {/* Dashed Hairline Divider */}
      <div className="border-dashed-hairline my-3" />

      {/* Conversational Quote (Mixed-case weight 400 as per DESIGN.md) */}
      <div className="py-2">
        <blockquote className="text-[20px] sm:text-[23px] font-normal leading-[1.3] text-[#ffedd7]">
          &ldquo;{dispatchData.quote}&rdquo;
        </blockquote>
      </div>

      {/* Insight Micro-body */}
      <p className="text-[13px] text-[#ffedd7]/70 font-normal leading-relaxed mt-2">
        <span className="text-[#dc5000] font-medium mr-1.5 uppercase text-[11px]">Key Takeaway:</span>
        {dispatchData.aiInsight}
      </p>

      {/* Dashed Divider */}
      <div className="border-dashed-hairline my-4" />

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <a
          href={dispatchData.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 text-[11px] uppercase tracking-wider text-[#ffedd7]/80 hover:text-[#dc5000] transition-colors"
        >
          <GitFork className="w-3.5 h-3.5 text-[#dc5000]" />
          <span className="font-mono truncate max-w-[280px] sm:max-w-none">
            {dispatchData.sourceTitle}
          </span>
          <ArrowUpRight className="w-3 h-3 ml-0.5" />
        </a>

        {onOpenRepoMission && (
          <button
            onClick={onOpenRepoMission}
            className="h-[32px] px-4 rounded-[22.5px] border border-[#ffedd7]/40 hover:border-[#ffedd7] bg-transparent text-[#ffedd7] text-[11px] font-medium tracking-wider uppercase transition-all duration-200 hover:bg-[#382416]"
          >
            THỰC HÀNH VỚI REPO NÀY
          </button>
        )}
      </div>
    </div>
  );
}
