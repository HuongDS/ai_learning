"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, GitFork, ArrowUpRight, BookOpen, Clock, RefreshCw, Key, CheckCircle2, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { DispatchData } from "@/lib/types";
import { getOrLoadRadarDispatch, syncRadarLiveWithAI } from "@/lib/radar-client";
import ApiKeyModal from "./ApiKeyModal";

interface DailyRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyRadarModal({ isOpen, onClose }: DailyRadarModalProps) {
  const [dontShowToday, setDontShowToday] = useState(false);
  const [dispatch, setDispatch] = useState<DispatchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showOtherRepos, setShowOtherRepos] = useState(false);

  useEffect(() => {
    checkApiKey();
    if (isOpen) {
      loadDispatch();
    }
  }, [isOpen]);

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

  const handleClose = () => {
    if (dontShowToday) {
      try {
        localStorage.setItem("oryzo_radar_dismissed_date", new Date().toDateString());
      } catch (e) {}
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-all duration-300">
        <div 
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[12px] p-6 sm:p-8 shadow-2xl overflow-y-auto text-[var(--text-primary)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Badge */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ember)] animate-pulse shrink-0" />
              <span className="text-[11px] font-medium tracking-wider uppercase text-[var(--text-primary)] font-mono whitespace-nowrap">
                DAILY AI RADAR // DISPATCH #{dispatch?.issueNumber || "042"}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[var(--accent-ember)] px-2.5 py-0.5 rounded-full border border-[var(--accent-ember)]/30 bg-[var(--accent-ember)]/10 font-medium whitespace-nowrap">
                {dispatch?.tag || "LIVE INTELLIGENCE"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className={`p-1.5 rounded-full border text-[11px] transition-colors flex items-center space-x-1 ${
                  hasApiKey
                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                    : "border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title={hasApiKey ? "OpenAI API Key đã cấu hình" : "Nhập OpenAI API Key để kích hoạt AI tự động"}
              >
                <Key className="w-3.5 h-3.5 shrink-0" />
              </button>

              <button
                onClick={handleSyncLive}
                disabled={isSyncing}
                className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0 disabled:opacity-50"
                title="Quét lại GitHub Trending và sinh bài viết mới"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[var(--accent-ember)]" : ""}`} />
              </button>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-[var(--border-main)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                aria-label="Đóng modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Date & Generation Source indicator */}
          <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider text-[var(--text-secondary)] pt-3 font-mono">
            <div className="flex items-center space-x-3">
              <span className="whitespace-nowrap">{dispatch?.date || "06 THÁNG 11, 2026"}</span>
              <span className="text-[var(--border-main)]">•</span>
              <span className="flex items-center space-x-1.5 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0" />
                <span>TỰ ĐỘNG HÀNG NGÀY</span>
              </span>
            </div>

            <div className="flex items-center space-x-1.5 text-[10px] text-[var(--text-secondary)]">
              <span>ENGINE:</span>
              <span className={`font-medium uppercase ${dispatch?.generatedBy === "openai_gpt4o" ? "text-emerald-400" : "text-[var(--accent-ember)]"}`}>
                {dispatch?.generatedBy === "openai_gpt4o" ? "OPENAI GPT-4o LIVE ✓" : "CURATED RADAR"}
              </span>
            </div>
          </div>

          {/* Content Loading Skeleton or Real Data */}
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[var(--accent-ember)]" />
              <div className="text-[12px] font-mono uppercase text-[var(--text-secondary)]">
                Đang nạp dữ liệu AI Radar...
              </div>
            </div>
          ) : dispatch ? (
            <div className="space-y-4 py-2">
              {/* Main Headline */}
              <div className="text-[12px] font-mono tracking-wider text-[var(--accent-ember)] uppercase pt-2">
                {dispatch.headline}
              </div>

              {/* Main Editorial Quote */}
              <div className="py-3 px-4 rounded-[8px] bg-[var(--bg-canvas)]/60 border-l-2 border-[var(--accent-ember)]">
                <blockquote className="text-[17px] sm:text-[20px] font-normal leading-[1.35] text-[var(--text-primary)]">
                  &ldquo;{dispatch.quote}&rdquo;
                </blockquote>
              </div>

              {/* Insight Paragraph */}
              <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                <p className="text-[var(--text-primary)]/90">
                  {dispatch.keyTakeaway}
                </p>
              </div>

              {/* Dashed Separator */}
              <div className="border-dashed-hairline my-4" />

              {/* Featured Hot GitHub Repo */}
              <div className="bg-[var(--bg-canvas)]/80 border border-[var(--border-main)] rounded-[10px] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <GitFork className="w-4 h-4 text-[var(--accent-ember)] shrink-0" />
                    <span className="text-[11px] uppercase tracking-wider text-[var(--accent-ember)] font-medium font-mono whitespace-nowrap">
                      TOP TRENDING REPO CỦA NGÀY
                    </span>
                  </div>
                  <a
                    href={dispatch.hotRepo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent-ember)] transition-colors whitespace-nowrap"
                  >
                    <span>GITHUB ({dispatch.hotRepo.stars}★)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

                <div>
                  <div className="text-[15px] font-medium font-mono text-[var(--text-primary)]">
                    {dispatch.hotRepo.name}
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {dispatch.hotRepo.description}
                  </p>
                </div>

                {/* Why It Matters */}
                {dispatch.hotRepo.whyItMatters && (
                  <div className="text-[12px] text-[var(--text-primary)]/80 bg-[var(--surface-elevated)] p-2.5 rounded border border-[var(--border-main)]/60">
                    <span className="text-[var(--accent-ember)] font-mono font-medium mr-1.5 uppercase text-[10px]">ĐỘT PHÁ:</span>
                    {dispatch.hotRepo.whyItMatters}
                  </div>
                )}

                {/* How to try snippets */}
                {dispatch.hotRepo.howToTry && dispatch.hotRepo.howToTry.length > 0 && (
                  <div className="bg-[#0c0805] p-3 rounded font-mono text-[11px] text-[#ffedd7] border border-[#2a1c12] space-y-1">
                    <div className="text-[#6c5f51] text-[10px] uppercase flex items-center space-x-1 mb-1">
                      <Terminal className="w-3 h-3 text-[var(--accent-ember)]" />
                      <span>HƯỚNG DẪN CHẠY THỬ NHANH:</span>
                    </div>
                    {dispatch.hotRepo.howToTry.map((step, idx) => (
                      <div key={idx} className="text-emerald-400/90 truncate">
                        $ {step}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Top Repos Expandable */}
              {dispatch.otherTopRepos && dispatch.otherTopRepos.length > 0 && (
                <div className="border border-[var(--border-main)] rounded-[10px] overflow-hidden">
                  <button
                    onClick={() => setShowOtherRepos(!showOtherRepos)}
                    className="w-full px-4 py-2.5 bg-[var(--surface-elevated)]/50 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>CÁC REPO AI NỔI BẬT KHÁC HÔM NAY ({dispatch.otherTopRepos.length})</span>
                    {showOtherRepos ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showOtherRepos && (
                    <div className="p-3 bg-[var(--bg-canvas)]/40 divide-y divide-[var(--border-main)]/50 space-y-2">
                      {dispatch.otherTopRepos.map((repo, i) => (
                        <div key={i} className="pt-2 first:pt-0 flex items-start justify-between gap-3">
                          <div>
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[13px] font-mono font-medium text-[var(--text-primary)] hover:text-[var(--accent-ember)] flex items-center space-x-1"
                            >
                              <span>{repo.name}</span>
                              <ArrowUpRight className="w-3 h-3 shrink-0" />
                            </a>
                            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                              {repo.description}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-[var(--accent-ember)] shrink-0">
                            {repo.stars}★
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {/* Actions Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[var(--border-main)] mt-auto">
            <label className="flex items-center space-x-2 text-[11px] text-[var(--text-secondary)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="rounded border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--accent-ember)] focus:ring-0 w-3.5 h-3.5 shrink-0"
              />
              <span className="whitespace-nowrap">Không tự động hiện lại hôm nay</span>
            </label>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/radar"
                onClick={handleClose}
                className="h-[40px] px-4 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] font-medium tracking-wider uppercase transition-colors whitespace-nowrap flex items-center space-x-1"
              >
                <span>XEM TRANG RADAR</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              <Link
                href="/lesson/day-01"
                onClick={handleClose}
                className="h-[40px] px-6 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 whitespace-nowrap shrink-0 shadow-md"
              >
                <BookOpen className="w-4 h-4 text-[var(--accent-ember)] shrink-0" />
                <span>VÀO BÀI HỌC HÔM NAY</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* OpenAI API Key Setting Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeySaved={(k) => {
          setHasApiKey(Boolean(k && k.trim().startsWith("sk-")));
          if (k) handleSyncLive();
        }}
      />
    </>
  );
}
