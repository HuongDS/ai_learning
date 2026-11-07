"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface StoryChapter {
  id: string;
  number: string;
  shortLabel: string;
  fullTitle: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "chapter-hero",
    number: "00",
    shortLabel: "TỔNG QUAN",
    fullTitle: "Hồi 00: Lộ trình AI toàn diện cho kỹ sư",
  },
  {
    id: "chapter-26w",
    number: "01",
    shortLabel: "26W",
    fullTitle: "Hồi 01.1: Thời lượng 26 tuần có lộ trình bài bản",
  },
  {
    id: "chapter-180h",
    number: "02",
    shortLabel: "180+",
    fullTitle: "Hồi 01.2: 180+ Giờ code thực chiến trên máy tính",
  },
  {
    id: "chapter-16x",
    number: "03",
    shortLabel: "16X",
    fullTitle: "Hồi 01.3: 16 Tensor Cores & Bản chất bán dẫn 3D",
  },
  {
    id: "chapter-100p",
    number: "04",
    shortLabel: "100%",
    fullTitle: "Hồi 01.4: 100% Production Ready cấp doanh nghiệp",
  },
  {
    id: "chapter-pillars",
    number: "05",
    shortLabel: "4 TRỤ CỘT",
    fullTitle: "Hồi 02: 4 Trụ cột năng lực kiến trúc AI",
  },
  {
    id: "chapter-lab",
    number: "06",
    shortLabel: "3D LAB",
    fullTitle: "Hồi 03: Giải phẫu vi mạch bán dẫn 3D DIE-01",
  },
  {
    id: "chapter-roadmap",
    number: "07",
    shortLabel: "6 THÁNG",
    fullTitle: "Hồi 04: Bản đồ tiến trình 6 tháng chi tiết",
  },
  {
    id: "chapter-radar",
    number: "08",
    shortLabel: "AI RADAR",
    fullTitle: "Hồi 05: Daily AI Radar tự động hóa",
  },
  {
    id: "chapter-cta",
    number: "09",
    shortLabel: "BẮT ĐẦU",
    fullTitle: "Hồi kết: Khởi động hành trình chuyển dịch",
  },
];

export default function GlobalStoryNav() {
  const [activeChapterId, setActiveChapterId] = useState<string>("chapter-hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = (isRealUserScroll = false) => {
      // 1. Only mark as actively scrolling when triggered by an actual scroll event
      if (isRealUserScroll) {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1500);
      }

      // 2. Find the chapter currently closest to center screen
      const viewportCenter = window.innerHeight * 0.45;
      let currentClosest = STORY_CHAPTERS[0].id;
      let minDistance = Infinity;

      for (const chapter of STORY_CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elementCenter - viewportCenter);
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentClosest = chapter.id;
            break;
          }
          if (dist < minDistance) {
            minDistance = dist;
            currentClosest = chapter.id;
          }
        }
      }

      setActiveChapterId(currentClosest);
    };

    const onScrollListener = () => handleScroll(true);

    window.addEventListener("scroll", onScrollListener, { passive: true });
    // Initial mount check (F5) with isRealUserScroll = false so it starts collapsed
    handleScroll(false);

    return () => {
      window.removeEventListener("scroll", onScrollListener);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const activeIndex = STORY_CHAPTERS.findIndex((c) => c.id === activeChapterId);
  const activeChapter = STORY_CHAPTERS[activeIndex] || STORY_CHAPTERS[0];

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToChapter(STORY_CHAPTERS[activeIndex - 1].id);
    }
  };

  const scrollNext = () => {
    if (activeIndex < STORY_CHAPTERS.length - 1) {
      scrollToChapter(STORY_CHAPTERS[activeIndex + 1].id);
    }
  };

  // Expanded state: Show labels when hovered OR when actively scrolling
  const isExpanded = isHovered || isScrolling;

  return (
    <>
      {/* Desktop Floating Story Navigator (Collapsible Dot-Only on Idle) */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Story Chapter Navigation"
        className={`hidden lg:flex fixed right-3 sm:right-4 xl:right-6 top-1/2 -translate-y-1/2 flex-col space-y-1 z-40 select-none transition-all duration-300 ease-out ${
          isExpanded
            ? "py-3.5 px-3 rounded-[16px] bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-main)] shadow-2xl"
            : "py-3 px-1 rounded-full bg-transparent border-transparent"
        }`}
      >
        {STORY_CHAPTERS.map((chapter) => {
          const isActive = chapter.id === activeChapterId;

          return (
            <button
              key={chapter.id}
              onClick={() => scrollToChapter(chapter.id)}
              className="relative flex items-center text-left cursor-pointer group focus:outline-none py-1 px-1 rounded-[8px] hover:bg-[var(--surface-hover)]/60 transition-colors"
              aria-label={`Jump to ${chapter.number}: ${chapter.fullTitle}`}
            >
              {/* Dot & Halo Ring Indicator (Always visible, perfectly centered) */}
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[var(--accent-aqua)]/25 animate-pulse" />
                )}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[var(--accent-aqua)] ring-4 ring-[var(--accent-bioluminescent)]/30 shadow-[0_0_12px_rgba(0,180,170,0.5)]"
                      : "w-2 h-2 bg-[var(--border-main)] group-hover:bg-[var(--accent-aqua)] opacity-40 group-hover:opacity-100"
                  }`}
                />
              </div>

              {/* Text Label: Collapsed to width 0 normally, smoothly slides out on hover or scroll without clipping */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${
                  isExpanded
                    ? "max-w-[200px] opacity-100 translate-x-0 ml-3"
                    : "max-w-0 opacity-0 -translate-x-2 pointer-events-none ml-0"
                }`}
              >
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--text-primary)] font-bold"
                      : "text-[var(--text-secondary)] opacity-60 group-hover:opacity-100 font-medium"
                  }`}
                >
                  {chapter.number} // {chapter.shortLabel}
                </span>
              </div>

              {/* Hover Tooltip Popup on the Left (When Expanded) */}
              {isExpanded && (
                <div className="absolute right-full mr-3 px-3 py-1.5 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)] text-[11px] font-mono text-[var(--text-primary)] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-lg backdrop-blur-md translate-x-2 group-hover:translate-x-0">
                  <span className="text-[var(--accent-aqua)] mr-1.5">●</span>
                  <span>{chapter.fullTitle}</span>
                </div>
              )}
            </button>
          );
        })}
      </aside>

      {/* Mobile Floating Chapter Pill (Bottom Right) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center space-x-1.5 p-1 rounded-full bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-main)] shadow-xl">
        <button
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          className="p-2 rounded-full hover:bg-[var(--surface-hover)] disabled:opacity-30 text-[var(--text-primary)] transition-colors"
          title="Chương trước"
          aria-label="Previous Chapter"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
          <span>
            {activeChapter.number} // {activeChapter.shortLabel}
          </span>
        </button>

        <button
          onClick={scrollNext}
          disabled={activeIndex === STORY_CHAPTERS.length - 1}
          className="p-2 rounded-full hover:bg-[var(--surface-hover)] disabled:opacity-30 text-[var(--text-primary)] transition-colors"
          title="Chương kế tiếp"
          aria-label="Next Chapter"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Mobile Expanded Chapters Dropup */}
        {isMobileMenuOpen && (
          <div className="absolute bottom-full right-0 mb-3 w-64 max-h-80 overflow-y-auto rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] p-2 shadow-2xl backdrop-blur-lg flex flex-col space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-mist)] border-b border-[var(--border-main)]">
              DANH SÁCH CÁC HỒI KỂ CHUYỆN
            </div>
            {STORY_CHAPTERS.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`flex items-center space-x-2.5 px-3 py-2 rounded-[6px] text-left text-[11px] font-mono uppercase tracking-wider transition-colors ${
                  chapter.id === activeChapterId
                    ? "bg-[var(--badge-bg)] text-[var(--accent-aqua)] font-semibold"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>
                  {chapter.number} // {chapter.shortLabel}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
