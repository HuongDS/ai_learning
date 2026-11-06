"use client";

import React, { useState, useEffect } from "react";
import { X, GitFork, ArrowUpRight, BookOpen, Clock, RefreshCw, Key, Terminal, ChevronDown, ChevronUp } from "lucide-react";
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
  const [showCliSteps, setShowCliSteps] = useState(false);

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
      {/* Overlay - Centered and responsive */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto"
        onClick={handleClose}
      >
        <div 
          className="relative w-full max-w-lg my-auto bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[14px] p-5 sm:p-7 shadow-2xl overflow-hidden text-[var(--text-primary)] flex flex-col box-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1. Header Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-main)]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ember)] animate-pulse shrink-0" />
              <span className="text-[11px] font-medium tracking-wider uppercase font-mono text-[var(--text-primary)]">
                DAILY DISPATCH #{dispatch?.issueNumber || "043"}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[var(--accent-ember)] px-2 py-0.5 rounded-full border border-[var(--accent-ember)]/30 bg-[var(--accent-ember)]/10 font-mono">
                {dispatch?.tag || "RADAR"}
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className={`p-1.5 rounded-full border text-[11px] transition-colors ${
                  hasApiKey
                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                    : "border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title={hasApiKey ? "OpenAI API Key: Hoạt động" : "Cấu hình OpenAI Key"}
              >
                <Key className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleSyncLive}
                disabled={isSyncing}
                className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
                title="Quét lại GitHub Trending"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[var(--accent-ember)]" : ""}`} />
              </button>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-[var(--border-main)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Đóng modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Date Stamp */}
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] pt-2.5">
            <span>{dispatch?.date || "06 THÁNG 11, 2026"}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-[var(--accent-ember)]" />
              <span>CẬP NHẬT 00:00 HÀNG NGÀY BỞI AI</span>
            </span>
          </div>

          {/* 2. Loading State or Content */}
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[var(--accent-ember)]" />
              <div className="text-[12px] font-mono uppercase text-[var(--text-secondary)]">
                Đang nạp dữ liệu...
              </div>
            </div>
          ) : dispatch ? (
            <div className="space-y-4 py-3">
              {/* The Hero Quote — Balanced & Centered */}
              <div className="p-4 rounded-[10px] bg-[var(--bg-canvas)]/80 border-l-3 border-[var(--accent-ember)] border-y border-r border-[var(--border-main)]">
                <blockquote className="text-[16px] sm:text-[18px] font-normal leading-[1.45] text-[var(--text-primary)]">
                  &ldquo;{dispatch.quote}&rdquo;
                </blockquote>
              </div>

              {/* Key Takeaway */}
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--accent-ember)] font-mono font-medium mr-1.5 uppercase text-[10px]">
                  GÓC NHÌN KỸ SƯ:
                </span>
                {dispatch.keyTakeaway}
              </p>

              {/* Featured Hot Repo Box (Clean & Concise) */}
              <div className="bg-[var(--surface-elevated)]/70 border border-[var(--border-main)] rounded-[10px] p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5 min-w-0">
                    <GitFork className="w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0" />
                    <span className="text-[13px] font-mono font-medium text-[var(--text-primary)] truncate">
                      {dispatch.hotRepo.name}
                    </span>
                  </div>
                  <a
                    href={dispatch.hotRepo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-[11px] font-mono text-[var(--accent-ember)] hover:underline shrink-0"
                  >
                    <span>{dispatch.hotRepo.stars}★</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-[12px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {dispatch.hotRepo.description}
                </p>

                {/* Quick Toggle to view CLI Command */}
                {dispatch.hotRepo.howToTry && dispatch.hotRepo.howToTry.length > 0 && (
                  <div className="pt-1">
                    <button
                      onClick={() => setShowCliSteps(!showCliSteps)}
                      className="text-[10px] font-mono uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1 transition-colors"
                    >
                      <Terminal className="w-3 h-3 text-[var(--accent-ember)]" />
                      <span>{showCliSteps ? "Ẩn lệnh chạy thử" : "Xem lệnh chạy thử nhanh (CLI)"}</span>
                      {showCliSteps ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                    </button>

                    {showCliSteps && (
                      <div className="mt-2 bg-[#0a0704] p-2.5 rounded font-mono text-[11px] text-emerald-400 border border-[#261910] space-y-1">
                        {dispatch.hotRepo.howToTry.map((cmd, idx) => (
                          <div key={idx} className="truncate">
                            $ {cmd}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* 3. Balanced Footer Actions */}
          <div className="pt-4 border-t border-[var(--border-main)] mt-auto space-y-3">
            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/radar"
                onClick={handleClose}
                className="h-[42px] px-3 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center justify-center space-x-1"
              >
                <span>XEM TRANG RADAR</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              <Link
                href="/lesson/day-01"
                onClick={handleClose}
                className="h-[42px] px-3 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5 shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-ember)] shrink-0" />
                <span>VÀO BÀI HỌC</span>
              </Link>
            </div>

            {/* Checkbox underneath - Centered & Clean */}
            <div className="flex justify-center pt-1">
              <label className="flex items-center space-x-2 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={dontShowToday}
                  onChange={(e) => setDontShowToday(e.target.checked)}
                  className="rounded border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--accent-ember)] focus:ring-0 w-3.5 h-3.5 shrink-0"
                />
                <span>Không tự động hiện lại hôm nay</span>
              </label>
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
