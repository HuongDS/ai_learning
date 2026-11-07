"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

interface MilestoneStory {
  id: string;
  numberValue: number;
  suffix: string;
  chapterNumber: string;
  chapterTitle: string;
  headline: string;
  story: string;
  highlightTag: string;
  metricLabel: string;
}

const MILESTONES: MilestoneStory[] = [
  {
    id: "chapter-26w",
    numberValue: 26,
    suffix: "W",
    chapterNumber: "01",
    chapterTitle: "CHƯƠNG 01 // THỜI GIAN & CAM KẾT",
    headline: "26 TUẦN CHUYỂN DỊCH TOÀN DIỆN",
    story:
      "Không có đường tắt trong việc làm chủ AI Systems. Nhưng với 26 tuần có lộ trình kiến trúc bài bản, bạn sẽ chuyển hóa từ một kỹ sư phần mềm thông thường thành AI Systems Architect nắm vững bản chất toán học, phần cứng và đa tác tử.",
    highlightTag: "5–7 GIỜ / TUẦN • THIẾT KẾ CHO NGƯỜI ĐI LÀM",
    metricLabel: "THỜI LƯỢNG 26 TUẦN (6 THÁNG)",
  },
  {
    id: "chapter-180h",
    numberValue: 180,
    suffix: "+",
    chapterNumber: "02",
    chapterTitle: "CHƯƠNG 02 // THỰC CHIẾN MÃ NGUỒN",
    headline: "180+ GIỜ CODE TRỰC TIẾP TRÊN MÁY TÍNH",
    story:
      "70% thời lượng là gõ code thật, giải quyết bài toán thật. Bạn sẽ tự tay code một mạng Transformer từ đầu, xây dựng Enterprise RAG triệt tiêu ảo giác, và tinh chỉnh mô hình chạy mượt mà trên 1 GPU thay vì chỉ xem video thụ động.",
    highlightTag: "70% CODE THỰC HÀNH • ZERO TOÁN HỌC RỜI RẠC",
    metricLabel: "TỔNG THỜI LƯỢNG HỌC THỰC CHIẾN",
  },
  {
    id: "chapter-16x",
    numberValue: 16,
    suffix: "x",
    chapterNumber: "03",
    chapterTitle: "CHƯƠNG 03 // BẢN CHẤT BÁN DẪN 3D",
    headline: "16 TENSOR CORES & VĂN HÓA MEMORY-BOUND",
    story:
      "LLM suy luận bị nghẽn ở băng thông bộ nhớ (Memory Bandwidth), chứ không phải xung nhịp tính toán. Phòng thí nghiệm 3D tương tác giúp bạn chạm vào 16 cụm Tensor Core, 4 stack HBM3 và mô phỏng lượng tử hóa FP16/INT8/INT4 trực quan 360°.",
    highlightTag: "3D HARDWARE LAB • 1.2 TB/S HBM3 VRAM",
    metricLabel: "GIẢI PHẪU VI MẠCH BÁN DẪN TƯƠNG TÁC",
  },
  {
    id: "chapter-100p",
    numberValue: 100,
    suffix: "%",
    chapterNumber: "04",
    chapterTitle: "CHƯƠNG 04 // ĐÍCH ĐẾN DOANH NGHIỆP",
    headline: "100% SẴN SÀNG PHỤC VỤ THỰC TẾ (PRODUCTION)",
    story:
      "Sản phẩm đầu ra không phải là bài tập về nhà trên Google Colab. Bạn sẽ đóng gói, deploy vLLM, Triton Server, tối ưu PagedAttention và xây dựng hệ sinh thái Autonomous Multi-Agent chịu tải cao với SLA cấp doanh nghiệp.",
    highlightTag: "CAPSTONE SYSTEM • 100+ REQ/SEC ENTERPRISE READY",
    metricLabel: "ĐÓNG GÓI & DEPLOY PRODUCTION TOÀN DIỆN",
  },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div className="relative flex items-baseline justify-center select-none">
      <span className="text-[96px] sm:text-[140px] md:text-[180px] font-medium tracking-[-0.05em] text-[var(--accent-phosphor)] leading-none drop-shadow-[0_4px_30px_rgba(0,180,170,0.2)] tabular-nums">
        {count}
      </span>
      <span className="text-[52px] sm:text-[76px] md:text-[96px] font-medium text-[var(--accent-aqua)] tracking-tight leading-none ml-1">
        {suffix}
      </span>
    </div>
  );
}

function StoryChapterItem({
  milestone,
  index,
  total,
  onInViewChange,
}: {
  milestone: MilestoneStory;
  index: number;
  total: number;
  onInViewChange: (index: number) => void;
}) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          onInViewChange(index);
        } else {
          // Reset when far out
          if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0) {
            setInView(false);
          }
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (chapterRef.current) {
      observer.observe(chapterRef.current);
    }

    return () => observer.disconnect();
  }, [index, onInViewChange]);

  const scrollToNext = () => {
    const nextChapter = document.getElementById(
      index < total - 1 ? MILESTONES[index + 1].id : "chapter-pillars"
    );
    if (nextChapter) {
      nextChapter.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id={milestone.id}
      ref={chapterRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 py-20 border-b border-[var(--border-main)]/50 transition-colors duration-300"
    >
      {/* Center Stage Content */}
      <div
        className={`relative max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 z-10 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0 scale-100" : "opacity-40 translate-y-8 scale-95"
        }`}
      >
        {/* Chapter Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-ping" />
          <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.16em] uppercase text-[var(--text-mist)] font-medium">
            {milestone.chapterTitle}
          </span>
        </div>

        {/* Dynamic Animated Number */}
        <AnimatedNumber
          value={milestone.numberValue}
          suffix={milestone.suffix}
          inView={inView}
        />

        {/* Metric Label */}
        <div className="text-[13px] sm:text-[14px] font-mono uppercase tracking-[0.14em] text-[var(--text-mist)] font-medium">
          {milestone.metricLabel}
        </div>

        {/* Headline */}
        <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-medium uppercase tracking-[-0.03em] text-[var(--text-primary)] leading-tight max-w-2xl">
          {milestone.headline}
        </h2>

        {/* Story Text */}
        <p className="max-w-2xl text-[16px] sm:text-[18px] text-[var(--text-secondary)] leading-[1.55] font-normal">
          {milestone.story}
        </p>

        {/* Feature Pill */}
        <div className="pt-2">
          <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)] text-[12px] font-mono tracking-wider uppercase text-[var(--text-primary)] shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-bioluminescent)] shrink-0" />
            <span>{milestone.highlightTag}</span>
          </span>
        </div>

        {/* Next Chapter Prompt Button */}
        <div className="pt-6">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span>
              {index < total - 1 ? `CUỘN XUỐNG XEM CHƯƠNG 0${index + 2}` : "TIẾP TỤC ĐẾN 4 TRỤ CỘT CHIẾN LƯỢC"}
            </span>
            <div className="w-6 h-6 rounded-full border border-[var(--border-main)] flex items-center justify-center group-hover:border-[var(--accent-aqua)] transition-colors">
              <ChevronDown className="w-3.5 h-3.5 text-[var(--accent-aqua)] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StoryStatsSection() {
  const [, setActiveChapterIndex] = useState<number>(0);

  return (
    <section className="relative w-full bg-[var(--bg-recessed)] transition-colors duration-300">
      {/* Sequential Story Chapters */}
      <div className="w-full">
        {MILESTONES.map((milestone, index) => (
          <StoryChapterItem
            key={milestone.id}
            milestone={milestone}
            index={index}
            total={MILESTONES.length}
            onInViewChange={setActiveChapterIndex}
          />
        ))}
      </div>
    </section>
  );
}
