"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ComputeDieScene from "@/components/ComputeDieScene";
import DailyRadarModal from "@/components/DailyRadarModal";
import { Layers, BookOpen, Sun, Moon, ArrowRight, ArrowLeft, CheckCircle2, Flame } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function LabWorkspacePage() {
  const { theme, toggleTheme } = useTheme();
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [quantMode, setQuantMode] = useState<"FP16" | "INT8" | "INT4">("FP16");
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);
  const [unlockedArtifacts, setUnlockedArtifacts] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oryzo_unlocked_artifacts");
      if (saved) {
        setUnlockedArtifacts(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const isDayOneUnlocked = unlockedArtifacts.includes("compute_die");

  return (
    <main className="relative min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-hidden flex flex-col justify-between transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)]">
      {/* 1. Fixed Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between bg-[var(--bg-canvas)]/85 backdrop-blur-md border-b border-[var(--border-main)]">
        {/* Brand Lockup + Home Link */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-2.5 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] mr-1 shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">TRANG CHỦ</span>
          </Link>

          <Link href="/" className="text-[13px] sm:text-[16px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--text-primary)] whitespace-nowrap">
            AUROS <span className="text-[var(--accent-ember)] font-normal">//</span> AI LAB
          </Link>
          <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] border-l border-[var(--border-main)] pl-3 font-mono">
            3D ARCHITECTURE
          </span>
        </div>

        {/* Minimal Center Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] sm:text-[12px] font-medium tracking-wider uppercase">
          <Link
            href="/roadmap"
            className="relative py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            01. LỘ TRÌNH 26 TUẦN
          </Link>
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="relative py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            02. DAILY RADAR
          </button>
          <Link
            href="/learn"
            className="relative py-1 text-[var(--accent-ember)] hover:text-[var(--text-primary)] transition-colors"
          >
            03. BẮT ĐẦU HỌC
          </Link>
        </nav>

        {/* Right Controls: Radar Pill & Theme Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="flex items-center px-2.5 sm:px-3 py-1.5 rounded-[22.5px] border border-[var(--accent-ember)]/40 bg-[var(--accent-ember)]/10 text-[var(--accent-ember)] text-[10px] font-mono tracking-wider uppercase hover:bg-[var(--accent-ember)]/20 transition-colors whitespace-nowrap"
          >
            <span className="hidden xs:inline">DAILY RADAR</span>
            <span className="xs:hidden">RADAR</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors"
            title="Chuyển chế độ Sáng / Tối"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>
      </header>

      {/* 2. Hero 3D Void-Mode Workspace Section (The exact screen in user's image) */}
      <section className="relative w-full min-h-screen pt-20 sm:pt-24 pb-8 px-4 sm:px-8 lg:px-12 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
          {/* Left Column: Heading & Anchor CTA (4 cols) */}
          <div className="lg:col-span-4 z-20 flex flex-col justify-center space-y-5 sm:space-y-6">
            <div className="flex items-center space-x-2 text-[11px] font-medium tracking-widest uppercase text-[var(--accent-ember)] font-mono">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)]" />
              <span>CHAPTER 01 // SILICON & TENSORS</span>
            </div>

            <h1 className="text-[32px] sm:text-[44px] xl:text-[56px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[0.94]">
              HOW SILICON <br />
              LEARNS TO <br />
              THINK.
            </h1>

            <p className="text-[15px] sm:text-[18px] xl:text-[20px] font-normal leading-[1.35] text-[var(--text-secondary)] max-w-md">
              Trước khi mô hình AI có thể suy luận, phần cứng bán dẫn phải tính toán hàng tỷ ma trận. Khám phá giải phẫu vi mạch của kỷ nguyên AI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/lesson/day-01"
                className="h-[46px] sm:h-[50px] px-6 sm:px-8 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] sm:text-[12px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-all duration-200 shadow-xl flex items-center justify-center space-x-2.5 group cursor-pointer whitespace-nowrap shrink-0 text-center"
              >
                <BookOpen className="w-4 h-4 text-[var(--accent-ember)] shrink-0" />
                <span>BẮT ĐẦU BÀI HỌC DAY 01</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>

              <button
                onClick={() => setIsExploded(!isExploded)}
                className="h-[46px] sm:h-[50px] px-5 sm:px-6 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] bg-transparent text-[var(--text-primary)] text-[10px] sm:text-[11px] font-medium tracking-widest uppercase transition-all duration-200 hover:bg-[var(--surface-card)] whitespace-nowrap shrink-0 text-center"
              >
                {isExploded ? "ĐÓNG LỚP LINH KIỆN" : "TÁCH LỚP 3D (EXPLODE)"}
              </button>
            </div>

            <div className="pt-1 text-[11px] uppercase tracking-wider text-[var(--text-secondary)] flex items-center space-x-2 font-mono">
              <span>TIẾN ĐỘ:</span>
              <span className="text-[var(--text-primary)] font-medium">DAY 01 / 75 DAYS</span>
              <span>•</span>
              <span className="text-[var(--accent-ember)]">
                {isDayOneUnlocked ? "ĐÃ MỞ KHÓA TẠO TÁC ✓" : "CHƯA HOÀN THÀNH"}
              </span>
            </div>
          </div>

          {/* Center Column: 3D Product Artifact (5 cols) */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[480px] xl:h-[580px] flex items-center justify-center">
            <ComputeDieScene isExploded={isExploded} quantMode={quantMode} />

            {/* Floating 3D Controls Pill */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--border-main)] rounded-[36px] px-2.5 sm:px-3.5 py-1 sm:py-1.5 space-x-1 sm:space-x-2 text-[10px] sm:text-[11px] uppercase tracking-wider shadow-lg max-w-[calc(100vw-32px)] overflow-x-auto no-scrollbar">
              <span className="text-[var(--text-secondary)] px-1 font-mono shrink-0">QUANT:</span>
              {(["FP16", "INT8", "INT4"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setQuantMode(mode)}
                  className={`px-2.5 sm:px-3 py-1 rounded-[22.5px] transition-all font-mono shrink-0 ${
                    quantMode === mode
                      ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] border border-[var(--border-main)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {mode}
                </button>
              ))}

              <div className="w-[1px] h-3 bg-[var(--border-main)] mx-1 shrink-0" />

              <button
                onClick={() => setIsExploded(!isExploded)}
                className="px-2 sm:px-2.5 py-1 text-[var(--text-primary)] hover:text-[var(--accent-ember)] flex items-center space-x-1 transition-colors whitespace-nowrap shrink-0"
                title="Tách các tầng linh kiện"
              >
                <Layers className="w-3.5 h-3.5 mr-1 text-[var(--accent-ember)] shrink-0" />
                <span>{isExploded ? "COLLAPSE" : "EXPLODE"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hardware Metrics & Specifications (3 cols) */}
          <div className="lg:col-span-3 z-20 flex flex-col justify-center space-y-5 lg:pl-4">
            <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[12px] p-5 space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-2.5">
                <span className="text-[10px] tracking-widest uppercase text-[var(--text-secondary)] font-mono">
                  ARTIFACT SPECIFICATION
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[var(--accent-ember)] font-mono font-medium">
                  DIE-01-MMU
                </span>
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                <div>
                  <div className="text-[var(--text-secondary)] uppercase text-[9px]">LÕI MA TRẬN (TENSOR CORES)</div>
                  <div className="text-[var(--text-primary)] text-[13px] font-medium">16 CLUSTERS (4x4 MATRIX)</div>
                </div>

                <div className="border-t border-[var(--border-main)]/50 pt-2">
                  <div className="text-[var(--text-secondary)] uppercase text-[9px]">BỘ NHỚ BĂNG THÔNG CAO</div>
                  <div className="text-[var(--text-primary)] text-[13px] font-medium">4x HBM3 @ 1.2 TB/S</div>
                </div>

                <div className="border-t border-[var(--border-main)]/50 pt-2">
                  <div className="text-[var(--text-secondary)] uppercase text-[9px]">XUNG NHỊP DỮ LIỆU ĐANG CHỌN</div>
                  <div className="text-[var(--accent-ember)] text-[13px] font-medium">{quantMode} PRECISION</div>
                </div>

                <div className="border-t border-[var(--border-main)]/50 pt-2">
                  <div className="text-[var(--text-secondary)] uppercase text-[9px]">TRẠNG THÁI SỞ HỮU</div>
                  <div className="flex items-center space-x-1.5 mt-0.5 font-sans">
                    {isDayOneUnlocked ? (
                      <span className="text-emerald-500 font-medium flex items-center text-[12px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        ĐÃ TÍCH HỢP VÀO BỘ NÃO 3D
                      </span>
                    ) : (
                      <span className="text-[var(--accent-ember)] font-medium text-[12px]">
                        CHƯA MỞ KHÓA (CẦN HỌC BÀI 01)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[12px] border border-[var(--border-main)] bg-[var(--surface-elevated)]/60 text-[12px] text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--accent-ember)] font-medium uppercase text-[10px] block mb-1 font-mono">
                LỜI KHUYÊN KỸ SƯ:
              </span>
              Nhấn <strong>"BẮT ĐẦU BÀI HỌC"</strong> để vào trang đọc sâu lý thuyết và làm bài tập lượng tử hóa ở cuối bài.
            </div>
          </div>
        </div>

        {/* 3. Bottom Balanced Editorial Bar */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-main)] text-[11px] font-mono text-[var(--text-secondary)]">
          <div className="flex items-center space-x-4">
            <span className="text-[var(--text-primary)] font-medium">ORYZO 1-MODEL // EDITION 2026</span>
            <span>•</span>
            <button
              onClick={() => setIsRadarModalOpen(true)}
              className="text-[var(--accent-ember)] hover:underline uppercase flex items-center space-x-1"
            >
              <span>XEM BẢN TIN DAILY AI RADAR HÔM NAY</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right uppercase tracking-wider text-[10px]">
            DUAL THEME // LIGHT & DARKROOM MODE
          </div>
        </div>
      </section>

      {/* 4. Daily AI Radar Modal Popup */}
      <DailyRadarModal
        isOpen={isRadarModalOpen}
        onClose={() => setIsRadarModalOpen(false)}
      />
    </main>
  );
}
