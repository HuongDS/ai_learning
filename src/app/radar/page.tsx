"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Key, GitFork, ArrowUpRight, Terminal, Sparkles, Clock, Check, Sun, Moon, Flame, Shield, BookOpen } from "lucide-react";
import { DispatchData } from "@/lib/types";
import { getOrLoadRadarDispatch, syncRadarLiveWithAI } from "@/lib/radar-client";
import { useTheme } from "@/context/ThemeContext";
import ApiKeyModal from "@/components/ApiKeyModal";

export default function RadarPage() {
  const { theme, toggleTheme } = useTheme();
  const [dispatch, setDispatch] = useState<DispatchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    checkApiKey();
    loadDispatch();
  }, []);

  const checkApiKey = () => {
    try {
      const key = localStorage.getItem("oryzo_openai_api_key");
      setHasApiKey(Boolean(key && key.trim().startsWith("sk-")));
    } catch {}
  };

  const loadDispatch = async () => {
    setIsLoading(true);
    try {
      const data = await getOrLoadRadarDispatch();
      setDispatch(data);
    } catch (err) {
      console.error("Failed to load radar dispatch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncLive = async () => {
    setIsSyncing(true);
    try {
      const data = await syncRadarLiveWithAI();
      setDispatch(data);
    } catch (err) {
      console.error("Failed to sync radar:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyCommand = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-main)] px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-2.5 sm:px-3 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">TRANG CHỦ</span>
          </Link>

          <Link
            href="/learn"
            className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--accent-ember)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-3 rounded-[22.5px] border border-[var(--border-main)] shrink-0"
          >
            <span>BẮT ĐẦU HỌC</span>
          </Link>

          <Link
            href="/roadmap"
            className="hidden md:flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-3 rounded-[22.5px] border border-[var(--border-main)] shrink-0"
          >
            <span>LỘ TRÌNH 26 TUẦN</span>
          </Link>

          <div className="text-[12px] font-mono uppercase tracking-widest text-[var(--text-primary)] font-medium border-l border-[var(--border-main)] pl-3 sm:pl-4 hidden sm:block truncate">
            DAILY AI OBSERVATORY <span className="text-[var(--accent-ember)]">//</span> GITHUB RADAR
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className={`h-[36px] px-2.5 sm:px-3.5 rounded-[22.5px] border text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5 shrink-0 ${
              hasApiKey
                ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                : "border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            title={hasApiKey ? "OpenAI API Key: Hoạt động" : "Cấu hình OpenAI Key"}
          >
            <Key className="w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0" />
            <span className="hidden sm:inline">{hasApiKey ? "KEY: ACTIVE ✓" : "CẤU HÌNH KEY (BYOK)"}</span>
            <span className="sm:hidden">{hasApiKey ? "KEY ✓" : "KEY"}</span>
          </button>

          <button
            onClick={handleSyncLive}
            disabled={isSyncing}
            className="h-[36px] px-3 sm:px-4 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5 sm:space-x-2 disabled:opacity-50 shadow-sm shrink-0"
            title="Quét lại GitHub Trending"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0 ${isSyncing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isSyncing ? "ĐANG QUÉT GITHUB..." : "QUÉT LẠI BẰNG AI"}</span>
            <span className="sm:hidden">{isSyncing ? "QUÉT..." : "QUÉT"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors shrink-0"
            title="Chuyển chế độ Sáng / Tối"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex-1">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-[var(--accent-ember)]" />
            <div className="text-[13px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              Đang kết nối GitHub Trending & OpenAI Agent Pipeline...
            </div>
          </div>
        ) : dispatch ? (
          <div className="space-y-10">
            {/* Top Dispatch Banner */}
            <div className="border-b border-[var(--border-main)] pb-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent-ember)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ember)] animate-pulse" />
                  <span>DISPATCH #{dispatch.issueNumber} // {dispatch.date}</span>
                  <span className="px-2 py-0.5 rounded border border-[var(--accent-ember)]/30 bg-[var(--accent-ember)]/10 text-[9px]">
                    {dispatch.tag}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
                  ENGINE: <span className={dispatch.generatedBy === "openai_gpt4o" ? "text-emerald-400" : "text-[var(--accent-ember)]"}>
                    {dispatch.generatedBy === "openai_gpt4o" ? "OPENAI GPT-4o (STRUCTURED SYNTHESIS)" : "CURATED INTELLIGENCE"}
                  </span>
                </div>
              </div>

              <h1 className="text-[32px] sm:text-[46px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.02]">
                {dispatch.headline}
              </h1>

              {/* Conversational Lead Quote */}
              <div className="p-6 rounded-[12px] bg-[var(--surface-card)] border-l-4 border-[var(--accent-ember)] border-y border-r border-[var(--border-main)]">
                <blockquote className="text-[20px] sm:text-[24px] font-normal leading-[1.35] text-[var(--text-primary)]">
                  &ldquo;{dispatch.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-[var(--border-main)] text-[13px] text-[var(--text-secondary)]">
                  <strong className="text-[var(--accent-ember)] font-mono uppercase mr-1.5 text-[11px]">GÓC NHÌN KỸ SƯ:</strong>
                  {dispatch.keyTakeaway}
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Featured Repo & Daily Micro-Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Featured Repo of the Day (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                  <Flame className="w-4 h-4" />
                  <span>TIÊU ĐIỂM REPO AI NỔI BẬT NHẤT HÔM NAY</span>
                </div>

                <div className="p-6 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[18px] font-medium font-mono text-[var(--text-primary)]">
                        {dispatch.hotRepo.name}
                      </div>
                      <div className="text-[12px] font-mono text-[var(--accent-ember)] mt-0.5">
                        {dispatch.hotRepo.stars} STARS • {dispatch.hotRepo.forks} FORKS
                      </div>
                    </div>

                    <a
                      href={dispatch.hotRepo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="h-[36px] px-4 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] font-mono uppercase tracking-wider flex items-center space-x-1.5 transition-colors shrink-0"
                    >
                      <span>MỞ REPO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                    {dispatch.hotRepo.description}
                  </p>

                  {/* Why It Matters */}
                  {dispatch.hotRepo.whyItMatters && (
                    <div className="p-4 rounded-[8px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[13px] text-[var(--text-primary)]/90 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                        TẠI SAO CÔNG NGHỆ NÀY ĐỘT PHÁ?
                      </div>
                      <p>{dispatch.hotRepo.whyItMatters}</p>
                    </div>
                  )}

                  {/* Quickstart Command Box */}
                  {dispatch.hotRepo.howToTry && dispatch.hotRepo.howToTry.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[var(--accent-ember)]" />
                        <span>HƯỚNG DẪN CLONE & CHẠY THỬ NHANH:</span>
                      </div>
                      <div className="bg-[#0b0704] p-4 rounded-[8px] border border-[#2a1c12] font-mono text-[12px] text-[#ffedd7] space-y-2 overflow-x-auto">
                        {dispatch.hotRepo.howToTry.map((cmd, i) => (
                          <div key={i} className="flex items-center justify-between group">
                            <span className="text-emerald-400">$ {cmd}</span>
                            <button
                              onClick={() => handleCopyCommand(cmd, i)}
                              className="text-[10px] uppercase text-[#6c5f51] hover:text-[#ffedd7] transition-colors ml-2"
                            >
                              {copiedIndex === i ? "ĐÃ COPY ✓" : "COPY"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Daily Micro-Challenge & Other Hot Repos (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Micro Challenge Card */}
                <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>THỬ THÁCH THỰC HÀNH HÔM NAY</span>
                </div>

                <div className="p-6 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4 shadow-sm">
                  <div className="text-[16px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                    {dispatch.microChallenge.title}
                  </div>

                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {dispatch.microChallenge.task}
                  </p>

                  <div className="p-3 rounded bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] text-[var(--text-primary)]/80">
                    <span className="text-[var(--accent-ember)] font-mono font-medium block text-[10px] uppercase mb-0.5">
                      KẾT QUẢ KỲ VỌNG:
                    </span>
                    {dispatch.microChallenge.expectedOutcome}
                  </div>

                  <Link
                    href="/lesson/week-01"
                    className="w-full h-[42px] px-6 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-md"
                  >
                    <BookOpen className="w-4 h-4 text-[var(--accent-ember)]" />
                    <span>LÀM BÀI TẬP & KẾT HỢP KIẾN THỨC</span>
                  </Link>

                  <Link
                    href="/lab"
                    className="w-full h-[40px] px-6 rounded-[36px] border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] font-medium uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 bg-[var(--surface-elevated)]"
                  >
                    <span>VÀO PHÒNG LAB 3D (DIE-01)</span>
                  </Link>
                </div>

                {/* Other Trending Repos List */}
                {dispatch.otherTopRepos && dispatch.otherTopRepos.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                      TOP REPO AI ĐƯỢC CHÚ Ý KHÁC
                    </div>

                    <div className="space-y-2.5">
                      {dispatch.otherTopRepos.map((repo, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--text-primary)] transition-colors space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[13px] font-mono font-medium text-[var(--text-primary)] hover:text-[var(--accent-ember)] flex items-center space-x-1"
                            >
                              <span>{repo.name}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                            <span className="text-[10px] font-mono text-[var(--accent-ember)]">
                              {repo.stars}★
                            </span>
                          </div>
                          <p className="text-[12px] text-[var(--text-secondary)] line-clamp-2">
                            {repo.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-main)] px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] gap-2">
        <div>ORYZO // DAILY AI OBSERVATORY — POWERED BY GITHUB SEARCH & OPENAI GPT-4o</div>
        <div>CẬP NHẬT TỰ ĐỘNG LÚC 00:00 MỖI NGÀY</div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeySaved={(k) => {
          setHasApiKey(Boolean(k && k.trim().startsWith("sk-")));
          if (k) handleSyncLive();
        }}
      />
    </div>
  );
}
