"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface MilestoneStory {
  id: string;
  numberValue: number;
  suffix: string;
  chapter: string;
  title: string;
  story: string;
  highlightTag: string;
  metricLabel: string;
}

const MILESTONES: MilestoneStory[] = [
  {
    id: "step-26w",
    numberValue: 26,
    suffix: "W",
    chapter: "CHƯƠNG 01 // THỜI GIAN & CAM KẾT",
    title: "26 TUẦN CHUYỂN DỊCH TOÀN DIỆN",
    story:
      "Không có đường tắt trong việc làm chủ AI Systems. Nhưng với 26 tuần có lộ trình kiến trúc bài bản, bạn sẽ chuyển hóa từ một kỹ sư phần mềm thông thường thành AI Systems Architect nắm vững bản chất toán học, phần cứng và đa tác tử.",
    highlightTag: "5–7 GIỜ / TUẦN • THIẾT KẾ CHO NGƯỜI ĐI LÀM",
    metricLabel: "THỜI LƯỢNG 26 TUẦN (6 THÁNG)",
  },
  {
    id: "step-180h",
    numberValue: 180,
    suffix: "+",
    chapter: "CHƯƠNG 02 // THỰC CHIẾN MÃ NGUỒN",
    title: "180+ GIỜ CODE TRỰC TIẾP TRÊN MÁY TÍNH",
    story:
      "70% thời lượng là gõ code thật, giải quyết bài toán thật. Bạn sẽ tự tay code một mạng Transformer từ đầu, xây dựng Enterprise RAG triệt tiêu ảo giác, và tinh chỉnh mô hình chạy mượt mà trên 1 GPU thay vì chỉ xem video thụ động.",
    highlightTag: "70% CODE THỰC HÀNH • ZERO TOÁN HỌC RỜI RẠC",
    metricLabel: "TỔNG THỜI LƯỢNG HỌC THỰC CHIẾN",
  },
  {
    id: "step-16x",
    numberValue: 16,
    suffix: "x",
    chapter: "CHƯƠNG 03 // BẢN CHẤT BÁN DẪN 3D",
    title: "16 TENSOR CORES & VĂN HÓA MEMORY-BOUND",
    story:
      "LLM suy luận bị nghẽn ở băng thông bộ nhớ (Memory Bandwidth), chứ không phải xung nhịp tính toán. Phòng thí nghiệm 3D tương tác giúp bạn chạm vào 16 cụm Tensor Core, 4 stack HBM3 và mô phỏng lượng tử hóa FP16/INT8/INT4 trực quan 360°.",
    highlightTag: "3D HARDWARE LAB • 1.2 TB/S HBM3 VRAM",
    metricLabel: "GIẢI PHẪU VI MẠCH BÁN DẪN TƯƠNG TÁC",
  },
  {
    id: "step-100p",
    numberValue: 100,
    suffix: "%",
    chapter: "CHƯƠNG 04 // ĐÍCH ĐẾN DOANH NGHIỆP",
    title: "100% SẴN SÀNG PHỤC VỤ THỰC TẾ (PRODUCTION)",
    story:
      "Sản phẩm đầu ra không phải là bài tập về nhà trên Google Colab. Bạn sẽ đóng gói, deploy vLLM, Triton Server, tối ưu PagedAttention và xây dựng hệ sinh thái Autonomous Multi-Agent chịu tải cao với SLA cấp doanh nghiệp.",
    highlightTag: "CAPSTONE SYSTEM • 100+ REQ/SEC ENTERPRISE READY",
    metricLabel: "ĐÓNG GÓI & DEPLOY PRODUCTION TOÀN DIỆN",
  },
];

export default function StoryStatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [displayedNumber, setDisplayedNumber] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;

      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Map progress to 4 indices [0, 1, 2, 3]
      const index = Math.min(Math.floor(progress * 4), 3);
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Count-Up Effect when activeIndex changes
  useEffect(() => {
    const target = MILESTONES[activeIndex].numberValue;
    let startTimestamp: number | null = null;
    const duration = 750; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out quint
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setDisplayedNumber(Math.round(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [activeIndex]);

  const activeMilestone = MILESTONES[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-[var(--bg-recessed)] transition-colors duration-300">
      {/* Sticky Story Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-12 select-none">
        {/* Subtle background ambient pulse */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-[var(--accent-bioluminescent)]/10 blur-[160px] animate-pulse" />
        </div>

        {/* Outer Grid lines for technological aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Center Stage: The Single Focused Story Element */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 z-10 transition-all duration-500 ease-out">
          {/* Chapter Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-ping" />
            <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase text-[var(--text-mist)] font-medium">
              {activeMilestone.chapter}
            </span>
          </div>

          {/* Giant Heroic Number (Zoom in & Count up) */}
          <div className="relative flex items-baseline justify-center">
            <span className="text-[96px] sm:text-[140px] md:text-[180px] font-medium tracking-[-0.05em] text-[var(--accent-phosphor)] leading-none drop-shadow-[0_4px_24px_rgba(0,180,170,0.18)] tabular-nums transition-transform duration-300 scale-100">
              {displayedNumber}
            </span>
            <span className="text-[52px] sm:text-[76px] md:text-[96px] font-medium text-[var(--accent-aqua)] tracking-tight leading-none ml-1">
              {activeMilestone.suffix}
            </span>
          </div>

          {/* Metric Subtitle */}
          <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.12em] text-[var(--text-mist)] font-medium">
            {activeMilestone.metricLabel}
          </div>

          {/* Story Headline */}
          <h2 className="text-[26px] sm:text-[36px] md:text-[42px] font-medium uppercase tracking-[-0.03em] text-[var(--text-primary)] leading-tight max-w-2xl">
            {activeMilestone.title}
          </h2>

          {/* Narrative Paragraph */}
          <p className="max-w-2xl text-[15px] sm:text-[17px] text-[var(--text-secondary)] leading-[1.55] font-normal">
            {activeMilestone.story}
          </p>

          {/* Feature Highlight Pill */}
          <div className="pt-2">
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)] text-[12px] font-mono tracking-wider uppercase text-[var(--text-primary)] shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-bioluminescent)] shrink-0" />
              <span>{activeMilestone.highlightTag}</span>
            </span>
          </div>
        </div>

        {/* Right Story Progression Nav (Chapter 01 - 04) */}
        <div className="hidden md:flex absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 flex-col space-y-4 z-20">
          {MILESTONES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                if (!containerRef.current) return;
                const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
                const targetScroll = containerRef.current.offsetTop + (idx / 4) * totalHeight + 20;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
              className={`flex items-center space-x-3 transition-all duration-300 text-left cursor-pointer group ${
                idx === activeIndex
                  ? "opacity-100 scale-105"
                  : "opacity-35 hover:opacity-75"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "bg-[var(--accent-aqua)] ring-4 ring-[var(--accent-bioluminescent)]/30 scale-125"
                    : "bg-[var(--border-main)] group-hover:bg-[var(--text-secondary)]"
                }`}
              />
              <span
                className={`text-[11px] font-mono uppercase tracking-wider ${
                  idx === activeIndex
                    ? "text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                0{idx + 1} // {item.suffix === "W" ? "26W" : item.suffix === "+" ? "180+" : item.suffix === "x" ? "16x" : "100%"}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Scroll Prompt Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none opacity-70">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--text-secondary)]">
            {scrollProgress < 0.95 ? "CUỘN XUỐNG ĐỂ TIẾP TỤC CÂU CHUYỆN" : "HOÀN TẤT CÁC CỘT MỐC // SẴN SÀNG KHÁM PHÁ"}
          </span>
          <div className="w-5 h-8 rounded-full border border-[var(--border-main)] flex items-start justify-center p-1">
            <div className="w-1.5 h-2 rounded-full bg-[var(--accent-aqua)] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
