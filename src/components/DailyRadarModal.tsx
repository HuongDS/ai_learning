"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  RefreshCw,
  Key,
  Terminal,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Sparkles,
  Radio,
  ExternalLink,
  Target,
  Cpu,
} from "lucide-react";
import { DispatchData } from "@/lib/types";
import { getOrLoadRadarDispatch, syncRadarLiveWithAI } from "@/lib/radar-client";
import ApiKeyModal from "./ApiKeyModal";
import Radar3DScene, { RadarTarget, DEFAULT_RADAR_TARGETS } from "./Radar3DScene";
import { useTheme } from "@/context/ThemeContext";

interface DailyRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_CLI_COMMANDS: Record<string, string[]> = {
  vllm: [
    "git clone https://github.com/vllm-project/vllm",
    "pip install vllm",
    "vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000",
  ],
  deepseek: [
    "git clone https://github.com/deepseek-ai/DeepSeek-V3",
    "pip install -r requirements.txt",
    "python inference/generate.py --model-path deepseek-ai/DeepSeek-V3",
  ],
  llamacpp: [
    "git clone https://github.com/ggerganov/llama.cpp",
    "cmake -B build && cmake --build build --config Release",
    "./build/bin/llama-cli -m model.gguf -p \"Hello AI Engineer\"",
  ],
  ollama: [
    "curl -fsSL https://ollama.com/install.sh | sh",
    "ollama run llama3.2:3b",
    "ollama serve",
  ],
  mcp: [
    "npx @modelcontextprotocol/create-server my-ai-server",
    "npm install @modelcontextprotocol/sdk",
    "node server.js",
  ],
};

export default function DailyRadarModal({ isOpen, onClose }: DailyRadarModalProps) {
  const { theme } = useTheme();
  const [dontShowToday, setDontShowToday] = useState(false);
  const [dispatch, setDispatch] = useState<DispatchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [selectedTargetId, setSelectedTargetId] = useState<string>("vllm");
  const [activeTab, setActiveTab] = useState<"intel" | "cli" | "challenge">("intel");

  const checkApiKey = useCallback(() => {
    try {
      const key = localStorage.getItem("oryzo_openai_api_key");
      setHasApiKey(Boolean(key && key.trim().startsWith("sk-")));
    } catch {}
  }, []);

  const loadDispatch = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getOrLoadRadarDispatch();
      setDispatch(data);
    } catch (err) {
      console.error("Failed to load radar dispatch:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
    if (isOpen) {
      loadDispatch();
    }
  }, [isOpen, checkApiKey, loadDispatch]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isKeyModalOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isKeyModalOpen]);

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

  const handleCopyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  if (!isOpen) return null;

  // Selected Target Details
  const currentTarget =
    DEFAULT_RADAR_TARGETS.find((t) => t.id === selectedTargetId) ||
    DEFAULT_RADAR_TARGETS[0];

  const isHotRepoSelected = selectedTargetId === "vllm";
  const matchingOtherRepo = dispatch?.otherTopRepos?.find((r) =>
    r.name.toLowerCase().includes(currentTarget.shortName.toLowerCase())
  );

  return (
    <>
      {/* 1. Cinematic Backdrop with Ambient Radial Bioluminescent Glow */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/80 backdrop-blur-2xl transition-all duration-500 overflow-y-auto"
        onClick={handleClose}
      >
        {/* Ambient atmospheric teal glow behind the HUD */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[340px] sm:h-[500px] bg-[var(--accent-bioluminescent)]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        {/* 2. Holographic Cockpit HUD (Perspective 3D Card) */}
        <div
          className="relative w-full max-w-5xl my-auto bg-[var(--surface-card)]/95 border border-[var(--border-main)] sm:border-[var(--accent-aqua)]/35 rounded-[18px] sm:rounded-[24px] shadow-[0_0_80px_rgba(0,180,170,0.2)] overflow-hidden text-[var(--text-primary)] flex flex-col box-border transition-all duration-500 ease-out animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top HUD Telemetry Header */}
          <div className="px-4 sm:px-7 py-3.5 sm:py-4 border-b border-[var(--border-main)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-canvas)]/70 backdrop-blur-md">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-aqua)] animate-ping shrink-0" />
              <div className="flex items-center space-x-2">
                <span className="text-[11px] sm:text-[13px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase font-mono text-[var(--text-primary)]">
                  AUROS RADAR // AI OBSERVATORY
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] text-[var(--accent-aqua)] border border-[var(--badge-border)]">
                  DISPATCH #{dispatch?.issueNumber || "043"}
                </span>
              </div>
            </div>

            {/* Header Right Controls */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className={`h-8 px-2.5 sm:px-3 rounded-[6px] border text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5 ${
                  hasApiKey
                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                    : "border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                title={hasApiKey ? "OpenAI API Key: Hoạt động" : "Cấu hình OpenAI Key"}
              >
                <Key className="w-3.5 h-3.5 text-[var(--accent-aqua)] shrink-0" />
                <span className="hidden xs:inline">
                  {hasApiKey ? "KEY: ACTIVE" : "CẤU HÌNH KEY"}
                </span>
              </button>

              <button
                onClick={handleSyncLive}
                disabled={isSyncing}
                className="h-8 px-2.5 sm:px-3 rounded-[6px] bg-[var(--surface-hover)] hover:bg-[var(--surface-card)] text-[var(--text-primary)] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider border border-[var(--border-main)] transition-colors flex items-center space-x-1.5 disabled:opacity-50"
                title="Quét lại GitHub Trending bằng AI"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[var(--accent-aqua)] ${
                    isSyncing ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden sm:inline">
                  {isSyncing ? "ĐANG QUÉT..." : "QUÉT LẠI"}
                </span>
              </button>

              <button
                onClick={handleClose}
                className="h-8 px-2 sm:px-2.5 rounded-[6px] hover:bg-[var(--surface-hover)] border border-transparent hover:border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center space-x-1 transition-colors cursor-pointer"
                aria-label="Đóng radar"
              >
                <X className="w-4 h-4" />
                <span className="hidden xs:inline">ĐÓNG</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column Cockpit Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] max-h-[82vh] overflow-y-auto no-scrollbar">
            {/* ========================================================
                LEFT COLUMN: 3D HOLOGRAPHIC RADAR SCOPE (5 cols)
               ======================================================== */}
            <div className="lg:col-span-5 bg-[var(--bg-canvas)]/40 border-b lg:border-b-0 lg:border-r border-[var(--border-main)] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Telemetry Overlay Labels on Radar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)] uppercase pb-2 border-b border-[var(--border-main)]/50">
                <span className="flex items-center space-x-1.5">
                  <Radio className="w-3.5 h-3.5 text-[var(--accent-aqua)] animate-pulse" />
                  <span>3D SPATIAL TELEMETRY</span>
                </span>
                <span className="text-[var(--accent-aqua)]">SCAN: 14.24 GHz</span>
              </div>

              {/* 3D Interactive Three.js Radar Scope */}
              <div className="relative w-full aspect-square max-h-[280px] sm:max-h-[320px] mx-auto my-2 flex items-center justify-center">
                <Radar3DScene
                  targets={DEFAULT_RADAR_TARGETS}
                  selectedId={selectedTargetId}
                  onSelectTarget={(t) => setSelectedTargetId(t.id)}
                  theme={theme}
                  className="w-full h-full"
                />

                {/* Radar Target Lock Reticle Banner */}
                <div className="absolute top-2 left-2 pointer-events-none px-2.5 py-1 rounded-[4px] bg-[var(--bg-canvas)]/85 backdrop-blur-md border border-[var(--border-main)] text-[9px] font-mono uppercase tracking-wider text-[var(--text-mist)] flex items-center space-x-1.5">
                  <Target className="w-3 h-3 text-[var(--accent-aqua)]" />
                  <span>TARGET: {currentTarget.shortName}</span>
                </div>

                <div className="absolute bottom-2 right-2 pointer-events-none text-[8.5px] font-mono text-[var(--text-secondary)] opacity-70 uppercase tracking-widest">
                  RANGE: 200 KM • AZIMUTH 360°
                </div>
              </div>

              {/* Intercepted Target Selector Pills */}
              <div className="space-y-2 pt-2">
                <div className="text-[9.5px] font-mono uppercase tracking-widest text-[var(--text-secondary)]">
                  MỤC TIÊU RADAR BẮT ĐƯỢC (BẤM ĐỂ KHÓA):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5 font-mono text-[10px]">
                  {DEFAULT_RADAR_TARGETS.map((target, idx) => {
                    const isSelected = target.id === selectedTargetId;
                    return (
                      <button
                        key={target.id}
                        onClick={() => setSelectedTargetId(target.id)}
                        className={`px-2.5 py-1.5 rounded-[6px] text-left transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                          isSelected
                            ? "bg-[var(--surface-card)] border-[var(--accent-aqua)] text-[var(--accent-aqua)] shadow-[0_0_12px_rgba(0,180,170,0.25)] font-semibold"
                            : "bg-[var(--bg-canvas)]/60 border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <span className="truncate">
                          0{idx + 1} // {target.shortName}
                        </span>
                        <span className="text-[9px] text-[var(--accent-phosphor)] shrink-0 ml-1">
                          {target.stars}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN: LIVE INTELLIGENCE DOSSIER & CLI (7 cols)
               ======================================================== */}
            <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-5">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <RefreshCw className="w-7 h-7 animate-spin text-[var(--accent-aqua)]" />
                  <div className="text-[12px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    Đang thiết lập kết nối vệ tinh GitHub Trending...
                  </div>
                </div>
              ) : (
                <>
                  {/* Top Target Dossier Header */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-main)] pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] text-[var(--accent-bioluminescent)] border border-[var(--badge-border)] text-[9px] font-mono uppercase tracking-wider font-semibold">
                          SIGNAL LOCKED
                        </span>
                        <a
                          href={
                            isHotRepoSelected
                              ? dispatch?.hotRepo.url
                              : matchingOtherRepo?.url || "https://github.com/vllm-project/vllm"
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-[14px] sm:text-[16px] font-mono font-medium text-[var(--text-primary)] hover:text-[var(--accent-aqua)] transition-colors flex items-center space-x-1.5"
                        >
                          <span>
                            {isHotRepoSelected
                              ? dispatch?.hotRepo.name
                              : matchingOtherRepo?.name || currentTarget.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-aqua)]" />
                        </a>
                      </div>

                      <div className="flex items-center space-x-2 text-[11px] font-mono">
                        <span className="text-[var(--accent-phosphor)] font-medium">
                          ★{" "}
                          {isHotRepoSelected
                            ? dispatch?.hotRepo.stars
                            : matchingOtherRepo?.stars || currentTarget.stars}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Sub-Tabs */}
                    <div className="flex items-center space-x-2 font-mono text-[10px] uppercase">
                      <button
                        onClick={() => setActiveTab("intel")}
                        className={`px-3 py-1 rounded-[4px] transition-all cursor-pointer ${
                          activeTab === "intel"
                            ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                        }`}
                      >
                        01. BẢN TIN PHÂN TÍCH
                      </button>
                      <button
                        onClick={() => setActiveTab("cli")}
                        className={`px-3 py-1 rounded-[4px] transition-all cursor-pointer ${
                          activeTab === "cli"
                            ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                        }`}
                      >
                        02. LỆNH CHẠY THỬ (CLI)
                      </button>
                      <button
                        onClick={() => setActiveTab("challenge")}
                        className={`px-3 py-1 rounded-[4px] transition-all cursor-pointer ${
                          activeTab === "challenge"
                            ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                        }`}
                      >
                        03. THỬ THÁCH THỰC HÀNH
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: Hero Intelligence Quotation & Architectural Takeaway */}
                  {activeTab === "intel" && (
                    <div className="space-y-4 py-1 animate-in fade-in duration-200">
                      <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--bg-canvas)]/70 border-l-3 border-[var(--accent-bioluminescent)] border-y border-r border-[var(--border-main)] shadow-inner">
                        <span className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-[var(--accent-aqua)] block mb-2">
                          DIRECTIVE // KHUYÊN NGHỊ KIẾN TRÚC
                        </span>
                        <blockquote className="text-[14px] sm:text-[16px] font-normal leading-[1.5] text-[var(--text-primary)] italic">
                          &ldquo;
                          {dispatch?.quote ||
                            "Băng thông bộ nhớ (Memory Bandwidth) là nút thắt lớn nhất khi chạy suy luận LLM, chứ không phải xung nhịp tính toán thuần túy."}
                          &rdquo;
                        </blockquote>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-aqua)] flex items-center space-x-1.5 font-medium">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>GÓC NHÌN KỸ SƯ AI:</span>
                        </span>
                        <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                          {isHotRepoSelected
                            ? dispatch?.keyTakeaway || dispatch?.hotRepo.whyItMatters
                            : matchingOtherRepo?.description ||
                              "Mô hình kiến trúc mới giúp tối ưu hóa bộ nhớ đệm KV cache và tăng thông lượng tính toán trên GPU."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Terminal Command Prompt & Quick Execution */}
                  {activeTab === "cli" && (
                    <div className="space-y-3 py-1 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                        <span className="flex items-center space-x-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[var(--accent-aqua)]" />
                          <span>TERMINAL COMMAND EXECUTION // {currentTarget.shortName}</span>
                        </span>
                        <button
                          onClick={() => {
                            const cmds = (
                              (selectedTargetId === "vllm" && dispatch?.hotRepo.howToTry) ||
                              TARGET_CLI_COMMANDS[selectedTargetId] ||
                              TARGET_CLI_COMMANDS.vllm
                            ).join("\n");
                            handleCopyCommand(cmds);
                          }}
                          className="text-[var(--accent-aqua)] hover:underline uppercase flex items-center space-x-1 cursor-pointer"
                        >
                          {copiedCmd ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">ĐÃ SAO CHÉP ✓</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>SAO CHÉP TOÀN BỘ</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-[10px] bg-[#011d1c] border border-[var(--border-main)] font-mono text-[11px] sm:text-[12px] overflow-x-auto leading-relaxed shadow-inner">
                        {(
                          (selectedTargetId === "vllm" && dispatch?.hotRepo.howToTry) ||
                          TARGET_CLI_COMMANDS[selectedTargetId] ||
                          TARGET_CLI_COMMANDS.vllm
                        ).map((cmd, idx) => (
                          <div key={idx} className="flex items-center space-x-2 py-0.5">
                            <span className="text-[#00ffd5] select-none font-semibold">$</span>
                            <span className="text-[#e2fbf9] font-medium selection:bg-[#00ffd5]/25">{cmd}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] font-mono text-[var(--text-secondary)] leading-relaxed break-words">
                        Lưu ý: Yêu cầu môi trường Python 3.10+ và card đồ họa có hỗ trợ CUDA hoặc Apple Silicon MPS.
                      </p>
                    </div>
                  )}

                  {/* Tab 3: Micro Challenge */}
                  {activeTab === "challenge" && (
                    <div className="space-y-3 py-1 animate-in fade-in duration-200">
                      <div className="p-4 rounded-[10px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-aqua)] font-medium flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>
                            THỬ THÁCH HÔM NAY: {dispatch?.microChallenge.title || "Tự chạy Inference"}
                          </span>
                        </div>
                        <p className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                          {dispatch?.microChallenge.task ||
                            "Khởi chạy một OpenAI-compatible API server cục bộ và kiểm tra thông lượng token sinh ra."}
                        </p>
                        <div className="pt-2 border-t border-[var(--border-main)]/60 text-[11px] font-mono text-[var(--text-mist)]">
                          🎯 Mục tiêu đầu ra: {dispatch?.microChallenge.expectedOutcome}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Actions Deck */}
                  <div className="pt-4 border-t border-[var(--border-main)] space-y-2.5 mt-auto">
                    {/* Row 1: Action Buttons (Responsive grid, strictly isolated) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                      <Link
                        href="/lesson/day-01"
                        onClick={handleClose}
                        style={{
                          background: "var(--btn-aurora-bg)",
                          color: "var(--btn-aurora-text)",
                        }}
                        className="h-[44px] px-4 rounded-[6px] hover:opacity-95 text-[11px] sm:text-[12px] font-medium tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,180,170,0.25)] flex items-center justify-center space-x-2 text-center whitespace-nowrap cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 shrink-0" />
                        <span>VÀO BÀI HỌC (DAY 01)</span>
                      </Link>

                      <Link
                        href="/radar"
                        onClick={handleClose}
                        className="h-[44px] px-4 rounded-[6px] border border-[var(--border-main)] hover:border-[var(--text-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5 text-center whitespace-nowrap cursor-pointer"
                      >
                        <span>TẠP CHÍ RADAR</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-aqua)] shrink-0" />
                      </Link>
                    </div>

                    {/* Row 2: Secondary Checkbox and Telemetry Status (Zero collision guaranteed) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--border-main)]/35 text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)]">
                      <label className="flex items-center space-x-2 cursor-pointer hover:text-[var(--text-primary)] select-none transition-colors py-0.5">
                        <input
                          type="checkbox"
                          checked={dontShowToday}
                          onChange={(e) => setDontShowToday(e.target.checked)}
                          className="rounded border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--accent-aqua)] focus:ring-0 w-3.5 h-3.5 shrink-0 cursor-pointer"
                        />
                        <span className="whitespace-nowrap">Không tự động hiện lại hôm nay</span>
                      </label>

                      <span className="text-[10px] font-mono text-[var(--text-mist)] uppercase tracking-wider hidden sm:inline">
                        AUTO-SYNC 00:00 UTC // AI OBSERVATORY
                      </span>
                    </div>
                  </div>
                </>
              )}
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
