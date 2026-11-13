"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  Cpu,
  Layers,
  Award,
  Clock,
  RotateCcw,
  Compass,
  ArrowLeft,
  Flame,
  Check,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Terminal,
  BarChart3,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { WEEKS_DATA, MONTHS_OVERVIEW, WeekData } from "@/lib/roadmap-data";
import DailyRadarModal from "@/components/DailyRadarModal";

export default function LearnLandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [completedLessons, setCompletedLessons] = useState<number[]>([1]);
  const [unlockedArtifacts, setUnlockedArtifacts] = useState<string[]>([]);
  const [isAllUnlockedDemo, setIsAllUnlockedDemo] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem("oryzo_completed_lessons");
      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted);
        const numbers = parsed.map((item: any) =>
          typeof item === "number" ? item : parseInt(String(item).replace(/\D/g, ""), 10) || 1
        );
        // Ensure Lesson 1 is at least unlocked
        setCompletedLessons(Array.from(new Set(numbers)));
      }

      const savedArtifacts = localStorage.getItem("oryzo_unlocked_artifacts");
      if (savedArtifacts) {
        setUnlockedArtifacts(JSON.parse(savedArtifacts));
      }
    } catch {}
  }, []);

  const handleToggleComplete = (weekNumber: number) => {
    let updated: number[];
    if (completedLessons.includes(weekNumber)) {
      updated = completedLessons.filter((num) => num !== weekNumber);
    } else {
      updated = [...completedLessons, weekNumber];
    }
    setCompletedLessons(updated);
    try {
      localStorage.setItem("oryzo_completed_lessons", JSON.stringify(updated));
      if (updated.includes(1)) {
        const artifacts = JSON.parse(localStorage.getItem("oryzo_unlocked_artifacts") || "[]");
        if (!artifacts.includes("compute_die")) {
          artifacts.push("compute_die");
          localStorage.setItem("oryzo_unlocked_artifacts", JSON.stringify(artifacts));
          setUnlockedArtifacts(artifacts);
        }
      }
    } catch {}
  };

  const handleResetProgress = () => {
    setCompletedLessons([]);
    setIsAllUnlockedDemo(false);
    try {
      localStorage.removeItem("oryzo_completed_lessons");
      localStorage.removeItem("oryzo_unlocked_artifacts");
      setUnlockedArtifacts([]);
    } catch {}
  };

  const filteredWeeks = WEEKS_DATA.filter((w) => {
    if (selectedMonth === "all") return true;
    return w.month === selectedMonth;
  });

  const totalLessons = WEEKS_DATA.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Check if a specific week is unlocked:
  // Week 1 is ALWAYS unlocked.
  // Week N is unlocked if Week N-1 is in completedLessons OR isAllUnlockedDemo is true.
  const isLessonUnlocked = (weekNumber: number) => {
    if (isAllUnlockedDemo) return true;
    if (weekNumber === 1) return true;
    return completedLessons.includes(weekNumber - 1);
  };

  return (
    <main className="relative min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Sticky Navigation Header */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between bg-[var(--bg-canvas)]/85 backdrop-blur-md border-b border-[var(--border-main)]">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-2.5 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">TRANG CHỦ</span>
          </Link>

          <Link href="/" className="text-[13px] sm:text-[16px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--text-primary)] whitespace-nowrap">
            AUROS <span className="text-[var(--accent-ember)] font-normal">//</span> AI LAB
          </Link>
        </div>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] sm:text-[12px] font-medium tracking-wider uppercase">
          <Link
            href="/roadmap"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            01. LỘ TRÌNH 26 TUẦN
          </Link>
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1"
          >
            <span>02. DAILY RADAR</span>
          </button>
          <Link
            href="/learn"
            className="text-[var(--accent-ember)] hover:text-[var(--text-primary)] transition-colors font-medium"
          >
            03. BẮT ĐẦU HỌC
          </Link>
          <Link
            href="/playground"
            className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center space-x-1"
          >
            <span>04. PLAYGROUND</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-950/60 border border-emerald-700/50">WASM</span>
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Progress Pill */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-[22.5px] border border-[var(--border-main)] bg-[var(--surface-elevated)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
            <span>TIẾN ĐỘ:</span>
            <span className="text-[var(--accent-ember)] font-medium">
              {completedCount} / {totalLessons} BÀI ({progressPercent}%)
            </span>
          </div>

          {/* Theme Toggle Button */}
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

      {/* 2. Main Container */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex-1 space-y-8 sm:space-y-10">
        {/* Hero Section */}
        <div className="space-y-4 border-b border-[var(--border-main)] pb-8">
          <div className="flex items-center space-x-2.5 text-[11px] font-mono tracking-widest uppercase text-[var(--accent-ember)] font-medium">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)] animate-pulse" />
            <span>LEARNING HUB // CHỌN BÀI HỌC THEO TIẾN ĐỘ</span>
          </div>

          <h1 className="text-[32px] sm:text-[46px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.02]">
            HÀNH TRÌNH BÀI HỌC THỰC CHIẾN
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Mỗi bài học được thiết kế như một nấc thang năng lực. Bạn cần hoàn thành bài trước để mở khóa bài tiếp theo,
            tự động mở khóa các linh kiện vi mạch 3D và từng bước lắp ráp thành công <strong>Bộ Não Số (Sentient Core Matrix)</strong>.
          </p>

          {/* Overall Progress Bar Card */}
          <div className="p-5 rounded-[14px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-3 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider">
              <span className="text-[var(--text-primary)] font-medium">
                TIẾN ĐỘ TỔNG THỂ CỦA BẠN: {progressPercent}% HOÀN THÀNH
              </span>
              <div className="flex items-center space-x-3 text-[10px] text-[var(--text-secondary)]">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{completedCount} Đã xong</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)]" />
                  <span>1 Đang mở</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-stone-500" />
                  <span>{Math.max(0, totalLessons - completedCount - 1)} Đang khóa</span>
                </span>
              </div>
            </div>

            {/* Hairline Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent-ember)] transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>

            {/* Testing & Demo helpers */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] font-mono text-[var(--text-secondary)]">
              <span>Mỗi bài học bao gồm: Giải phẫu vi mạch 3D • Lý thuyết cơ chế • Bài thực hành CLI • Quiz mở khóa.</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAllUnlockedDemo(!isAllUnlockedDemo)}
                  className="hover:text-[var(--accent-ember)] transition-colors underline uppercase"
                >
                  {isAllUnlockedDemo ? "BẬT LẠI KHÓA TUẦN TỰ" : "MỞ KHÓA TẤT CẢ (DEMO)"}
                </button>
                <span>•</span>
                <button
                  onClick={handleResetProgress}
                  className="hover:text-red-400 transition-colors uppercase flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET TIẾN ĐỘ</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Month Filters Tabs (Horizontal Swipe on Mobile) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-main)] pb-3 gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-medium">
              LỌC THEO GIAI ĐOẠN HỌC TẬP:
            </span>
            <div className="overflow-x-auto no-scrollbar flex items-center space-x-1.5 font-mono text-[10px] sm:text-[11px] w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedMonth("all")}
                className={`px-3 py-1.5 rounded-[22.5px] transition-colors shrink-0 whitespace-nowrap ${
                  selectedMonth === "all"
                    ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-medium"
                    : "border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                TẤT CẢ (26 BÀI)
              </button>
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 py-1.5 rounded-[22.5px] transition-colors shrink-0 whitespace-nowrap ${
                    selectedMonth === m
                      ? "bg-[var(--accent-ember)] text-white font-medium"
                      : "border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  THÁNG {m}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredWeeks.map((week) => {
              const isUnlocked = isLessonUnlocked(week.week);
              const isCompleted = completedLessons.includes(week.week);
              const isCurrentActive = isUnlocked && !isCompleted;

              return (
                <div
                  key={week.week}
                  className={`relative p-6 rounded-[16px] border transition-all duration-200 flex flex-col justify-between space-y-5 ${
                    isCompleted
                      ? "bg-[var(--surface-card)] border-emerald-500/40 shadow-sm"
                      : isCurrentActive
                      ? "bg-[var(--surface-card)] border-[var(--accent-ember)] shadow-md ring-1 ring-[var(--accent-ember)]/30"
                      : "bg-[var(--surface-elevated)]/40 border-[var(--border-main)]/60 opacity-65"
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                      <div className="flex items-center space-x-2.5 font-mono text-[11px]">
                        <span
                          className={`px-2.5 py-0.5 rounded font-medium ${
                            isCompleted
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : isCurrentActive
                              ? "bg-[var(--accent-ember)]/15 text-[var(--accent-ember)] border border-[var(--accent-ember)]/30"
                              : "bg-stone-500/15 text-stone-400 border border-stone-500/30"
                          }`}
                        >
                          BÀI {week.week < 10 ? `0${week.week}` : week.week}
                        </span>
                        <span className="text-[var(--text-secondary)] uppercase">
                          THÁNG 0{week.month}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isCompleted ? (
                          <span className="flex items-center space-x-1 text-[11px] font-mono text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ĐÃ HOÀN THÀNH</span>
                          </span>
                        ) : isCurrentActive ? (
                          <span className="flex items-center space-x-1 text-[11px] font-mono text-[var(--accent-ember)] font-medium animate-pulse">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>BÀI HỌC KẾ TIẾP</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-[11px] font-mono text-stone-400">
                            <Lock className="w-3.5 h-3.5" />
                            <span>CHƯA MỞ KHÓA</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Lesson Title */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--accent-ember)] tracking-widest">
                        {week.tag}
                      </span>
                      <h3 className="text-[17px] sm:text-[19px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
                        {week.title}
                      </h3>
                    </div>

                    {/* Deliverable & Core Hands-on */}
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      {week.handsOn}
                    </p>

                    {/* 3D Reward Artifact & Milestone */}
                    <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                      {week.week === 1 && (
                        <span className="px-2.5 py-1 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--accent-ember)] flex items-center space-x-1">
                          <Terminal className="w-3 h-3 text-[var(--accent-ember)]" />
                          <span>DỰ ÁN: TODO CLI v1 (.VENV)</span>
                        </span>
                      )}
                      {week.week === 2 && (
                        <span className="px-2.5 py-1 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--accent-aqua)] flex items-center space-x-1">
                          <Terminal className="w-3 h-3 text-[var(--accent-aqua)]" />
                          <span>DỰ ÁN: TODO CLI v2 (JSON &amp; CSV I/O)</span>
                        </span>
                      )}
                      {week.week === 3 && (
                        <span className="px-2.5 py-1 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--accent-aqua)] flex items-center space-x-1">
                          <Layers className="w-3 h-3 text-[var(--accent-aqua)]" />
                          <span>DỰ ÁN: TODO CLI v3 (OOP &amp; UNITTEST)</span>
                        </span>
                      )}
                      {week.week === 4 && (
                        <span className="px-2.5 py-1 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--accent-aqua)] flex items-center space-x-1">
                          <BarChart3 className="w-3 h-3 text-[var(--accent-aqua)]" />
                          <span>DỰ ÁN: NUMPY &amp; DATA CLEANING</span>
                        </span>
                      )}
                      {(week.week === 8 || week.week === 25) && (
                        <span className="px-2.5 py-1 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--accent-aqua)] flex items-center space-x-1">
                          <Cpu className="w-3 h-3 text-[var(--accent-aqua)]" />
                          <span>PHÒNG LAB 3D: DIE-01 (TENSOR CORES)</span>
                        </span>
                      )}
                      {week.isMilestone && (
                        <span className="px-2.5 py-1 rounded-[6px] bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>MILESTONE DỰ ÁN</span>
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--text-secondary)] flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>~5–7 GIỜ HỌC</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-[var(--border-main)] flex flex-wrap items-center justify-between gap-3">
                    {/* Unlocked State Actions */}
                    {isUnlocked ? (
                      week.week === 1 ? (
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <Link
                            href="/lesson/week-01"
                            className="h-[38px] px-5 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-md whitespace-nowrap shrink-0"
                          >
                            <Terminal className="w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0" />
                            <span>BẮT ĐẦU TUẦN 01: PYTHON CĂN BẢN</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        </div>
                      ) : week.week === 2 ? (
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <Link
                            href="/lesson/week-02"
                            className="h-[38px] px-5 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-md whitespace-nowrap shrink-0"
                          >
                            <Terminal className="w-3.5 h-3.5 text-[var(--accent-aqua)] shrink-0" />
                            <span>BẮT ĐẦU TUẦN 02: CẤU TRÚC DỮ LIỆU &amp; JSON/CSV</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        </div>
                      ) : week.week === 3 ? (
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <Link
                            href="/lesson/week-03"
                            className="h-[38px] px-5 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-md whitespace-nowrap shrink-0"
                          >
                            <Layers className="w-3.5 h-3.5 text-[var(--accent-aqua)] shrink-0" />
                            <span>BẮT ĐẦU TUẦN 03: OOP, LOGGING &amp; TESTING</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        </div>
                      ) : week.week === 4 ? (
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                          <Link
                            href="/lesson/week-04"
                            className="h-[38px] px-5 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-md whitespace-nowrap shrink-0"
                          >
                            <BarChart3 className="w-3.5 h-3.5 text-[var(--accent-aqua)] shrink-0" />
                            <span>BẮT ĐẦU TUẦN 04: NUMPY &amp; DATA CLEANING</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/roadmap`}
                            className="h-[38px] px-4.5 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-md whitespace-nowrap shrink-0"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0" />
                            <span>BẮT ĐẦU TUẦN {week.week}</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        </div>
                      )
                    ) : (
                      /* Locked State Info */
                      <div className="flex items-center space-x-2 text-[11px] font-mono text-[var(--text-secondary)]">
                        <Lock className="w-3.5 h-3.5 text-stone-500" />
                        <span>Hoàn thành Bài {week.week - 1} để mở khóa</span>
                      </div>
                    )}

                    {/* Quick Manual Toggle Check (to facilitate review & progression) */}
                    {isUnlocked && (
                      <button
                        onClick={() => handleToggleComplete(week.week)}
                        className={`text-[10px] font-mono uppercase tracking-wider flex items-center space-x-1 transition-colors ${
                          isCompleted
                            ? "text-emerald-400 hover:text-emerald-300"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                        title="Đánh dấu đã hoàn thành hoặc hủy đánh dấu để test tính năng mở khóa"
                      >
                        <Check className="w-3 h-3" />
                        <span>{isCompleted ? "HỦY ĐÁNH DẤU" : "ĐÁNH DẤU HOÀN THÀNH"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="border-t border-[var(--border-main)] px-6 sm:px-12 py-6 bg-[var(--bg-canvas)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>ORYZO // LEARNING HUB — HỆ THỐNG MỞ KHÓA BÀI HỌC TUẦN TỰ</div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              TRANG CHỦ
            </Link>
            <Link href="/lab" className="hover:text-[var(--text-primary)] transition-colors">
              PHÒNG LAB 3D
            </Link>
            <Link href="/playground" className="hover:text-emerald-400 text-emerald-500 transition-colors">
              PLAYGROUND
            </Link>
            <Link href="/roadmap" className="hover:text-[var(--text-primary)] transition-colors">
              LỘ TRÌNH 26 TUẦN
            </Link>
          </div>
        </div>
      </footer>

      {/* Daily Radar Modal */}
      <DailyRadarModal
        isOpen={isRadarModalOpen}
        onClose={() => setIsRadarModalOpen(false)}
      />
    </main>
  );
}
