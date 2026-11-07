"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Flame,
  Layers,
  Cpu,
  Workflow,
  Boxes,
  Database,
  Terminal,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowUpRight,
  ExternalLink,
  Code2,
} from "lucide-react";
import DailyRadarModal from "@/components/DailyRadarModal";
import BioluminescentSphere from "@/components/BioluminescentSphere";

export default function WelcomePage() {
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
    navigator.clipboard.writeText(
      "pip install vllm && vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000"
    );
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#012624] text-[#ffffff] selection:bg-[#003734] selection:text-[#cbfffc] flex flex-col justify-between overflow-x-hidden">
      {/* 1. Transparent Navigation Bar (Auros Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 py-5 flex items-center justify-between bg-[#012624]/85 backdrop-blur-md border-b border-[#003734]/80">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="text-[13px] sm:text-[15px] font-medium tracking-[0.18em] uppercase text-[#ffffff] flex items-center space-x-2"
          >
            <span>AUROS</span>
            <span className="text-[#00827c] font-normal">//</span>
            <span>AI LAB</span>
          </Link>
          <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.15em] text-[#bbc7c6] border-l border-[#003734] pl-3 font-mono">
            ABYSSAL TERMINAL & HARDWARE ANATOMY
          </span>
        </div>

        {/* Center Ghost Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[12px] font-normal tracking-[0.12em] uppercase text-[#bbc7c6]">
          <Link
            href="/roadmap"
            className="hover:text-[#ffffff] transition-colors"
          >
            01. LỘ TRÌNH 26 TUẦN
          </Link>
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="hover:text-[#ffffff] transition-colors uppercase tracking-[0.12em]"
          >
            02. DAILY RADAR
          </button>
          <Link
            href="/learn"
            className="hover:text-[#ffffff] transition-colors"
          >
            03. BẮT ĐẦU HỌC
          </Link>
          <Link
            href="/lab"
            className="hover:text-[#ffffff] transition-colors"
          >
            04. PHÒNG LAB 3D
          </Link>
        </nav>

        {/* Right CTA Controls */}
        <div className="flex items-center space-x-3">
          {/* Daily Radar Trigger */}
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-[6px] border border-[#003734] bg-[#003734]/60 text-[#edfffe] text-[11px] font-mono tracking-widest uppercase hover:bg-[#003734] transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-[#cbfffc]" />
            <span>RADAR</span>
          </button>

          {/* Signature Aurora Gradient Button */}
          <Link
            href="/learn"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-[6px] bg-gradient-to-r from-[#cbfffc] via-[#edfffe] to-[#fad1ff] hover:opacity-95 text-[#012624] text-[12px] font-medium tracking-[0.08em] uppercase transition-all shadow-[0_0_20px_rgba(203,255,252,0.25)] whitespace-nowrap shrink-0"
          >
            <span>BẮT ĐẦU HỌC</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 text-[#012624]" />
          </Link>
        </div>
      </header>

      {/* 2. Hero Section with 3D Bioluminescent Particle Sphere */}
      <section className="relative w-full pt-32 sm:pt-40 pb-24 px-6 sm:px-12 border-b border-[#003734]/80 overflow-hidden">
        {/* Ambient atmospheric teal glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#003734]/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left Column: Text Stack */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Uppercase Section Label (Eyebrow) */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[6px] bg-[#003734]/60 border border-[#003734]">
              <span className="w-2 h-2 rounded-full bg-[#cbfffc] animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#edfffe]">
                AUROS // STRATEGIC CURRICULUM ARCHITECTURE
              </span>
            </div>

            {/* Massive Hero Headline */}
            <h1 className="text-[42px] sm:text-[62px] md:text-[72px] lg:text-[78px] font-medium uppercase tracking-[-0.04em] text-[#ffffff] leading-[1.02]">
              LỘ TRÌNH HỌC AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#cbfffc] to-[#fde9ff]">
                TOÀN DIỆN CHO KỸ SƯ
              </span>
            </h1>

            {/* Cinematic Subtext */}
            <p className="max-w-2xl text-[16px] sm:text-[18px] font-normal leading-[1.45] text-[#bbc7c6]">
              Định hướng chuyển dịch từ <strong className="text-[#ffffff] font-medium">Software Engineer</strong> thành Kỹ sư AI chuyên sâu về <strong className="text-[#edfffe] font-medium">LLM Systems & Autonomous Agents</strong> trong 26 tuần. Tự tay làm chủ vi mạch bán dẫn 3D, kiến trúc suy luận phân trang vLLM và hệ thống đa tác tử tự hành mà không sa đà vào toán học hàn lâm.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/learn"
                className="h-[48px] px-7 rounded-[6px] bg-gradient-to-r from-[#cbfffc] via-[#edfffe] to-[#fad1ff] hover:opacity-95 text-[#012624] text-[13px] font-medium tracking-[0.08em] uppercase transition-all shadow-[0_0_24px_rgba(203,255,252,0.3)] flex items-center space-x-2.5 whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-4 h-4 shrink-0 text-[#012624]" />
                <span>BẮT ĐẦU HỌC (CHỌN BÀI HỌC)</span>
                <ArrowRight className="w-4 h-4 shrink-0 text-[#012624]" />
              </Link>

              <Link
                href="/roadmap"
                className="h-[48px] px-6 rounded-[6px] bg-[#003734] hover:bg-[#004a46] text-[#ffffff] text-[13px] font-medium tracking-[0.08em] uppercase border border-[#004a46] transition-colors flex items-center space-x-2 whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#edfffe] shrink-0" />
                <span>XEM LỘ TRÌNH 26 TUẦN</span>
              </Link>

              <button
                onClick={() => setIsRadarModalOpen(true)}
                className="h-[48px] px-5 rounded-[6px] bg-transparent hover:bg-[#003734]/40 text-[#edfffe] text-[13px] font-mono tracking-widest uppercase border border-[#003734] transition-colors flex items-center space-x-2 whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-[#cbfffc] shrink-0" />
                <span>DAILY RADAR</span>
              </button>
            </div>

            {/* Micro specs row */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-[11px] font-mono uppercase tracking-[0.1em] text-[#bbc7c6] border-t border-[#003734]/80">
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#cbfffc]" />
                <span>100% 3D Hardware Anatomy</span>
              </span>
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#cbfffc]" />
                <span>Multi-Agent Swarm Loops</span>
              </span>
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#cbfffc]" />
                <span>Production vLLM Serving</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Bioluminescent Particle Sphere Orb */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px]">
              <BioluminescentSphere className="w-full h-full" />
              {/* Overlay data readout tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-[6px] bg-[#011d1c]/90 border border-[#003734] text-[10px] font-mono tracking-wider flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#cbfffc] animate-ping" />
                  <span className="text-[#edfffe] uppercase">CORE DATA ORB // ACTIVE</span>
                </div>
                <span className="text-[#bbc7c6]">2,200 BIOLUMINESCENT NODES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Large Statistics Counter Block (Auros Matter 500 Lavender Phosphor) */}
      <section className="relative w-full py-16 px-6 sm:px-12 bg-[#011d1c] border-b border-[#003734]/80">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="text-[54px] sm:text-[72px] lg:text-[84px] font-medium tracking-[-0.04em] text-[#fde9ff] leading-none">
              26W
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.08em] text-[#edfffe]">
              THỜI LƯỢNG 26 TUẦN
            </div>
            <div className="text-[12px] text-[#bbc7c6] leading-normal">
              1 Lộ trình xuyên suốt từ nền tảng đến production.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[54px] sm:text-[72px] lg:text-[84px] font-medium tracking-[-0.04em] text-[#fde9ff] leading-none">
              180+
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.08em] text-[#edfffe]">
              TỔNG THỜI LƯỢNG HỌC
            </div>
            <div className="text-[12px] text-[#bbc7c6] leading-normal">
              70% Thời lượng code thực hành & dự án Capstone.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[54px] sm:text-[72px] lg:text-[84px] font-medium tracking-[-0.04em] text-[#fde9ff] leading-none">
              16x
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.08em] text-[#edfffe]">
              TENSOR CORES 3D LAB
            </div>
            <div className="text-[12px] text-[#bbc7c6] leading-normal">
              Giải phẫu vi mạch tính toán bán dẫn tương tác xoay 360°.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[54px] sm:text-[72px] lg:text-[84px] font-medium tracking-[-0.04em] text-[#fde9ff] leading-none">
              100%
            </div>
            <div className="text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.08em] text-[#edfffe]">
              PRODUCTION READY
            </div>
            <div className="text-[12px] text-[#bbc7c6] leading-normal">
              Đóng gói và triển khai mô hình với vLLM & Triton Server.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Explore Feature Surface Cards (#003734 Liquid Kelp, 16px radius, no shadows) */}
      <section className="relative w-full py-24 px-6 sm:px-12 border-b border-[#003734]/80 bg-[#012624]">
        <div className="max-w-7xl mx-auto space-y-14">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#003734] pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#edfffe] block">
                FOUNDATIONAL PILLARS // 4 TRỤ CỘT CHIẾN LƯỢC
              </span>
              <h2 className="text-[32px] sm:text-[44px] font-medium uppercase tracking-[-0.04em] text-[#ffffff] leading-tight">
                CÁC KHỐI KIẾN THỨC CỐT LÕI
              </h2>
            </div>
            <p className="text-[14px] text-[#bbc7c6] max-w-md leading-relaxed">
              Thiết kế chuyên biệt cho Kỹ sư Phần mềm muốn làm chủ tầng sâu của hệ thống AI hiện đại thay vì chỉ dừng ở Prompt Engineering.
            </p>
          </div>

          {/* 4 Surface Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Card 1 */}
            <div className="bg-[#003734] rounded-[16px] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:bg-[#00423f] transition-all duration-200 group">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-[6px] bg-[#012624] text-[#cbfffc]">
                  <Cpu className="w-6 h-6" />
                </div>
                {/* 32x32 Arrow Icon Button with 6px radius */}
                <Link
                  href="/lab"
                  className="w-8 h-8 rounded-[6px] bg-[#012624]/70 hover:bg-[#012624] text-[#ffffff] flex items-center justify-center transition-colors"
                  aria-label="Open 3D Lab"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#edfffe] uppercase">
                  PILLAR 01 // 25% THỜI LƯỢNG
                </span>
                <h3 className="text-[26px] sm:text-[30px] font-medium uppercase tracking-tight text-[#ffffff] leading-tight">
                  GIẢI PHẪU PHẦN CỨNG & VĂN HÓA MEMORY-BOUND
                </h3>
                <p className="text-[15px] text-[#bbc7c6] leading-relaxed">
                  Hiểu cặn kẽ vì sao suy luận LLM bị nghẽn ở băng thông bộ nhớ (Memory Bandwidth) thay vì xung nhịp. Nắm vững phép nhân ma trận GEMM, lượng tử hóa FP16/INT8/INT4/FP8 và cách vLLM PagedAttention triệt tiêu phân mảnh VRAM.
                </p>
              </div>

              <div className="pt-2 border-t border-[#012624]/60 flex items-center justify-between text-[12px] font-mono">
                <Link href="/lab" className="text-[#edfffe] hover:text-[#cbfffc] uppercase flex items-center space-x-1">
                  <span>Khám phá 3D Compute Die</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#bbc7c6]">MODULE 01</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#003734] rounded-[16px] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:bg-[#00423f] transition-all duration-200 group">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-[6px] bg-[#012624] text-[#cbfffc]">
                  <Workflow className="w-6 h-6" />
                </div>
                <Link
                  href="/roadmap"
                  className="w-8 h-8 rounded-[6px] bg-[#012624]/70 hover:bg-[#012624] text-[#ffffff] flex items-center justify-center transition-colors"
                  aria-label="Open Multi-Agent Roadmap"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#edfffe] uppercase">
                  PILLAR 02 // 15% THỜI LƯỢNG
                </span>
                <h3 className="text-[26px] sm:text-[30px] font-medium uppercase tracking-tight text-[#ffffff] leading-tight">
                  AI ORCHESTRATION & AUTONOMOUS AGENTS
                </h3>
                <p className="text-[15px] text-[#bbc7c6] leading-relaxed">
                  Vượt xa việc gọi API đơn lẻ. Xây dựng hệ thống Multi-Agent có thể tự lập kế hoạch (Planning), gọi công cụ động (Dynamic Tool Calling), tự phản biện (Self-Reflection) và điều phối phức tạp qua LangGraph với Human-in-the-loop.
                </p>
              </div>

              <div className="pt-2 border-t border-[#012624]/60 flex items-center justify-between text-[12px] font-mono">
                <Link href="/roadmap" className="text-[#edfffe] hover:text-[#cbfffc] uppercase flex items-center space-x-1">
                  <span>Xem Module Agents (Tháng 5)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#bbc7c6]">MODULE 05</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#003734] rounded-[16px] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:bg-[#00423f] transition-all duration-200 group">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-[6px] bg-[#012624] text-[#cbfffc]">
                  <Database className="w-6 h-6" />
                </div>
                <Link
                  href="/roadmap"
                  className="w-8 h-8 rounded-[6px] bg-[#012624]/70 hover:bg-[#012624] text-[#ffffff] flex items-center justify-center transition-colors"
                  aria-label="Open RAG Roadmap"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#edfffe] uppercase">
                  PILLAR 03 // 50% THỜI LƯỢNG
                </span>
                <h3 className="text-[26px] sm:text-[30px] font-medium uppercase tracking-tight text-[#ffffff] leading-tight">
                  PRODUCTION RAG & EMBEDDINGS ARCHITECTURE
                </h3>
                <p className="text-[15px] text-[#bbc7c6] leading-relaxed">
                  Nửa thời lượng toàn khóa tập trung vào RAG doanh nghiệp: Semantic Chunking, Vector DBs (Qdrant, Milvus), Hybrid Search (Dense + Sparse BM25), Cross-Encoder Re-ranking và GraphRAG triệt tiêu hoàn toàn ảo giác (Hallucination).
                </p>
              </div>

              <div className="pt-2 border-t border-[#012624]/60 flex items-center justify-between text-[12px] font-mono">
                <Link href="/roadmap" className="text-[#edfffe] hover:text-[#cbfffc] uppercase flex items-center space-x-1">
                  <span>Xem Chi tiết Module RAG (Tháng 3)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#bbc7c6]">MODULE 03</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#003734] rounded-[16px] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:bg-[#00423f] transition-all duration-200 group">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-[6px] bg-[#012624] text-[#cbfffc]">
                  <Boxes className="w-6 h-6" />
                </div>
                <Link
                  href="/roadmap"
                  className="w-8 h-8 rounded-[6px] bg-[#012624]/70 hover:bg-[#012624] text-[#ffffff] flex items-center justify-center transition-colors"
                  aria-label="Open Serving Roadmap"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#edfffe] uppercase">
                  PILLAR 04 // 10% THỜI LƯỢNG
                </span>
                <h3 className="text-[26px] sm:text-[30px] font-medium uppercase tracking-tight text-[#ffffff] leading-tight">
                  CAPSTONE PLATFORM & PRODUCTION SERVING
                </h3>
                <p className="text-[15px] text-[#bbc7c6] leading-relaxed">
                  Đưa mô hình ra phục vụ thực tế: vLLM, Triton Inference Server, Continuous Batching, PagedAttention, Docker/K8s và hệ thống giám sát Observability (Langfuse) đạt chuẩn SLA chịu tải 100+ req/sec với p99 latency thấp.
                </p>
              </div>

              <div className="pt-2 border-t border-[#012624]/60 flex items-center justify-between text-[12px] font-mono">
                <Link href="/roadmap" className="text-[#edfffe] hover:text-[#cbfffc] uppercase flex items-center space-x-1">
                  <span>Xem Chi tiết Capstone (Tháng 6)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#bbc7c6]">MODULE 06</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recessed Well Callout Card: 3D Compute Die Silicon Lab (#011d1c Liquid Deep) */}
      <section className="relative w-full py-20 px-6 sm:px-12 bg-[#011d1c] border-b border-[#003734]/80">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#003734] rounded-[16px] p-8 sm:p-12 relative overflow-hidden">
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#012624]">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-[6px] bg-[#012624] text-[#cbfffc] text-[10px] font-mono tracking-widest uppercase font-medium">
                  KHÔNG GIAN HỌC TẬP TƯƠNG TÁC
                </span>
                <span className="text-[12px] font-mono text-[#edfffe] uppercase">
                  DIE-01 // 16 TENSOR CORES & HBM3 VRAM WORKSPACE
                </span>
              </div>
              <Link
                href="/lab"
                className="inline-flex items-center space-x-1.5 text-[12px] font-mono uppercase tracking-wider text-[#cbfffc] hover:underline"
              >
                <span>Mở toàn màn hình Phòng Lab 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Content Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-[11px] font-mono text-[#cbfffc] uppercase tracking-widest flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#cbfffc]" />
                  <span>BÀI HỌC KHỞI ĐẦU // DAY 01</span>
                </div>

                <h2 className="text-[28px] sm:text-[36px] font-medium uppercase tracking-tight text-[#ffffff] leading-tight">
                  GIẢI PHẪU VI MẠCH TÍNH TOÁN AI: 16 TENSOR CORES & HBM3 VRAM
                </h2>

                <p className="text-[15px] text-[#bbc7c6] leading-relaxed">
                  Trước khi viết code huấn luyện hoặc prompt mô hình, một AI Software Engineer cần hiểu phần cứng thực thi
                  các phép nhân ma trận (GEMM) ra sao. Trong phòng thí nghiệm 3D, bạn sẽ tương tác xoay 360°, tách lớp
                  các tầng bán dẫn (Explode view), và mô phỏng xung nhịp lượng tử hóa (FP16, INT8, INT4).
                </p>

                {/* Micro specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-3.5 rounded-[6px] bg-[#012624] border border-[#003734]">
                    <div className="text-[#bbc7c6] text-[9px] uppercase">LÕI MA TRẬN</div>
                    <div className="text-[#ffffff] font-medium text-[12px] mt-0.5">16 CLUSTERS (4x4)</div>
                  </div>
                  <div className="p-3.5 rounded-[6px] bg-[#012624] border border-[#003734]">
                    <div className="text-[#bbc7c6] text-[9px] uppercase">BĂNG THÔNG HBM3</div>
                    <div className="text-[#ffffff] font-medium text-[12px] mt-0.5">4x @ 1.2 TB/S</div>
                  </div>
                  <div className="p-3.5 rounded-[6px] bg-[#012624] border border-[#003734] col-span-2 sm:col-span-1">
                    <div className="text-[#bbc7c6] text-[9px] uppercase">LƯỢNG TỬ HÓA</div>
                    <div className="text-[#cbfffc] font-medium text-[12px] mt-0.5">FP16 / INT8 / INT4</div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/lab"
                    className="inline-flex items-center space-x-2.5 h-[48px] px-7 rounded-[6px] bg-gradient-to-r from-[#cbfffc] via-[#edfffe] to-[#fad1ff] hover:opacity-95 text-[#012624] text-[12px] font-medium tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 shadow-lg"
                  >
                    <BookOpen className="w-4 h-4 text-[#012624] shrink-0" />
                    <span>VÀO PHÒNG LAB & BẮT ĐẦU BÀI HỌC DAY 01</span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#012624]" />
                  </Link>
                </div>
              </div>

              {/* Graphic Representation Teaser */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <Link
                  href="/lab"
                  className="w-full aspect-[4/3] rounded-[12px] bg-[#012624] border border-[#003734] hover:border-[#cbfffc]/50 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 cursor-pointer group/box"
                >
                  <div className="w-16 h-16 rounded-full bg-[#003734] border border-[#00827c] flex items-center justify-center text-[#cbfffc] mb-4 group-hover/box:scale-110 transition-transform">
                    <Cpu className="w-8 h-8" />
                  </div>

                  <span className="text-[14px] font-medium uppercase tracking-wider text-[#ffffff]">
                    MÔ HÌNH 3D COMPUTE DIE
                  </span>
                  <span className="text-[12px] text-[#bbc7c6] mt-1 font-mono">
                    Nhấn để tương tác vi mạch bán dẫn 3D với 16 cụm Tensor Core
                  </span>

                  <span className="mt-4 px-4 py-2 rounded-[6px] bg-[#003734] text-[#edfffe] text-[11px] font-mono tracking-widest uppercase border border-[#004a46] flex items-center space-x-1.5 group-hover/box:bg-[#004a46]">
                    <span>MỞ GIAO DIỆN PHÒNG THÍ NGHIỆM</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#cbfffc]" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Timeline Snapshot Across 6 Months */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-[#012624] border-b border-[#003734]/80">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#003734] pb-6">
            <div>
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#edfffe] block mb-1">
                26-WEEK STRUCTURE // LỘ TRÌNH 6 THÁNG
              </span>
              <h2 className="text-[32px] sm:text-[40px] font-medium uppercase tracking-[-0.04em] text-[#ffffff]">
                TỪ ZERO ĐẾN PRODUCTION AI PLATFORM
              </h2>
            </div>
            <Link
              href="/roadmap"
              className="text-[12px] font-mono uppercase tracking-wider text-[#edfffe] hover:text-[#cbfffc] transition-colors flex items-center space-x-1.5"
            >
              <span>XEM BẢN ĐỒ CHI TIẾT 26 TUẦN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6 Month Cards on #003734 */}
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
                className="bg-[#003734] rounded-[16px] p-7 space-y-4 flex flex-col justify-between hover:bg-[#00423f] transition-colors border border-transparent hover:border-[#00827c]/40"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] border-b border-[#012624] pb-2 mb-3">
                    <span className="text-[#cbfffc] font-medium">{phase.month}</span>
                    <span className="text-[#bbc7c6]">{phase.weeks}</span>
                  </div>
                  <h4 className="text-[17px] font-medium uppercase text-[#ffffff] mb-2 leading-snug">
                    {phase.title}
                  </h4>
                  <p className="text-[13px] text-[#bbc7c6] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#012624] text-[11px] font-mono text-[#fde9ff]">
                  ★ {phase.highlight}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/roadmap"
              className="inline-flex items-center space-x-2 h-[48px] px-8 rounded-[6px] bg-[#003734] hover:bg-[#004a46] text-[#ffffff] text-[12px] font-medium tracking-widest uppercase border border-[#004a46] transition-colors"
            >
              <span>XEM ĐẦY ĐỦ 26 TUẦN & 10 CHUẨN NĂNG LỰC</span>
              <ArrowRight className="w-4 h-4 text-[#cbfffc]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Daily AI Radar Showcase (#011d1c Liquid Deep) */}
      <section className="relative w-full py-20 px-6 sm:px-12 bg-[#011d1c] border-b border-[#003734]/80">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#003734] rounded-[16px] p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#012624] pb-4">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#cbfffc] animate-pulse" />
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#edfffe] font-medium">
                  DAILY AI RADAR // BẢN TIN TỰ ĐỘNG HÀNG NGÀY
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsRadarModalOpen(true)}
                  className="text-[11px] font-mono uppercase tracking-wider text-[#cbfffc] hover:underline flex items-center space-x-1"
                >
                  <span>Mở cửa sổ chi tiết Radar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/radar"
                  className="text-[11px] font-mono uppercase tracking-wider text-[#bbc7c6] hover:text-[#ffffff] transition-colors flex items-center space-x-1"
                >
                  <span>Trang tạp chí Radar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-[11px] font-mono text-[#bbc7c6] uppercase">
                  TRENDING REPO HÔM NAY: <strong className="text-[#ffffff]">vllm-project / vllm (35.2k★)</strong>
                </div>

                <blockquote className="border-l-2 border-[#cbfffc] pl-4 italic text-[16px] sm:text-[18px] text-[#ffffff] leading-relaxed">
                  "Băng thông bộ nhớ (Memory Bandwidth) là nút thắt lớn nhất khi chạy suy luận LLM, chứ không phải xung nhịp tính toán.
                  Mọi tối ưu luôn bắt đầu từ việc giải quyết bài toán Memory-bound."
                </blockquote>

                <p className="text-[14px] text-[#bbc7c6] leading-relaxed">
                  Thư viện tiêu chuẩn công nghiệp phục vụ inference và serving LLM với thông lượng cao nhất hiện nay, nhờ cơ chế
                  quản lý bộ nhớ phân trang PagedAttention và nhân FP8 GEMM tối ưu hóa trực tiếp cho phần cứng.
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#012624] border border-[#003734] rounded-[10px] p-5 space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-[#bbc7c6] uppercase">
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#cbfffc]" />
                    <span>LỆNH CHẠY THỬ NHANH</span>
                  </span>
                  <button
                    onClick={handleCopyCmd}
                    className="text-[#cbfffc] hover:underline uppercase"
                  >
                    {copiedCmd ? "ĐÃ SAO CHÉP ✓" : "SAO CHÉP LỆNH"}
                  </button>
                </div>

                <pre className="p-3 bg-[#011d1c] rounded-[6px] text-[11px] text-[#edfffe] overflow-x-auto leading-relaxed border border-[#003734]">
                  <code>git clone https://github.com/vllm-project/vllm
pip install vllm
vllm serve meta-llama/Llama-3.2-3B-Instruct --port 8000</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom Final Call to Action */}
      <section className="relative w-full py-24 px-6 sm:px-12 text-center bg-[#012624] overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#edfffe]">
            READY TO LEVEL UP // BẮT ĐẦU NGAY BÂY GIỜ
          </span>

          <h2 className="text-[34px] sm:text-[48px] font-medium uppercase tracking-[-0.04em] text-[#ffffff] leading-tight">
            SẴN SÀNG XÂY DỰNG TƯ DUY <br />
            KỸ SƯ AI THỰC THỤ?
          </h2>

          <p className="text-[15px] sm:text-[18px] text-[#bbc7c6] leading-relaxed">
            Bước vào không gian phòng thí nghiệm 3D để khám phá bài học đầu tiên về giải phẫu phần cứng và lượng tử hóa ma trận.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/learn"
              className="h-[50px] px-8 rounded-[6px] bg-gradient-to-r from-[#cbfffc] via-[#edfffe] to-[#fad1ff] hover:opacity-95 text-[#012624] text-[13px] font-medium tracking-[0.08em] uppercase transition-all shadow-[0_0_24px_rgba(203,255,252,0.3)] flex items-center space-x-2.5 whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#012624] shrink-0" />
              <span>BẮT ĐẦU HỌC (CHỌN BÀI HỌC)</span>
              <ArrowRight className="w-4 h-4 ml-1 shrink-0 text-[#012624]" />
            </Link>

            <Link
              href="/roadmap"
              className="h-[50px] px-7 rounded-[6px] border border-[#004a46] bg-[#003734] hover:bg-[#004a46] text-[#ffffff] text-[13px] font-medium tracking-widest uppercase transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <span>XEM TOÀN BỘ GIÁO TRÌNH</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Recessed Well Footer (Auros Liquid Deep #011d1c with 120px feel) */}
      <footer className="w-full border-t border-[#003734] px-6 sm:px-12 py-16 bg-[#011d1c] text-[12px] font-mono text-[#bbc7c6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-3">
            <span className="text-[#ffffff] font-medium">AUROS AI LAB</span>
            <span className="text-[#00827c]">//</span>
            <span>26-WEEK AI SOFTWARE ENGINEER CURRICULUM</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-[#ffffff] transition-colors">
              TRANG CHỦ
            </Link>
            <Link href="/learn" className="hover:text-[#cbfffc] transition-colors text-[#edfffe]">
              BẮT ĐẦU HỌC
            </Link>
            <Link href="/lab" className="hover:text-[#ffffff] transition-colors">
              PHÒNG LAB 3D
            </Link>
            <Link href="/roadmap" className="hover:text-[#ffffff] transition-colors">
              LỘ TRÌNH 26 TUẦN
            </Link>
            <Link href="/radar" className="hover:text-[#ffffff] transition-colors">
              DAILY RADAR
            </Link>
            <a
              href="https://github.com/HuongDS/ai_learning"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ffffff] transition-colors flex items-center space-x-1"
            >
              <span>GITHUB</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[11px] tracking-wider uppercase text-[#bbc7c6]">
            AUROS ABYSSAL THEME // DEPTH-OF-WATER
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
