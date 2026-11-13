"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Cpu,
  Workflow,
  Boxes,
  Database,
  Terminal,
  CheckCircle2,
  Compass,
  ArrowUpRight,
  ExternalLink,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Radio,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import DailyRadarModal from "@/components/DailyRadarModal";
import BioluminescentSphere from "@/components/BioluminescentSphere";
import StoryStatsSection from "@/components/StoryStatsSection";
import GlobalStoryNav from "@/components/GlobalStoryNav";

function NextChapterPrompt({ targetId, label }: { targetId: string; label: string }) {
  const scrollTo = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-8 sm:pt-10 flex justify-center px-4 text-center">
      <button
        onClick={scrollTo}
        className="group flex flex-col items-center space-y-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        aria-label={`Cuộn xuống ${label}`}
      >
        <span className="truncate max-w-[280px] sm:max-w-none">{label}</span>
        <div className="w-6 h-6 rounded-full border border-[var(--border-main)] flex items-center justify-center group-hover:border-[var(--accent-aqua)] transition-colors">
          <ChevronDown className="w-3.5 h-3.5 text-[var(--accent-aqua)] animate-bounce" />
        </div>
      </button>
    </div>
  );
}

const PILLARS_DATA = [
  {
    id: "python_data",
    number: "TRỤ CỘT I",
    domain: "PYTHON & DỮ LIỆU",
    title: "PYTHON FOR AI, OOP & NỀN TẢNG DỮ LIỆU",
    quote: "Kỹ sư phần mềm bắt đầu từ đây: Chuyển dịch tư duy sang Python, venv cô lập, Pydantic và xử lý dữ liệu.",
    desc: "Bạn sẽ bắt đầu hành trình bằng việc làm chủ Python 3.11+, thiết lập môi trường ảo venv chuẩn chỉ, cấu trúc dữ liệu, OOP & Logging, Pydantic V2 validation, và làm chủ mảng nhiều chiều với NumPy và Pandas làm sạch dữ liệu.",
    linkText: "Bắt đầu học Tuần 01: Python",
    linkHref: "/lesson/week-01",
    metric: "THÁNG 01",
    icon: Terminal,
  },
  {
    id: "ml_dl",
    number: "TRỤ CỘT II",
    domain: "MÔ HÌNH",
    title: "MACHINE LEARNING, DEEP LEARNING & PYTORCH",
    quote: "Hiểu bản chất hàm mất mát, tối ưu Gradient Descent và lan truyền ngược trước khi chạm vào LLM.",
    desc: "Nắm vững quy trình ML toàn trình: Phân chia dữ liệu train/val/test, chống data leakage, các độ đo Precision/Recall/F1, Mạng nơ-ron MLP, Autograd và xây dựng PyTorch training pipeline có thể chạy lại độc lập (reproducible).",
    linkText: "Xem Chi tiết Module ML/DL",
    linkHref: "/roadmap",
    metric: "THÁNG 02",
    icon: Workflow,
  },
  {
    id: "rag",
    number: "TRỤ CỘT III",
    domain: "DỮ LIỆU",
    title: "PRODUCTION ENTERPRISE RAG ARCHITECTURE",
    quote: "Trọng tâm lớn nhất của chương trình: Triệt tiêu ảo giác bằng bằng chứng ngữ cảnh xác thực.",
    desc: "Dành tới 8 tuần (Tháng 4) chuyên sâu về RAG: FastAPI Backend, Pydantic Structured Output, Tool calling an toàn, PostgreSQL + pgvector, Hybrid Search (Vector + BM25), Verifiable Citations và cơ chế từ chối khi thiếu dữ liệu (Abstention).",
    linkText: "Xem Chi tiết Module RAG (Tháng 4)",
    linkHref: "/roadmap",
    metric: "8 TUẦN TRỌNG TÂM",
    icon: Database,
  },
  {
    id: "orchestration",
    number: "TRỤ CỘT IV",
    domain: "ĐIỀU PHỐI",
    title: "AUTONOMOUS AGENTS, LANGGRAPH & CAPSTONE",
    quote: "Không phải một chatbot đơn độc, mà là hệ thống tác tử có sự tham gia phê duyệt của con người (HITL).",
    desc: "Xây dựng Agent ReAct, StateGraph với LangGraph, checkpoint bền vững SQLite, Human-in-the-loop phê duyệt hành động ghi, tích hợp MCP Server và đóng gói trọn gói Capstone Intelligent Knowledge Assistant bằng Docker Compose.",
    linkText: "Xem Chi tiết Agents & Capstone",
    linkHref: "/roadmap",
    metric: "THÁNG 05 — 06",
    icon: Boxes,
  },
];

const PHASES_DATA = [
  {
    month: "THÁNG 01",
    weeks: "TUẦN 01 — 04",
    title: "Python và Nền Tảng Dữ Liệu",
    desc: "Python căn bản, cấu trúc dữ liệu, OOP, logging, unit testing, NumPy và Pandas làm sạch dữ liệu.",
    highlight: "Milestone: Todo CLI v3 (OOP + tests) & Data cleaning notebook",
  },
  {
    month: "THÁNG 02",
    weeks: "TUẦN 05 — 08",
    title: "Machine Learning & Deep Learning",
    desc: "Quy trình ML, metrics (P/R/F1), Neural Networks, loss & autograd, PyTorch training workflow.",
    highlight: "Milestone: ml-foundations (PyTorch pipeline chạy lại được)",
  },
  {
    month: "THÁNG 03",
    weeks: "TUẦN 09 — 12",
    title: "LLM & Kiến Trúc Transformer",
    desc: "Tokenization (BPE), Embeddings, Self-Attention (Q/K/V), Residual, LayerNorm và Text Generation & Sampling.",
    highlight: "Milestone: Tự bóc tách Transformer & Generation playground",
  },
  {
    month: "THÁNG 04",
    weeks: "TUẦN 13 — 20",
    title: "AI Application Engineering & RAG",
    desc: "FastAPI Backend, Structured Outputs (Pydantic), Tool Calling, Evals, Ingestion, PostgreSQL + pgvector, Citations & Abstention.",
    highlight: "Milestone: Production Enterprise RAG Engine with Verifiable Citations",
  },
  {
    month: "THÁNG 05",
    weeks: "TUẦN 21 — 24",
    title: "Agents, Workflows & MCP",
    desc: "Agent fundamentals, ReAct loop, LangGraph StateGraph, SQLite Checkpoint, Human-in-the-loop Approval & Tracing.",
    highlight: "Milestone: Production Agentic Workflow with Human-in-the-Loop",
  },
  {
    month: "THÁNG 06",
    weeks: "TUẦN 25 — 26",
    title: "Inference, Deployment & Capstone",
    desc: "Inference optimization (vLLM/KV cache), Docker Compose, Secrets, Security & Hoàn thiện Capstone Platform.",
    highlight: "Final Milestone: Intelligent Knowledge & Agent Assistant Platform",
  },
];

export default function WelcomePage() {
  const { theme, toggleTheme } = useTheme();
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);
  const [activeMonthIdx, setActiveMonthIdx] = useState<number>(0);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(
      "pip install vllm && vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000"
    );
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const selectedPillar = PILLARS_DATA[activePillarIdx];
  const SelectedPillarIcon = selectedPillar.icon;

  return (
    <main className="relative min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--surface-card)] selection:text-[var(--accent-aqua)] flex flex-col justify-between overflow-x-clip">
      {/* Global Scrollytelling Story Navigator (Covers all 10 Chapters) */}
      <GlobalStoryNav />

      {/* 1. Transparent Navigation Bar (Auros Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[64px] sm:h-[70px] px-3 sm:px-6 lg:px-8 flex items-center justify-between bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-main)] transition-colors duration-300">
        {/* Left: Brand Lockup */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <Link
            href="/"
            className="text-[13px] sm:text-[15px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            <span className="font-semibold">AUROS</span>
            <span className="text-[var(--accent-bioluminescent)] font-light">//</span>
            <span>AI LAB</span>
          </Link>
          <span className="hidden 2xl:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--border-main)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-mist)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
            <span>26W CURRICULUM</span>
          </span>
        </div>

        {/* Center: Clean Ghost Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[11px] xl:text-[12px] font-mono tracking-[0.08em] xl:tracking-[0.12em] uppercase text-[var(--text-secondary)]">
          <Link
            href="/roadmap"
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap"
          >
            <span className="hidden xl:inline">LỘ TRÌNH 26 TUẦN</span>
            <span className="xl:hidden">LỘ TRÌNH</span>
          </Link>
          <Link
            href="/lab"
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap"
          >
            <span className="hidden xl:inline">PHÒNG LAB 3D</span>
            <span className="xl:hidden">LAB 3D</span>
          </Link>
          <Link
            href="/anatomy-3d"
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap text-[var(--accent-aqua)]"
          >
            GIẢI MÃ 3D
          </Link>
          <Link
            href="/playground"
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap flex items-center space-x-1 text-emerald-400 font-medium"
          >
            <span>PLAYGROUND</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-950/60 border border-emerald-700/50">WASM</span>
          </Link>
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap cursor-pointer uppercase font-mono"
          >
            <span className="hidden xl:inline">DAILY RADAR</span>
            <span className="xl:hidden">RADAR</span>
          </button>
        </nav>

        {/* Right: Controls & Primary Action */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          {/* Theme Switcher Button (Sun/Moon) */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-[6px] border border-[var(--border-main)] bg-[var(--badge-bg)] hover:bg-[var(--surface-hover)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-all cursor-pointer shrink-0"
            title={theme === "dark" ? "Chuyển sang Chế độ Sáng (Light Mode)" : "Chuyển sang Chế độ Tối (Darkroom Mode)"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-mist)]" />
            )}
          </button>

          {/* Signature Aurora Gradient Button */}
          <Link
            href="/learn"
            style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
            className="h-8 sm:h-9 px-3 sm:px-4 rounded-[6px] hover:opacity-95 text-[11px] sm:text-[12px] font-medium tracking-[0.06em] uppercase transition-all shadow-[0_0_18px_rgba(0,180,170,0.25)] flex items-center space-x-1.5 whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">BẮT ĐẦU HỌC</span>
            <span className="sm:hidden">HỌC</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-[6px] border border-[var(--border-main)] bg-[var(--badge-bg)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Mobile Navigation"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed top-[64px] sm:top-[70px] left-0 right-0 z-40 bg-[var(--surface-card)]/98 backdrop-blur-xl border-b border-[var(--border-main)] px-5 py-5 space-y-3 shadow-2xl lg:hidden">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-mist)] pb-2 border-b border-[var(--border-main)]">
            ĐIỀU HƯỚNG TRANG // NAVIGATION
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href="/roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent-aqua)] transition-colors"
            >
              <span>01. LỘ TRÌNH 26 TUẦN</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-aqua)]" />
            </Link>
            <Link
              href="/lab"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent-aqua)] transition-colors"
            >
              <span>02. PHÒNG LAB 3D</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-aqua)]" />
            </Link>
            <Link
              href="/anatomy-3d"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] hover:border-[var(--accent-aqua)] transition-colors"
            >
              <span>03. GIẢI MÃ KIẾN TRÚC 3D</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-aqua)]" />
            </Link>
            <Link
              href="/playground"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-emerald-800/40 text-[12px] font-mono uppercase tracking-wider text-emerald-400 hover:border-emerald-400 transition-colors"
            >
              <span>04. PLAYGROUND PYTHON (WASM)</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsRadarModalOpen(true);
              }}
              className="flex items-center justify-between p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent-aqua)] transition-colors w-full text-left cursor-pointer"
            >
              <span>05. DAILY RADAR</span>
              <ExternalLink className="w-4 h-4 text-[var(--accent-aqua)]" />
            </button>
            <Link
              href="/learn"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
              className="flex items-center justify-between p-3.5 rounded-[8px] text-[12px] font-medium uppercase tracking-wider transition-all shadow-md mt-1"
            >
              <span>06. BẮT ĐẦU HỌC NGAY</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================================
          CHƯƠNG 00 // TỔNG QUAN: HERO SECTION WITH 3D BIOLUMINESCENT SPHERE
         ========================================================================= */}
      <section
        id="chapter-hero"
        className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-main)] overflow-hidden"
      >
        {/* Ambient atmospheric teal glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] lg:w-[700px] h-[320px] sm:h-[450px] bg-[var(--accent-bioluminescent)]/15 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 w-full my-auto">
          {/* Left Column: Text Stack */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left min-w-0">
            {/* Uppercase Section Label (Eyebrow) */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--text-mist)]">
                HỒI 00 // AUROS STRATEGIC CURRICULUM ARCHITECTURE
              </span>
            </div>

            {/* Massive Hero Headline */}
            <h1 className="text-[30px] sm:text-[48px] md:text-[62px] lg:text-[76px] font-medium uppercase tracking-[-0.04em] text-[var(--text-primary)] leading-[1.05]">
              LỘ TRÌNH HỌC AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-aqua)] to-[var(--accent-phosphor)]">
                TOÀN DIỆN CHO KỸ SƯ
              </span>
            </h1>

            {/* Cinematic Subtext */}
            <p className="max-w-2xl text-[15px] sm:text-[17px] md:text-[18px] font-normal leading-[1.5] text-[var(--text-secondary)]">
              Định hướng chuyển dịch từ <strong className="text-[var(--text-primary)] font-medium">Software Engineer</strong> thành Kỹ sư AI chuyên sâu về <strong className="text-[var(--text-mist)] font-medium">LLM Systems & Autonomous Agents</strong> trong 26 tuần. Tự tay làm chủ vi mạch bán dẫn 3D, kiến trúc suy luận phân trang vLLM và hệ thống đa tác tử tự hành mà không sa đà vào toán học hàn lâm.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/learn"
                style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
                className="h-[46px] sm:h-[48px] px-5 sm:px-6 rounded-[6px] hover:opacity-95 text-[12px] sm:text-[13px] font-medium tracking-[0.06em] uppercase transition-all shadow-[0_0_24px_rgba(0,180,170,0.3)] flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer text-center"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>BẮT ĐẦU HỌC (CHỌN BÀI HỌC)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                href="/roadmap"
                style={{ background: "var(--btn-surface-bg)", color: "var(--btn-surface-text)" }}
                className="h-[46px] sm:h-[48px] px-4 sm:px-5 rounded-[6px] hover:opacity-90 text-[12px] sm:text-[13px] font-medium tracking-[0.06em] uppercase border border-[var(--border-main)] transition-colors flex items-center justify-center space-x-2 whitespace-nowrap shadow-sm text-center"
              >
                <Compass className="w-4 h-4 text-[var(--text-mist)] shrink-0" />
                <span>XEM LỘ TRÌNH 26 TUẦN</span>
              </Link>

              <button
                onClick={() => setIsRadarModalOpen(true)}
                className="h-[46px] sm:h-[48px] px-4 rounded-[6px] bg-[var(--badge-bg)] hover:bg-[var(--surface-hover)] text-[var(--text-mist)] hover:text-[var(--text-primary)] text-[11px] sm:text-[12px] font-mono tracking-wider uppercase border border-[var(--border-main)] transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer text-center"
              >
                <Radio className="w-3.5 h-3.5 text-[var(--accent-aqua)] shrink-0 animate-pulse" />
                <span>DAILY RADAR</span>
              </button>
            </div>

            {/* Micro specs row */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--text-secondary)] border-t border-[var(--border-main)]">
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-aqua)] shrink-0" />
                <span>100% 3D Hardware Anatomy</span>
              </span>
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-aqua)] shrink-0" />
                <span>Multi-Agent Swarm Loops</span>
              </span>
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-aqua)] shrink-0" />
                <span>Production vLLM Serving</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Bioluminescent Particle Sphere Orb */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-w-0">
            <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[360px] lg:max-w-[390px] xl:max-w-[450px]">
              <BioluminescentSphere theme={theme} className="w-full h-full" />
              {/* Overlay data readout tag */}
              <div className="absolute bottom-2 sm:bottom-3 left-3 right-3 sm:left-4 sm:right-4 p-2 sm:p-2.5 rounded-[6px] bg-[var(--bg-recessed)]/95 border border-[var(--border-main)] text-[9px] sm:text-[10px] font-mono tracking-wider flex items-center justify-between backdrop-blur-md shadow-sm pointer-events-none">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-ping shrink-0" />
                  <span className="text-[var(--text-mist)] uppercase truncate">CORE DATA ORB // ACTIVE</span>
                </div>
                <span className="text-[var(--text-secondary)] shrink-0">2,200 NODES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt to Next Chapter */}
        <NextChapterPrompt
          targetId="chapter-26w"
          label="CUỘN XUỐNG ĐỂ BẮT ĐẦU CÂU CHUYỆN (CHƯƠNG 01)"
        />
      </section>

      {/* =========================================================================
          CHƯƠNG 01 - 04: INTERACTIVE SCROLLYTELLING MILESTONES (26W -> 180+ -> 16X -> 100%)
         ========================================================================= */}
      <StoryStatsSection />

      {/* =========================================================================
          CHƯƠNG 05 // 4 TRỤ CỘT: CÂU CHUYỆN 4 TRỤ CỘT NĂNG LỰC KIẾN TRÚC
         ========================================================================= */}
      <section
        id="chapter-pillars"
        className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-main)] bg-[var(--bg-canvas)] transition-colors duration-300 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full">
          {/* Story Chapter Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-[var(--border-main)] pb-6 sm:pb-8">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--text-mist)]">
                  HỒI 02 // CÂU CHUYỆN 4 TRỤ CỘT NĂNG LỰC
                </span>
              </div>
              <h2 className="text-[26px] sm:text-[38px] md:text-[46px] font-medium uppercase tracking-[-0.04em] text-[var(--text-primary)] leading-tight">
                BẢN THÂN BẠN SẼ LÀM CHỦ NHỮNG GÌ?
              </h2>
            </div>
            <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] max-w-lg leading-relaxed">
              Một Kỹ sư AI thực thụ không tích lũy kiến thức chắp vá. 4 trụ cột dưới đây là 4 nấc thang tiến hóa logic: từ thấu cảm vi mạch bán dẫn đến chỉ huy hệ thống tác tử tự hành.
            </p>
          </div>

          {/* Focal Pillar Switcher Tabs (Scrollable on mobile) */}
          <div className="overflow-x-auto no-scrollbar flex items-center gap-2 sm:gap-3 pb-2 border-b border-[var(--border-main)]/60 w-full">
            {PILLARS_DATA.map((pillar, idx) => {
              const isSelected = idx === activePillarIdx;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarIdx(idx)}
                  className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[8px] text-[11px] sm:text-[12px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--accent-aqua)] shadow-[0_0_16px_rgba(0,180,170,0.2)] font-semibold"
                      : "bg-transparent text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-main)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? "text-[var(--accent-aqua)]" : "text-[var(--text-secondary)]"}`} />
                  <span className="whitespace-nowrap">
                    0{idx + 1} // {pillar.domain}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Focal Center Stage Showcase Card */}
          <div className="bg-[var(--surface-card)] rounded-[16px] sm:rounded-[20px] p-6 sm:p-10 lg:p-12 border border-[var(--border-main)] shadow-md relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[var(--accent-bioluminescent)]/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 sm:p-3.5 rounded-[8px] bg-[var(--icon-btn-bg)] text-[var(--accent-bioluminescent)] shadow-sm shrink-0">
                    <SelectedPillarIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent-aqua)] font-medium block">
                      {selectedPillar.number} // NỀN TẢNG NĂNG LỰC
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-mono text-[var(--text-secondary)]">
                      {selectedPillar.metric}
                    </span>
                  </div>
                </div>

                <h3 className="text-[20px] sm:text-[28px] md:text-[34px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
                  {selectedPillar.title}
                </h3>

                <blockquote className="border-l-3 border-[var(--accent-bioluminescent)] pl-3 sm:pl-4 text-[13px] sm:text-[15px] font-mono text-[var(--text-mist)] italic bg-[var(--bg-canvas)]/50 py-2.5 sm:py-3 rounded-r-[6px]">
                  "{selectedPillar.quote}"
                </blockquote>

                <p className="text-[14px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
                  {selectedPillar.desc}
                </p>

                <div className="pt-2">
                  <Link
                    href={selectedPillar.linkHref}
                    style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
                    className="inline-flex items-center space-x-2.5 h-[44px] sm:h-[46px] px-5 sm:px-6 rounded-[6px] text-[11px] sm:text-[12px] font-medium tracking-wider uppercase transition-all shadow-md"
                  >
                    <span>{selectedPillar.linkText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Visual Spotlight Graphic */}
              <div className="lg:col-span-4 bg-[var(--bg-canvas)] rounded-[12px] p-5 sm:p-6 border border-[var(--border-main)] space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] uppercase border-b border-[var(--border-main)] pb-2">
                  <span>SPECS & KIẾN TRÚC</span>
                  <span className="text-[var(--accent-aqua)]">VERIFIED</span>
                </div>
                <div className="space-y-2 text-[var(--text-secondary)] text-[11px]">
                  <div className="flex items-center justify-between">
                    <span>Mục tiêu kỹ năng:</span>
                    <strong className="text-[var(--text-primary)]">Hands-on Production</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tỷ lệ code thực hành:</span>
                    <strong className="text-[var(--accent-phosphor)]">70% Thời lượng</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Môi trường thực thi:</span>
                    <strong className="text-[var(--text-primary)]">GPU & 3D WebGL Lab</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Đầu ra đánh giá:</span>
                    <strong className="text-[var(--accent-aqua)]">Capstone System</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Summary Grid Below */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
            {PILLARS_DATA.map((pillar, idx) => {
              const isSelected = idx === activePillarIdx;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarIdx(idx)}
                  className={`p-4 sm:p-5 rounded-[12px] bg-[var(--surface-card)] border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2 sm:space-y-3 ${
                    isSelected
                      ? "border-[var(--accent-aqua)] ring-2 ring-[var(--accent-aqua)]/20 shadow-md scale-[1.02]"
                      : "border-[var(--border-main)] hover:border-[var(--text-secondary)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? "text-[var(--accent-aqua)]" : "text-[var(--text-secondary)]"}`} />
                    <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-secondary)]">
                      {pillar.metric}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-mist)] block">
                      {pillar.number}
                    </span>
                    <h4 className="text-[12px] sm:text-[13px] font-medium uppercase text-[var(--text-primary)] truncate mt-0.5">
                      {pillar.domain}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Prompt to Next Chapter */}
          <NextChapterPrompt
            targetId="chapter-lab"
            label="CUỘN XUỐNG ĐỂ KHÁM PHÁ PHÒNG LAB 3D (CHƯƠNG 06)"
          />
        </div>
      </section>

      {/* =========================================================================
          CHƯƠNG 06 // PHÒNG LAB: KHÔNG GIAN HỌC TẬP TƯƠNG TÁC DIE-01
         ========================================================================= */}
      <section
        id="chapter-lab"
        className="relative w-full min-h-[90vh] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[var(--bg-recessed)] border-b border-[var(--border-main)] transition-colors duration-300 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto w-full space-y-8">
          <div className="bg-[var(--surface-card)] rounded-[16px] sm:rounded-[20px] p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[var(--border-main)] shadow-sm">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-[var(--border-main)]">
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <span className="px-2.5 py-1 rounded-[6px] bg-[var(--badge-bg)] text-[var(--accent-bioluminescent)] text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-medium">
                  HỒI 03 // LAB 3D
                </span>
                <span className="text-[11px] sm:text-[12px] font-mono text-[var(--text-mist)] uppercase truncate max-w-[200px] sm:max-w-none">
                  DIE-01 // 16 TENSOR CORES & HBM3 VRAM
                </span>
              </div>
              <Link
                href="/lab"
                className="inline-flex items-center space-x-1.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[var(--accent-bioluminescent)] hover:underline"
              >
                <span>Mở toàn màn hình Phòng Lab 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Content Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-6 sm:pt-8">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="text-[10px] sm:text-[11px] font-mono text-[var(--accent-aqua)] uppercase tracking-widest flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-ping" />
                  <span>MÔ-ĐUN BỔ TRỢ // PHÒNG LAB KHẢO SÁT PHẦN CỨNG 3D (TUẦN 08 & 25)</span>
                </div>

                <h2 className="text-[22px] sm:text-[30px] md:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
                  MÔ PHỎNG VI MẠCH BÁN DẪN & LƯỢNG TỬ HÓA VRAM
                </h2>

                <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  Lộ trình học tập tập trung vào Software Engineering & Ứng dụng thực tế. Tuy nhiên, ở Tuần 08 và Tuần 25, bạn sẽ dành khoảng 5–8 giờ tìm hiểu phần cứng vừa đủ: Hiểu cách bộ nhớ GPU, VRAM và băng thông bộ nhớ xử lý các phép tính lượng tử hóa (FP16, INT8, INT4) để tối ưu chi phí phục vụ mô hình (Inference).
                </p>

                {/* Micro specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-3 sm:p-3.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)] text-[9px] uppercase">LÕI MA TRẬN</div>
                    <div className="text-[var(--text-primary)] font-medium text-[11px] sm:text-[12px] mt-0.5">16 CLUSTERS (4x4)</div>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)] text-[9px] uppercase">BĂNG THÔNG HBM3</div>
                    <div className="text-[var(--text-primary)] font-medium text-[11px] sm:text-[12px] mt-0.5">4x @ 1.2 TB/S</div>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)] text-[9px] uppercase">LƯỢNG TỬ HÓA</div>
                    <div className="text-[var(--accent-aqua)] font-medium text-[11px] sm:text-[12px] mt-0.5">FP16 / INT8 / INT4</div>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/lesson/week-01"
                    style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
                    className="inline-flex items-center space-x-2.5 h-[46px] sm:h-[48px] px-6 sm:px-7 rounded-[6px] hover:opacity-95 text-[11px] sm:text-[12px] font-medium tracking-wider uppercase transition-all whitespace-nowrap shrink-0 shadow-lg"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>BẮT ĐẦU TUẦN 01 (PYTHON & MÔI TRƯỜNG)</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>

                  <Link
                    href="/lab"
                    className="inline-flex items-center space-x-2 h-[46px] sm:h-[48px] px-4.5 rounded-[6px] border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] sm:text-[12px] font-mono tracking-wider uppercase transition-all whitespace-nowrap bg-[var(--badge-bg)]"
                  >
                    <span>VÀO PHÒNG LAB 3D (THAM KHẢO)</span>
                  </Link>
                </div>
              </div>

              {/* Graphic Representation Teaser */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <Link
                  href="/lab"
                  className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-[14px] bg-[var(--bg-canvas)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)]/50 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 cursor-pointer group/box shadow-md"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--badge-bg)] border border-[var(--border-main)] flex items-center justify-center text-[var(--accent-bioluminescent)] mb-3 sm:mb-4 group-hover/box:scale-110 transition-transform">
                    <Cpu className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>

                  <span className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-[var(--text-primary)]">
                    MÔ HÌNH 3D COMPUTE DIE
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-[var(--text-secondary)] mt-1 font-mono max-w-xs">
                    Nhấn để tương tác vi mạch bán dẫn 3D với 16 cụm Tensor Core
                  </span>

                  <span className="mt-4 px-3.5 sm:px-4 py-2 rounded-[6px] bg-[var(--btn-surface-bg)] text-[var(--btn-surface-text)] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase border border-[var(--border-main)] flex items-center space-x-1.5 hover:bg-[var(--btn-surface-hover)]">
                    <span>MỞ GIAO DIỆN PHÒNG THÍ NGHIỆM</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-aqua)]" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Prompt to Next Chapter */}
          <NextChapterPrompt
            targetId="chapter-roadmap"
            label="CUỘN XUỐNG ĐỂ XEM TIẾN TRÌNH 6 THÁNG (CHƯƠNG 07)"
          />
        </div>
      </section>

      {/* =========================================================================
          CHƯƠNG 07 // LỘ TRÌNH: BẢN ĐỒ TIẾN HÓA 6 THÁNG
         ========================================================================= */}
      <section
        id="chapter-roadmap"
        className="relative w-full min-h-[90vh] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[var(--bg-canvas)] border-b border-[var(--border-main)] transition-colors duration-300 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-[var(--border-main)] pb-5 sm:pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)] mb-2 sm:mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.15em] uppercase text-[var(--text-mist)]">
                  HỒI 04 // 26-WEEK STRUCTURE // TIẾN HÓA 6 THÁNG
                </span>
              </div>
              <h2 className="text-[24px] sm:text-[34px] md:text-[40px] font-medium uppercase tracking-[-0.04em] text-[var(--text-primary)]">
                TỪ ZERO ĐẾN PRODUCTION AI PLATFORM
              </h2>
            </div>
            <Link
              href="/roadmap"
              className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-[var(--text-mist)] hover:text-[var(--accent-aqua)] transition-colors flex items-center space-x-1.5"
            >
              <span>XEM BẢN ĐỒ CHI TIẾT 26 TUẦN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Month Quick Selector Tabs (Scrollable on mobile) */}
          <div className="overflow-x-auto no-scrollbar flex items-center gap-2 pb-2 w-full">
            {PHASES_DATA.map((p, idx) => (
              <button
                key={p.month}
                onClick={() => setActiveMonthIdx(idx)}
                className={`px-3 py-1.5 rounded-[6px] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  idx === activeMonthIdx
                    ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                    : "bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--border-main)] hover:text-[var(--text-primary)]"
                }`}
              >
                {p.month}
              </button>
            ))}
          </div>

          {/* 6 Month Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PHASES_DATA.map((phase, idx) => {
              const isSelected = idx === activeMonthIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveMonthIdx(idx)}
                  className={`bg-[var(--surface-card)] rounded-[14px] sm:rounded-[16px] p-5 sm:p-7 space-y-3 sm:space-y-4 flex flex-col justify-between transition-all duration-300 border shadow-sm cursor-pointer ${
                    isSelected
                      ? "border-[var(--accent-aqua)] ring-2 ring-[var(--accent-aqua)]/20 scale-[1.01] sm:scale-[1.02] shadow-[0_0_20px_rgba(0,180,170,0.15)]"
                      : "border-[var(--border-main)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] border-b border-[var(--border-main)] pb-2 mb-3">
                      <span className="text-[var(--accent-aqua)] font-medium">{phase.month}</span>
                      <span className="text-[var(--text-secondary)]">{phase.weeks}</span>
                    </div>
                    <h4 className="text-[15px] sm:text-[17px] font-medium uppercase text-[var(--text-primary)] mb-1.5 sm:mb-2 leading-snug">
                      {phase.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-[var(--border-main)] text-[10px] sm:text-[11px] font-mono text-[var(--accent-phosphor)] font-medium">
                    ★ {phase.highlight}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/roadmap"
              style={{ background: "var(--btn-surface-bg)", color: "var(--btn-surface-text)" }}
              className="inline-flex items-center space-x-2 h-[46px] sm:h-[48px] px-6 sm:px-8 rounded-[6px] hover:opacity-90 text-[11px] sm:text-[12px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-colors shadow-sm"
            >
              <span>XEM ĐẦY ĐỦ 26 TUẦN & 10 CHUẨN NĂNG LỰC</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-aqua)]" />
            </Link>
          </div>

          {/* Scroll Prompt to Next Chapter */}
          <NextChapterPrompt
            targetId="chapter-radar"
            label="CUỘN XUỐNG ĐỂ XEM DAILY AI RADAR (CHƯƠNG 08)"
          />
        </div>
      </section>

      {/* =========================================================================
          CHƯƠNG 08 // RADAR: DAILY AI RADAR SHOWCASE
         ========================================================================= */}
      <section
        id="chapter-radar"
        className="relative w-full min-h-[85vh] py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[var(--bg-recessed)] border-b border-[var(--border-main)] transition-colors duration-300 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">
          <div className="bg-[var(--surface-card)] rounded-[16px] sm:rounded-[20px] p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6 border border-[var(--border-main)] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[var(--border-main)] pb-4">
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
                <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-widest text-[var(--text-mist)] font-medium">
                  HỒI 05 // DAILY AI RADAR
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsRadarModalOpen(true)}
                  className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--accent-bioluminescent)] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <span>Mở cửa sổ chi tiết Radar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/radar"
                  className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1"
                >
                  <span>Trang tạp chí Radar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                <div className="text-[10px] sm:text-[11px] font-mono text-[var(--text-secondary)] uppercase">
                  TRENDING REPO HÔM NAY: <strong className="text-[var(--text-primary)]">vllm-project / vllm (35.2k★)</strong>
                </div>

                <blockquote className="border-l-3 border-[var(--accent-bioluminescent)] pl-3 sm:pl-4 italic text-[14px] sm:text-[16px] md:text-[18px] text-[var(--text-primary)] leading-relaxed bg-[var(--bg-canvas)]/40 py-2 rounded-r-[6px]">
                  "Băng thông bộ nhớ (Memory Bandwidth) là nút thắt lớn nhất khi chạy suy luận LLM, chứ không phải xung nhịp tính toán.
                  Mọi tối ưu luôn bắt đầu từ việc giải quyết bài toán Memory-bound."
                </blockquote>

                <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Thư viện tiêu chuẩn công nghiệp phục vụ inference và serving LLM với thông lượng cao nhất hiện nay, nhờ cơ chế
                  quản lý bộ nhớ phân trang PagedAttention và nhân FP8 GEMM tối ưu hóa trực tiếp cho phần cứng.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[var(--bg-canvas)] border border-[var(--border-main)] rounded-[12px] p-4 sm:p-5 space-y-3 font-mono text-[10px] sm:text-[11px] shadow-sm">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] uppercase">
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent-bioluminescent)]" />
                    <span>LỆNH CHẠY THỬ NHANH</span>
                  </span>
                  <button
                    onClick={handleCopyCmd}
                    className="text-[var(--accent-bioluminescent)] hover:underline uppercase cursor-pointer"
                  >
                    {copiedCmd ? "ĐÃ SAO CHÉP ✓" : "SAO CHÉP LỆNH"}
                  </button>
                </div>

                <pre className="p-3 bg-[var(--surface-card)] rounded-[6px] text-[10px] sm:text-[11px] text-[var(--text-primary)] overflow-x-auto leading-relaxed border border-[var(--border-main)]">
                  <code>git clone https://github.com/vllm-project/vllm
pip install vllm
vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Scroll Prompt to Next Chapter */}
          <NextChapterPrompt
            targetId="chapter-cta"
            label="CUỘN XUỐNG HỒI KẾT & KHỞI HÀNH (CHƯƠNG 09)"
          />
        </div>
      </section>

      {/* =========================================================================
          CHƯƠNG 09 // HỒI KẾT: SẴN SÀNG KHỞI HÀNH (FINAL CALL TO ACTION)
         ========================================================================= */}
      <section
        id="chapter-cta"
        className="relative w-full min-h-[75vh] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 text-center bg-[var(--bg-canvas)] overflow-hidden transition-colors duration-300 flex flex-col justify-center"
      >
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 relative z-10 w-full">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--text-mist)]">
              HỒI KẾT // READY TO LEVEL UP
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[38px] md:text-[48px] font-medium uppercase tracking-[-0.04em] text-[var(--text-primary)] leading-tight">
            SẴN SÀNG XÂY DỰNG TƯ DUY <br />
            KỸ SƯ AI THỰC THỤ?
          </h2>

          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Bước vào không gian phòng thí nghiệm 3D để khám phá bài học đầu tiên về giải phẫu phần cứng và lượng tử hóa ma trận.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/learn"
              style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
              className="h-[48px] sm:h-[50px] px-6 sm:px-8 rounded-[6px] hover:opacity-95 text-[12px] sm:text-[13px] font-medium tracking-[0.08em] uppercase transition-all shadow-[0_0_24px_rgba(0,180,170,0.3)] flex items-center justify-center space-x-2.5 whitespace-nowrap cursor-pointer text-center"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>BẮT ĐẦU HỌC (CHỌN BÀI HỌC)</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </Link>

            <Link
              href="/roadmap"
              style={{ background: "var(--btn-surface-bg)", color: "var(--btn-surface-text)" }}
              className="h-[48px] sm:h-[50px] px-6 sm:px-7 rounded-[6px] border border-[var(--border-main)] hover:opacity-90 text-[12px] sm:text-[13px] font-medium tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 whitespace-nowrap shadow-sm text-center"
            >
              <span>XEM TOÀN BỘ GIÁO TRÌNH</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recessed Well Footer */}
      <footer className="w-full border-t border-[var(--border-main)] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-[var(--bg-recessed)] text-[11px] sm:text-[12px] font-mono text-[var(--text-secondary)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="text-[var(--text-primary)] font-medium">AUROS AI LAB</span>
            <span className="text-[var(--accent-bioluminescent)]">//</span>
            <span className="truncate">26-WEEK AI CURRICULUM</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              TRANG CHỦ
            </Link>
            <Link href="/learn" className="hover:text-[var(--accent-aqua)] transition-colors text-[var(--text-mist)]">
              BẮT ĐẦU HỌC
            </Link>
            <Link href="/lab" className="hover:text-[var(--text-primary)] transition-colors">
              PHÒNG LAB 3D
            </Link>
            <Link href="/anatomy-3d" className="text-[var(--accent-aqua)] hover:underline transition-colors">
              GIẢI MÃ 3D
            </Link>
            <Link href="/playground" className="text-emerald-400 hover:underline transition-colors font-semibold">
              PLAYGROUND
            </Link>
            <Link href="/roadmap" className="hover:text-[var(--text-primary)] transition-colors">
              LỘ TRÌNH 26 TUẦN
            </Link>
            <Link href="/radar" className="hover:text-[var(--text-primary)] transition-colors">
              DAILY RADAR
            </Link>
            <a
              href="https://github.com/HuongDS/ai_learning"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1"
            >
              <span>GITHUB</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[var(--text-secondary)]">
            DUAL THEME // {theme === "dark" ? "AUROS ABYSSAL DARK" : "GLACIAL AQUA LIGHT"}
          </div>
        </div>
      </footer>

      {/* Daily AI Radar Modal Popup */}
      <DailyRadarModal
        isOpen={isRadarModalOpen}
        onClose={() => setIsRadarModalOpen(false)}
      />
    </main>
  );
}
