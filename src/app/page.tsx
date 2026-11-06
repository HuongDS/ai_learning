"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Flame,
  Sun,
  Moon,
  Layers,
  Cpu,
  Workflow,
  Boxes,
  Database,
  Terminal,
  CheckCircle2,
  Sparkles,
  Compass,
  Activity,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import DailyRadarModal from "@/components/DailyRadarModal";

export default function WelcomePage() {
  const { theme, toggleTheme } = useTheme();
  const [isRadarModalOpen, setIsRadarModalOpen] = useState<boolean>(false);
  const [unlockedArtifacts, setUnlockedArtifacts] = useState<string[]>([]);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oryzo_unlocked_artifacts");
      if (saved) {
        setUnlockedArtifacts(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const isDayOneUnlocked = unlockedArtifacts.includes("compute_die");

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("pip install vllm && vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <main className="relative min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Fixed Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 py-4 flex items-center justify-between bg-[var(--bg-canvas)]/85 backdrop-blur-md border-b border-[var(--border-main)]">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-[14px] sm:text-[16px] font-medium tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center space-x-2">
            <span>ORYZO</span>
            <span className="text-[var(--accent-ember)] font-normal">//</span>
            <span>AI LAB</span>
          </Link>
          <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] border-l border-[var(--border-main)] pl-3 font-mono">
            ACADEMY & ORCHESTRATION
          </span>
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
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            02. DAILY RADAR
          </button>
          <Link
            href="/lab"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            03. PHÒNG LAB 3D
          </Link>
          <Link
            href="/lesson/day-01"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            04. BÀI HỌC DAY 01
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center space-x-3">
          {/* Daily Radar Modal Trigger */}
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-[22.5px] border border-[var(--accent-ember)]/40 bg-[var(--accent-ember)]/10 text-[var(--accent-ember)] text-[10px] font-mono tracking-wider uppercase hover:bg-[var(--accent-ember)]/20 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>DAILY RADAR</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors"
            title="Chuyển chế độ Sáng / Tối"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Enter Lab Button */}
          <Link
            href="/lab"
            className="hidden md:flex items-center space-x-1.5 h-[36px] px-4 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-colors"
          >
            <span>VÀO PHÒNG LAB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full pt-32 sm:pt-40 pb-20 px-6 sm:px-12 border-b border-[var(--border-main)] overflow-hidden">
        {/* Subtle grid background texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--border-main) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 z-10">
          {/* Giant Hero Title */}
          <div className="space-y-2">
            <h1 className="text-[36px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[0.94]">
              HỌC AI TỪ CON SỐ 0
            </h1>
            <span className="block text-[32px] sm:text-[50px] md:text-[62px] lg:text-[70px] font-serif italic text-[var(--accent-ember)] font-normal leading-[1.05]">
              Đến Kỹ Sư AI Orchestration
            </span>
          </div>

          {/* Editorial Subtitle */}
          <p className="max-w-3xl text-[16px] sm:text-[19px] lg:text-[21px] font-normal leading-relaxed text-[var(--text-secondary)]">
            Không chỉ dừng lại ở Prompting. Đây là hệ thống đào tạo chuyên sâu kết hợp trực quan hóa vi mạch bán dẫn 3D
            (Silicon Architecture), kỹ nghệ điều phối đa tác tử tự trị (Autonomous Multi-Agent Systems), và cập nhật xu hướng
            công nghệ hàng ngày từ cộng đồng Open Source toàn cầu.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* The primary button leading directly to the 3D chip workspace */}
            <Link
              href="/lab"
              className="h-[52px] px-8 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[12px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-all duration-200 shadow-xl flex items-center space-x-3 group cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[var(--accent-ember)] shrink-0" />
              <span>BẮT ĐẦU BÀI HỌC (VÀO LAB 3D)</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link
              href="/roadmap"
              className="h-[52px] px-7 rounded-[36px] border border-[var(--border-main)] hover:border-[var(--text-primary)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-card)] text-[var(--text-primary)] text-[12px] font-medium tracking-widest uppercase transition-all duration-200 flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
              <span>XEM LỘ TRÌNH 26 TUẦN</span>
            </Link>

            <button
              onClick={() => setIsRadarModalOpen(true)}
              className="h-[52px] px-6 rounded-[36px] border border-[var(--accent-ember)]/30 hover:border-[var(--accent-ember)] bg-[var(--accent-ember)]/5 text-[var(--accent-ember)] text-[12px] font-medium tracking-widest uppercase transition-all duration-200 flex items-center space-x-2"
            >
              <Flame className="w-4 h-4 shrink-0" />
              <span>DAILY AI RADAR</span>
            </button>
          </div>

          {/* Status Badges Row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] border-t border-[var(--border-main)]/60 w-full max-w-2xl">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% 3D Hardware Anatomy</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Multi-Agent Orchestration</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Production Serving (vLLM)</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. 3D Lab Workspace Callout / Preview Card */}
      <section className="relative w-full py-16 px-6 sm:px-12 border-b border-[var(--border-main)] bg-[var(--surface-elevated)]/30">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[16px] p-6 sm:p-10 shadow-lg relative overflow-hidden group hover:border-[var(--accent-ember)]/60 transition-all duration-300">
            {/* Top Bar of the Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-main)]">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-[22.5px] bg-[var(--accent-ember)]/15 text-[var(--accent-ember)] text-[10px] font-mono tracking-widest uppercase font-medium">
                  KHÔNG GIAN HỌC TẬP TƯƠNG TÁC
                </span>
                <span className="text-[12px] font-mono text-[var(--text-secondary)] uppercase">
                  DIE-01 // SILICON & TENSORS WORKSPACE
                </span>
              </div>
              <Link
                href="/lab"
                className="inline-flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--accent-ember)] hover:underline"
              >
                <span>Mở toàn màn hình phòng Lab 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Content Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-[11px] font-mono text-[var(--accent-ember)] uppercase tracking-widest flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)]" />
                  <span>BÀI HỌC KHỞI ĐẦU // DAY 01</span>
                </div>

                <h2 className="text-[26px] sm:text-[34px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
                  GIẢI PHẪU VI MẠCH TÍNH TOÁN AI: 16 TENSOR CORES & HBM3 VRAM
                </h2>

                <p className="text-[14px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
                  Trước khi viết code huấn luyện hoặc prompt mô hình, một AI Software Engineer cần hiểu phần cứng thực thi
                  các phép nhân ma trận (GEMM) ra sao. Trong phòng thí nghiệm 3D, bạn sẽ tương tác xoay 360°, tách lớp
                  các tầng bán dẫn (Explode view), và mô phỏng xung nhịp lượng tử hóa (FP16, INT8, INT4).
                </p>

                {/* Micro specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)] text-[9px] uppercase">LÕI MA TRẬN</div>
                    <div className="text-[var(--text-primary)] font-medium text-[12px] mt-0.5">16 CLUSTERS (4x4)</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)] text-[9px] uppercase">BĂNG THÔNG HBM3</div>
                    <div className="text-[var(--text-primary)] font-medium text-[12px] mt-0.5">4x @ 1.2 TB/S</div>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)] col-span-2 sm:col-span-1">
                    <div className="text-[var(--text-secondary)] text-[9px] uppercase">LƯỢNG TỬ HÓA</div>
                    <div className="text-[var(--accent-ember)] font-medium text-[12px] mt-0.5">FP16 / INT8 / INT4</div>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href="/lab"
                    className="inline-flex items-center space-x-2.5 h-[48px] px-7 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[var(--accent-ember)]" />
                    <span>VÀO PHÒNG LAB & BẮT ĐẦU BÀI HỌC DAY 01</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Graphic Representation Teaser */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <Link
                  href="/lab"
                  className="w-full aspect-[4/3] rounded-[12px] bg-[var(--bg-canvas)] border border-[var(--border-main)] hover:border-[var(--accent-ember)] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 cursor-pointer shadow-inner group/box"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-ember)]/10 border border-[var(--accent-ember)]/30 flex items-center justify-center text-[var(--accent-ember)] mb-4 group-hover/box:scale-110 transition-transform">
                    <Cpu className="w-8 h-8" />
                  </div>

                  <span className="text-[13px] font-medium uppercase tracking-wider text-[var(--text-primary)]">
                    MÔ HÌNH 3D COMPUTE DIE
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">
                    Nhấn vào đây để xem không gian vi mạch 3D trực quan
                  </span>

                  <span className="mt-4 px-4 py-1.5 rounded-[22.5px] bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] text-[10px] font-mono tracking-widest uppercase border border-[var(--border-main)] flex items-center space-x-1.5 group-hover/box:bg-[var(--btn-solid-hover)]">
                    <span>MỞ GIAO DIỆN PHÒNG THÍ NGHIỆM</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars Bento Grid */}
      <section className="relative w-full py-20 px-6 sm:px-12 border-b border-[var(--border-main)]">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-main)] pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent-ember)] block mb-1">
                FOUNDATIONAL PILLARS // TRIẾT LÝ ĐÀO TẠO
              </span>
              <h2 className="text-[26px] sm:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                4 TRỤ CỘT CỦA KỸ SƯ AI THỰC CHIẾN
              </h2>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] max-w-md font-sans">
              Định hình tư duy thiết kế hệ thống từ mức độ phần cứng đến tầng điều phối đa tác tử cấp cao.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[14px] p-7 space-y-4 hover:border-[var(--text-primary)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--accent-ember)]">PILLAR 01</span>
                <Cpu className="w-5 h-5 text-[var(--accent-ember)]" />
              </div>
              <h3 className="text-[20px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                GIẢI PHẪU PHẦN CỨNG & VĂN HÓA MEMORY-BOUND
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                Hiểu tận gốc vì sao LLM suy luận lại bị nghẽn ở băng thông bộ nhớ (Memory Bandwidth), chứ không phải xung nhịp tính toán.
                Nắm vững phép nhân ma trận GEMM, FP16/INT8/INT4/FP8 Quantization và cách vLLM dùng PagedAttention để triệt tiêu phân mảnh VRAM.
              </p>
              <div className="pt-2">
                <Link
                  href="/lab"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-ember)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Khám phá mô hình 3D Chip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[14px] p-7 space-y-4 hover:border-[var(--text-primary)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--accent-ember)]">PILLAR 02</span>
                <Workflow className="w-5 h-5 text-[var(--accent-ember)]" />
              </div>
              <h3 className="text-[20px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                AI ORCHESTRATION & AGENTIC WORKFLOWS
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                Vượt ra ngoài việc gọi API đơn lẻ. Học cách xây dựng hệ thống Multi-Agent có thể tự lập kế hoạch (Planning),
                truy xuất dữ liệu (Dynamic Tool Calling), tự phản biện (Self-Reflection) và điều phối phức tạp qua LangGraph, AutoGen, CrewAI.
              </p>
              <div className="pt-2">
                <Link
                  href="/roadmap"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-ember)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Xem Module Multi-Agent (Tháng 5)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[14px] p-7 space-y-4 hover:border-[var(--text-primary)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--accent-ember)]">PILLAR 03</span>
                <Database className="w-5 h-5 text-[var(--accent-ember)]" />
              </div>
              <h3 className="text-[20px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                PRODUCTION RAG & EMBEDDINGS ARCHITECTURE
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                50% thời lượng lộ trình tập trung vào RAG nâng cao: Chunking ngữ nghĩa, Vector DBs (Qdrant, Milvus), Hybrid Search
                (Dense + Sparse BM25), Cross-Encoder Re-ranking, Context Compression và GraphRAG nhằm giải quyết triệt để ảo giác (hallucination).
              </p>
              <div className="pt-2">
                <Link
                  href="/roadmap"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-ember)] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Xem Chi tiết Module RAG (Tháng 3)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[14px] p-7 space-y-4 hover:border-[var(--text-primary)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--accent-ember)]">PILLAR 04</span>
                <Boxes className="w-5 h-5 text-[var(--accent-ember)]" />
              </div>
              <h3 className="text-[20px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                BỘ NÃO SỐ 3D (SENTIENT CORE GAMIFICATION)
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                Mỗi bài học hoàn thành không chỉ là dòng tick danh sách. Bạn sẽ nhận được các mảnh linh kiện 3D tương tác
                (Silicon Die, HBM Stack, Attention Core, Agent Matrix) để tự tay lắp ráp nên cỗ máy tính toán 3D của riêng bạn.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-500 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Trạng thái: {isDayOneUnlocked ? "Đã mở khóa Die-01" : "Chưa kích hoạt (Học Day 01 để mở)"}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 6-Month Curriculum Timeline Snapshot */}
      <section className="relative w-full py-20 px-6 sm:px-12 border-b border-[var(--border-main)] bg-[var(--surface-elevated)]/20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-main)] pb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent-ember)] block mb-1">
                26-WEEK STRUCTURE // LỘ TRÌNH 6 THÁNG
              </span>
              <h2 className="text-[26px] sm:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                TỪ ZERO ĐẾN PRODUCTION AI PLATFORM
              </h2>
            </div>
            <Link
              href="/roadmap"
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-ember)] transition-colors flex items-center space-x-1.5"
            >
              <span>XEM BẢN ĐỒ CHI TIẾT 26 TUẦN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6 Month Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                month: "THÁNG 01",
                weeks: "TUẦN 01 — 04",
                title: "Nền Tảng Kỹ Thuật & Tư Duy Mô Hình",
                desc: "Đại số tuyến tính, giải tích vi phân cho AI, PyTorch Tensors, Autograd và kiến trúc GPU.",
                highlight: "Milestone: Huấn luyện neural network thuần PyTorch từ đầu",
              },
              {
                month: "THÁNG 02",
                weeks: "TUẦN 05 — 08",
                title: "Transformers & Modern LLM Architecture",
                desc: "Cơ chế Self-Attention, Positional Encoding (RoPE), FlashAttention, BPE Tokenization và GPT Decoder-only.",
                highlight: "Milestone: Tự code một Transformer mini hoàn chỉnh",
              },
              {
                month: "THÁNG 03",
                weeks: "TUẦN 09 — 13",
                title: "Advanced RAG Architecture",
                desc: "Semantic chunking, Vector DBs, Hybrid Search, Cross-Encoder Re-ranking, Context Compression & GraphRAG.",
                highlight: "Milestone: Production Enterprise RAG System",
              },
              {
                month: "THÁNG 04",
                weeks: "TUẦN 14 — 17",
                title: "Fine-Tuning & Quantization",
                desc: "PEFT, LoRA, QLoRA 4-bit, DPO, RLHF căn bản, chuẩn bị dataset chuẩn và đóng gói GGUF/AWQ.",
                highlight: "Milestone: Fine-tuned domain LLM chạy mượt trên 1 GPU",
              },
              {
                month: "THÁNG 05",
                weeks: "TUẦN 18 — 22",
                title: "AI Orchestration & Autonomous Agents",
                desc: "Function Calling, ReAct pattern, LangGraph stateful loops, Multi-Agent swarms và Human-in-the-loop.",
                highlight: "Milestone: Đội ngũ Agent tự động giải quyết bài toán phức tạp",
              },
              {
                month: "THÁNG 06",
                weeks: "TUẦN 23 — 26",
                title: "Capstone Platform & Production Serving",
                desc: "vLLM, Triton Inference Server, Continuous Batching, PagedAttention, Docker/K8s & Observability (Langfuse).",
                highlight: "Milestone: Hệ thống AI phục vụ 100+ req/sec với p99 latency thấp",
              },
            ].map((phase, idx) => (
              <div
                key={idx}
                className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[12px] p-6 space-y-3 flex flex-col justify-between hover:border-[var(--accent-ember)]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-secondary)] border-b border-[var(--border-main)] pb-2 mb-3">
                    <span className="text-[var(--accent-ember)] font-medium">{phase.month}</span>
                    <span>{phase.weeks}</span>
                  </div>
                  <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)] mb-2">
                    {phase.title}
                  </h4>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-main)]/60 text-[11px] font-mono text-[var(--accent-ember)]">
                  ★ {phase.highlight}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/roadmap"
              className="inline-flex items-center space-x-2 h-[48px] px-8 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[12px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-colors shadow-md"
            >
              <span>XEM ĐẦY ĐỦ 26 TUẦN & 10 CHUẨN NĂNG LỰC</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Daily AI Radar Showcase */}
      <section className="relative w-full py-16 px-6 sm:px-12 border-b border-[var(--border-main)]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[16px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-4">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ember)] animate-pulse" />
                <span className="text-[12px] font-mono uppercase tracking-widest text-[var(--accent-ember)] font-medium">
                  DAILY AI RADAR // BẢN TIN TỰ ĐỘNG HÀNG NGÀY
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsRadarModalOpen(true)}
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-ember)] hover:underline flex items-center space-x-1"
                >
                  <span>Mở cửa sổ chi tiết Radar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/radar"
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1"
                >
                  <span>Trang tạp chí Radar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
                  TRENDING REPO HÔM NAY: <strong className="text-[var(--text-primary)]">vllm-project / vllm (35.2k★)</strong>
                </div>

                <blockquote className="border-l-2 border-[var(--accent-ember)] pl-4 italic text-[15px] sm:text-[17px] text-[var(--text-primary)] leading-relaxed">
                  "Băng thông bộ nhớ (Memory Bandwidth) là nút thắt lớn nhất khi chạy suy luận LLM, chứ không phải xung nhịp tính toán.
                  Mọi tối ưu luôn bắt đầu từ việc giải quyết bài toán Memory-bound."
                </blockquote>

                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Thư viện tiêu chuẩn công nghiệp phục vụ inference và serving LLM với thông lượng cao nhất hiện nay, nhờ cơ chế
                  quản lý bộ nhớ phân trang PagedAttention và nhân FP8 GEMM tối ưu hóa trực tiếp cho phần cứng.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[var(--bg-canvas)] border border-[var(--border-main)] rounded-[12px] p-5 space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] uppercase">
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent-ember)]" />
                    <span>LỆNH CHẠY THỬ NHANH</span>
                  </span>
                  <button
                    onClick={handleCopyCmd}
                    className="text-[var(--accent-ember)] hover:underline uppercase"
                  >
                    {copiedCmd ? "ĐÃ SAO CHÉP ✓" : "SAO CHÉP LỆNH"}
                  </button>
                </div>

                <pre className="p-3 bg-[var(--surface-card)] rounded-[8px] text-[11px] text-[var(--text-primary)] overflow-x-auto leading-relaxed border border-[var(--border-main)]">
                  <code>git clone https://github.com/vllm-project/vllm
pip install vllm
vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Final Call to Action */}
      <section className="relative w-full py-24 px-6 sm:px-12 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-ember)]">
            READY TO LEVEL UP // BẮT ĐẦU NGAY BÂY GIỜ
          </span>

          <h2 className="text-[32px] sm:text-[46px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
            SẴN SÀNG XÂY DỰNG TƯ DUY <br />
            KỸ SƯ AI THỰC THỤ?
          </h2>

          <p className="text-[15px] sm:text-[18px] text-[var(--text-secondary)] leading-relaxed">
            Bước vào không gian phòng thí nghiệm 3D để khám phá bài học đầu tiên về giải phẫu phần cứng và lượng tử hóa ma trận.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/lab"
              className="h-[52px] px-8 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[12px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-all duration-200 shadow-xl flex items-center space-x-2.5 group cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[var(--accent-ember)] shrink-0" />
              <span>BẮT ĐẦU BÀI HỌC (VÀO PHÒNG LAB 3D)</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link
              href="/roadmap"
              className="h-[52px] px-7 rounded-[36px] border border-[var(--border-main)] hover:border-[var(--text-primary)] bg-[var(--surface-card)] text-[var(--text-primary)] text-[12px] font-medium tracking-widest uppercase transition-colors flex items-center space-x-2"
            >
              <span>XEM TOÀN BỘ GIÁO TRÌNH</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Editorial Footer */}
      <footer className="w-full border-t border-[var(--border-main)] px-6 sm:px-12 py-8 bg-[var(--bg-canvas)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--text-primary)] font-medium">ORYZO AI LAB</span>
            <span>//</span>
            <span>26-WEEK AI SOFTWARE ENGINEER CURRICULUM</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              TRANG CHỦ
            </Link>
            <Link href="/lab" className="hover:text-[var(--text-primary)] transition-colors text-[var(--accent-ember)]">
              PHÒNG LAB 3D
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

          <div className="text-[10px] tracking-wider uppercase text-[var(--text-secondary)]">
            DUAL THEME // LIGHT & DARKROOM MODE
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
