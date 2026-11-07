"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Cpu,
  Radio,
  Layers,
  Boxes,
  Database,
  Sparkles,
  Workflow,
  Sun,
  Moon,
  Target,
  Terminal,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Code2,
  Atom,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import BioluminescentSphere from "@/components/BioluminescentSphere";
import ComputeDieScene from "@/components/ComputeDieScene";
import Radar3DScene, { DEFAULT_RADAR_TARGETS, RadarTarget } from "@/components/Radar3DScene";
import DailyRadarModal from "@/components/DailyRadarModal";

export default function Anatomy3DPage() {
  const { theme, toggleTheme } = useTheme();
  const [isRadarModalOpen, setIsRadarModalOpen] = useState(false);

  // Lab die interactive controls
  const [isExploded, setIsExploded] = useState(false);
  const [quantMode, setQuantMode] = useState<"FP16" | "INT8" | "INT4">("FP16");

  // Radar interactive controls
  const [selectedRadarTarget, setSelectedRadarTarget] = useState<RadarTarget>(
    DEFAULT_RADAR_TARGETS[0]
  );

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Sticky Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-main)] px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center justify-between transition-colors">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-3 rounded-[6px] border border-[var(--border-main)] hover:border-[var(--text-primary)] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">TRANG CHỦ</span>
          </Link>

          <Link
            href="/"
            className="text-[13px] sm:text-[15px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--text-primary)] flex items-center space-x-1.5 whitespace-nowrap"
          >
            <span className="font-semibold">AUROS</span>
            <span className="text-[var(--accent-aqua)] font-light">//</span>
            <span className="text-[var(--text-secondary)] text-[11px] sm:text-[13px]">AI LAB</span>
          </Link>

          <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-[var(--text-mist)] border-l border-[var(--border-main)] pl-3 font-mono">
            3D ARCHITECTURE COMPENDIUM
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center space-x-2 text-[12px] font-mono tracking-[0.12em] uppercase text-[var(--text-secondary)]">
          <Link
            href="/roadmap"
            className="px-3 py-2 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap"
          >
            LỘ TRÌNH 26 TUẦN
          </Link>
          <Link
            href="/lab"
            className="px-3 py-2 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap"
          >
            PHÒNG LAB 3D
          </Link>
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="px-3 py-2 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap cursor-pointer uppercase font-mono"
          >
            DAILY RADAR
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="hidden sm:flex items-center px-3 py-1.5 rounded-[6px] border border-[var(--border-main)] bg-[var(--badge-bg)] hover:bg-[var(--surface-hover)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] font-mono tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap"
          >
            <Radio className="w-3.5 h-3.5 text-[var(--accent-aqua)] mr-1.5 animate-pulse" />
            <span>RADAR</span>
          </button>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-[6px] border border-[var(--border-main)] bg-[var(--badge-bg)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] transition-all cursor-pointer"
            title="Chuyển chế độ Sáng / Tối"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-mist)]" />
            )}
          </button>

          <Link
            href="/learn"
            style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
            className="h-8 sm:h-9 px-3 sm:px-4 rounded-[6px] hover:opacity-95 text-[11px] sm:text-[12px] font-medium tracking-[0.08em] uppercase transition-all shadow-[0_0_18px_rgba(0,180,170,0.25)] flex items-center space-x-1.5 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>BẮT ĐẦU HỌC</span>
          </Link>
        </div>
      </header>

      {/* 2. Hero Section: Architectural Statement */}
      <section className="relative w-full pt-14 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-main)] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] bg-[var(--accent-bioluminescent)]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)] shadow-sm">
            <Atom className="w-4 h-4 text-[var(--accent-aqua)] animate-spin-slow" />
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--text-mist)] font-mono">
              ZERO DECORATIVE CLUTTER // GIẢI MÃ KIẾN TRÚC 3D
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[46px] md:text-[58px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.1]">
            Ý NGHĨA KỸ THUẬT CỦA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-aqua)] to-[var(--accent-phosphor)]">
              TẤT CẢ KHỐI 3D TRÊN WEB
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-[15px] sm:text-[17px] text-[var(--text-secondary)] leading-relaxed">
            Tại Auros AI Lab, không có bất kỳ mô hình đồ họa nào được tạo ra chỉ để trang trí đơn thuần.
            Mỗi thực thể 3D đều là một <strong>giáo cụ trực quan toán học & kiến trúc máy tính thực tế</strong>,
            đại diện cho cấu trúc không gian ẩn của LLM, giải phẫu phần cứng bán dẫn hay cơ chế viễn trắc hệ sinh thái mở.
          </p>

          {/* Quick Jump Anchors */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono uppercase tracking-wider">
            <a
              href="#orb-latent-space"
              className="px-3.5 py-2 rounded-[6px] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all flex items-center space-x-2"
            >
              <span className="text-[var(--accent-aqua)]">01.</span>
              <span>Core Data Orb</span>
            </a>
            <a
              href="#silicon-die-anatomy"
              className="px-3.5 py-2 rounded-[6px] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all flex items-center space-x-2"
            >
              <span className="text-[var(--accent-aqua)]">02.</span>
              <span>Compute Die & HBM3e</span>
            </a>
            <a
              href="#telemetry-radar"
              className="px-3.5 py-2 rounded-[6px] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all flex items-center space-x-2"
            >
              <span className="text-[var(--accent-aqua)]">03.</span>
              <span>Spatial Radar Telemetry</span>
            </a>
            <a
              href="#roadmap-expressway"
              className="px-3.5 py-2 rounded-[6px] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all flex items-center space-x-2"
            >
              <span className="text-[var(--accent-aqua)]">04.</span>
              <span>Milestone Expressway</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Compendium Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-20 sm:space-y-28">
        {/* =========================================================================
            SECTION 01: CORE DATA ORB // 2,200 NODES (LATENT SPACE & EMBEDDINGS)
           ========================================================================= */}
        <section id="orb-latent-space" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent-aqua)]">
                <span>CHƯƠNG 01 // KHÔNG GIAN ẨN ĐA CHIỀU (LATENT SPACE)</span>
              </div>
              <h2 className="text-[26px] sm:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)] mt-1">
                01. QUẢ CẦU PHÁT QUANG (CORE DATA ORB)
              </h2>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-mist)]">
              HERO SECTION // 2,200 BIOLUMINESCENT NODES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive 3D Viewport */}
            <div className="lg:col-span-5 relative flex items-center justify-center bg-[var(--surface-card)] rounded-[12px] border border-[var(--border-main)] p-4 overflow-hidden shadow-inner min-h-[380px]">
              <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center">
                <BioluminescentSphere theme={theme} className="w-full h-full" />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-[6px] bg-[var(--bg-recessed)]/90 border border-[var(--border-main)] text-[9px] font-mono tracking-wider flex items-center justify-between backdrop-blur-md">
                  <span className="text-[var(--accent-aqua)] uppercase">L2 HYPERSPHERE DISTRIBUTION</span>
                  <span className="text-[var(--text-secondary)]">2,200 NODES</span>
                </div>
              </div>
            </div>

            {/* Engineering Breakdown Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-3">
                <h3 className="text-[18px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                  Bản chất Toán học & Kiến trúc Mô hình
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  Trong các mô hình ngôn ngữ lớn (LLM), sau khi các từ ngữ được ánh xạ thành vector nhúng
                  (Word/Token Embeddings) và chuẩn hóa chiều dài (L2 Normalization), toàn bộ tri thức của mô hình
                  sẽ phân bổ trên một <strong>siêu mặt cầu đa chiều (Hypersphere)</strong>. Khoảng cách góc giữa
                  hai điểm biểu diễn độ tương đồng ngữ nghĩa (Cosine Similarity).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center space-x-1.5">
                    <span>•</span>
                    <span>Phân bố Fibonacci Golden Spiral</span>
                  </span>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    2,200 điểm sáng được tính toán vị trí theo thuật toán xoắn ốc vàng Fibonacci trên mặt cầu,
                    đảm bảo mật độ đồng nhất tuyệt đối không bị co cụm cực bắc/nam, mô phỏng không gian vector cân bằng.
                  </p>
                </div>

                <div className="p-4 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center space-x-1.5">
                    <span>•</span>
                    <span>Vòng Quỹ Đạo Autoregressive</span>
                  </span>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Vòng đai hạt nghiêng quay tuần hoàn mô phỏng chu trình sinh token tự hồi quy (Autoregressive Loop):
                    token vừa sinh ra được đưa ngược lại vào đầu vào làm ngữ cảnh cho bước suy luận tiếp theo.
                  </p>
                </div>

                <div className="p-4 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center space-x-1.5">
                    <span>•</span>
                    <span>Tần số Kích hoạt Nơ-ron</span>
                  </span>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Màu sắc chuyển động (Teal, Aqua, Lavender, Phosphor White) phản ánh trạng thái kích hoạt
                    của các cụm nơ-ron chuyên biệt khi tiếp nhận prompt tương ứng.
                  </p>
                </div>

                <div className="p-4 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center space-x-1.5">
                    <span>•</span>
                    <span>Tương tác Softmax Perturbation</span>
                  </span>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Khi rê chuột, bề mặt quả cầu tạo sóng đàn hồi mô phỏng sự dịch chuyển trọng số chú ý
                    (Attention Bias) khi có thêm thông tin ngữ cảnh mới đưa vào mạng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: 3D COMPUTE DIE & HBM3E MEMORY ARCHITECTURE (HARDWARE LAB)
           ========================================================================= */}
        <section id="silicon-die-anatomy" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent-aqua)]">
                <span>CHƯƠNG 02 // GIẢI PHẪU VI MẠCH BÁN DẪN 3D</span>
              </div>
              <h2 className="text-[26px] sm:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)] mt-1">
                02. PHIẾN SILICON DIE-01 & BỘ NHỚ HBM3E
              </h2>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-mist)]">
              PHÒNG THÍ NGHIỆM 3D // 16 TENSOR CORES & COWOS PACKAGING
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive 3D Viewport with Live Explode & Quant Controls */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center bg-[var(--surface-card)] rounded-[12px] border border-[var(--border-main)] p-4 sm:p-6 overflow-hidden shadow-inner">
              <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--border-main)]/60 text-[10px] font-mono uppercase tracking-wider">
                <span className="text-[var(--accent-aqua)]">LIVE HARDWARE SIMULATOR</span>
                <span>CHẾ ĐỘ: {quantMode}</span>
              </div>

              <div className="relative w-full aspect-square max-w-[380px] my-4 flex items-center justify-center">
                <ComputeDieScene isExploded={isExploded} quantMode={quantMode} />
              </div>

              {/* Interactive Controls Bar */}
              <div className="w-full pt-3 border-t border-[var(--border-main)]/60 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className="h-8 px-3 rounded-[4px] bg-[var(--badge-bg)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  {isExploded ? "ĐÓNG LỚP LINH KIỆN" : "TÁCH LỚP 3D (EXPLODE)"}
                </button>

                <div className="flex items-center space-x-1.5 text-[10px] font-mono">
                  <span className="text-[var(--text-secondary)] mr-1">LƯỢNG TỬ:</span>
                  {(["FP16", "INT8", "INT4"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setQuantMode(mode)}
                      className={`px-2 py-1 rounded-[3px] transition-all cursor-pointer ${
                        quantMode === mode
                          ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                          : "bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Engineering Breakdown Text */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3">
                <h3 className="text-[18px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                  Giải Quyết Bức Tường Bộ Nhớ (Memory Wall)
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  Tại sao xung nhịp tính toán không phải nút thắt lớn nhất khi chạy LLM? Trong quá trình sinh từ,
                  mỗi token yêu cầu mô hình phải đọc toàn bộ hàng tỷ tham số trọng số từ bộ nhớ vào nhân tính toán.
                  Hệ thống trở thành <strong>Memory-Bound (nghẽn băng thông bộ nhớ)</strong> thay vì Compute-Bound.
                </p>
              </div>

              <div className="space-y-3 text-[13px] text-[var(--text-secondary)]">
                <div className="p-3.5 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center justify-between">
                    <span>1. Ma Trận 16 Tensor Cores (GEMM Engine)</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">4x4 MATRIX</span>
                  </div>
                  <p className="leading-relaxed">
                    Trái tim của phiến silicon trung tâm là 16 nhân tính toán chuyên dụng, thực hiện phép nhân
                    ma trận tích lũy $D = A \times B + C$ song song hàng chục nghìn phép tính mỗi chu kỳ xung nhịp.
                  </p>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center justify-between">
                    <span>2. 4 Khối HBM3e Xếp Chồng 3D (TSV Stacks)</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">3.35 TB/S BANDWIDTH</span>
                  </div>
                  <p className="leading-relaxed">
                    Mỗi khối HBM3e gồm 4 tầng DRAM xếp chồng thẳng đứng và kết nối bằng hàng vạn vi lỗ xuyên silicon
                    (Through-Silicon Vias - TSV), cung cấp băng thông cực đại giải quyết triệt để nút thắt cổ chai bộ nhớ.
                  </p>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold flex items-center justify-between">
                    <span>3. Đóng Gói 2.5D/3D Silicon Interposer</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">CHIPLET PACKAGING</span>
                  </div>
                  <p className="leading-relaxed">
                    Nhấn vào nút <strong>"TÁCH LỚP 3D"</strong> để nhìn thấy lớp đế trung gian Silicon Interposer
                    kết nối vi mạch tính toán với các khối bộ nhớ với khoảng cách micromet và điện trở siêu thấp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: 3D SPATIAL TELEMETRY & OPEN-SOURCE RADAR HUD
           ========================================================================= */}
        <section id="telemetry-radar" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent-aqua)]">
                <span>CHƯƠNG 03 // HỆ THỐNG TRINH SÁT VIỄN TRẮC MÃ NGUỒN MỞ</span>
              </div>
              <h2 className="text-[26px] sm:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)] mt-1">
                03. RA-ĐA KHÔNG GIAN 3D (AI OBSERVATORY)
              </h2>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-mist)]">
              DAILY AI RADAR // 14.24 GHZ SONAR SWEEP & TARGET RETICLE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive 3D Radar Scope */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center bg-[var(--surface-card)] rounded-[12px] border border-[var(--border-main)] p-4 sm:p-6 overflow-hidden shadow-inner">
              <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--border-main)]/60 text-[10px] font-mono uppercase tracking-wider">
                <span className="flex items-center space-x-1.5 text-[var(--accent-aqua)]">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>3D SPATIAL TELEMETRY SCOPE</span>
                </span>
                <span>MỤC TIÊU: {selectedRadarTarget.shortName}</span>
              </div>

              <div className="relative w-full aspect-square max-w-[340px] my-3 flex items-center justify-center">
                <Radar3DScene
                  targets={DEFAULT_RADAR_TARGETS}
                  selectedId={selectedRadarTarget.id}
                  onSelectTarget={(t) => setSelectedRadarTarget(t)}
                  theme={theme}
                  className="w-full h-full"
                />

                <div className="absolute top-2 left-2 pointer-events-none px-2.5 py-1 rounded-[4px] bg-[var(--bg-canvas)]/85 backdrop-blur-md border border-[var(--border-main)] text-[9px] font-mono uppercase tracking-wider text-[var(--text-mist)] flex items-center space-x-1.5">
                  <Target className="w-3 h-3 text-[var(--accent-aqua)]" />
                  <span>LOCKED: {selectedRadarTarget.shortName} ({selectedRadarTarget.stars} ★)</span>
                </div>
              </div>

              {/* Target Selector Buttons */}
              <div className="w-full pt-3 border-t border-[var(--border-main)]/60 flex flex-wrap items-center justify-center gap-1.5">
                {DEFAULT_RADAR_TARGETS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedRadarTarget(t)}
                    className={`px-2.5 py-1 rounded-[4px] text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      selectedRadarTarget.id === t.id
                        ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                        : "bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {t.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Engineering Breakdown Text */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3">
                <h3 className="text-[18px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                  Trinh Sát & Đo Độ Sẵn Sàng Sản Xuất (Production Readiness)
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  Thay vì một bảng tin RSS thụ động, Daily Radar sử dụng mô hình đài quan sát viễn trắc 3D.
                  Các công nghệ đột phá trên GitHub và ArXiv được định vị trên màn hình ra-đa theo góc tọa độ và khoảng cách thực chiến.
                </p>
              </div>

              <div className="space-y-3 text-[13px] text-[var(--text-secondary)]">
                <div className="p-3.5 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold block">
                    Bán Kính Khoảng Cách (Production Readiness Radius)
                  </span>
                  <p className="leading-relaxed">
                    Mục tiêu càng gần tâm đài quan sát (như <strong>vLLM</strong> bán kính 0.42) chứng minh công nghệ
                    đã đạt độ chín muồi cao, sẵn sàng phục vụ suy luận hàng triệu request trong hệ thống production thực tế.
                  </p>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold block">
                    Tia Quét Góc 3D (3D Sweeping Sector Beam - 14.24 GHz)
                  </span>
                  <p className="leading-relaxed">
                    Tia quét xanh xoay quanh tâm đại diện cho chu trình tự động quét các kho mã nguồn mở hàng ngày
                    lúc 00:00 UTC, phát hiện các bản release mới nhất và phân tích tự động bằng AI.
                  </p>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[var(--surface-hover)] border border-[var(--border-main)] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)] font-semibold block">
                    5 Trạm Mục Tiêu Chiến Lược
                  </span>
                  <p className="leading-relaxed">
                    Bao gồm các trụ cột then chốt: <strong>vLLM</strong> (PagedAttention serving), <strong>DeepSeek-V3</strong> (Kiến trúc MLA & MoE),
                    <strong>llama.cpp</strong> (Lượng tử hóa biên C/C++), <strong>Ollama</strong> (Runtime cục bộ), và <strong>MCP</strong> (Giao thức tác tử tự hành).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: 3D MILESTONE EXPRESSWAY & 6 ARCHITECTURAL STATIONS
           ========================================================================= */}
        <section id="roadmap-expressway" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--accent-aqua)]">
                <span>CHƯƠNG 04 // ĐẠI LỘ TIẾN TRÌNH & 6 TRẠM BIỂU TƯỢNG HÌNH HỌC</span>
              </div>
              <h2 className="text-[26px] sm:text-[36px] font-medium uppercase tracking-tight text-[var(--text-primary)] mt-1">
                04. ĐẠI LỘ DỮ LIỆU & 6 TRẠM KIẾN TRÚC 3D
              </h2>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-mist)]">
              LỘ TRÌNH 26 TUẦN // CATMULL-ROM DATA HIGHWAY & 6 MILESTONE CORES
            </span>
          </div>

          <div className="space-y-6">
            <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-4xl">
              Không dùng bảng danh sách chữ đơn điệu, lộ trình 26 tuần được thiết kế thành một <strong>Đại lộ Dữ liệu 3D (Catmull-Rom Data Highway)</strong>
              với các xung ánh sáng di chuyển liên tục, thể hiện dòng chảy chuyển hóa tư duy từ Software Engineer
              sang Kỹ sư AI qua 6 hình thái kiến trúc hình học đặc trưng:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Station 1 */}
              <div className="p-5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
                  <span>THÁNG 01 // CƠ BẢN</span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">01 / 06</span>
                </div>
                <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)]">
                  Khối Lập Phương Voxel (Voxel Grid)
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Đại diện cho <strong>Ma trận đa chiều (Tensors)</strong>, các chiều không gian bộ nhớ
                  (Batch $\times$ SeqLen $\times$ Dim) và kỹ thuật quản lý bộ nhớ VRAM trong PyTorch.
                </p>
              </div>

              {/* Station 2 */}
              <div className="p-5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
                  <span>THÁNG 02 // NỀN TẢNG</span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">02 / 06</span>
                </div>
                <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)]">
                  Vòng Xuyến Nơ-ron Lồng Nhau (Neural Torus)
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Đại diện cho <strong>Mạng nơ-ron sâu và lan truyền ngược (Backpropagation)</strong>,
                  tối ưu hóa bề mặt hàm mất mát (Loss Landscape) qua các bước nhảy Gradient Descent.
                </p>
              </div>

              {/* Station 3 */}
              <div className="p-5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
                  <span>THÁNG 03 // ĐỘT PHÁ</span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">03 / 06</span>
                </div>
                <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)]">
                  Khung Transformer & Nhân Bát Diện
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Đại diện cho <strong>Cơ chế Tự Chú Ý (Self-Attention & Multi-Head Attention)</strong>,
                  các phép chiếu ma trận $Q, K, V$ và liên kết tắt phần dư (Residual Connections).
                </p>
              </div>

              {/* Station 4 */}
              <div className="p-5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
                  <span>THÁNG 04 // ỨNG DỤNG</span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">04 / 06</span>
                </div>
                <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)]">
                  Chồng Đĩa Cơ Sở Dữ Liệu Vector (Discs Stack)
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Đại diện cho <strong>Cơ sở dữ liệu Vector & RAG nâng cao</strong>, cơ chế đánh chỉ mục
                  không gian cao chiều HNSW và tìm kiếm lai ngữ nghĩa kết hợp BM25.
                </p>
              </div>

              {/* Station 5 */}
              <div className="p-5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
                  <span>THÁNG 05 // NÂNG CAO</span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">05 / 06</span>
                </div>
                <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)]">
                  Hệ Hành Tinh Đa Tác Tử (Agentic Planetary)
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Gồm hạt nhân điều phối trung tâm và 3 vệ tinh quỹ đạo, đại diện cho <strong>Hệ thống Đa tác tử tự hành (Multi-Agent Swarms)</strong>,
                  vòng lặp phản xạ ReAct và giao thức giao tiếp liên tác tử.
                </p>
              </div>

              {/* Station 6 */}
              <div className="p-5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] transition-all space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
                  <span>THÁNG 06 // ĐỈNH CAO</span>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[var(--badge-bg)] border border-[var(--badge-border)]">06 / 06</span>
                </div>
                <h4 className="text-[16px] font-medium uppercase text-[var(--text-primary)]">
                  Tòa Tháp Nguyên Khối & Vương Miện (Capstone)
                </h4>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Đại diện cho <strong>Nền tảng AI Hoàn Chỉnh Cấp Sản Xuất (Enterprise Production Platform)</strong>:
                  Triển khai serving vLLM, kiểm soát độ trễ P99 và bảo mật hàng rào an toàn cho doanh nghiệp.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. Bottom Call to Action Banner */}
      <section className="w-full py-16 px-4 sm:px-8 lg:px-12 bg-[var(--bg-recessed)]/50 border-t border-[var(--border-main)] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-aqua)]">
            SẴN SÀNG BIẾN LÝ THUYẾT THÀNH THỰC CHIẾN?
          </span>

          <h2 className="text-[28px] sm:text-[38px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
            BẮT ĐẦU HÀNH TRÌNH CHUYỂN DỊCH NGAY HÔM NAY
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Mỗi khối 3D bạn vừa khám phá sẽ là một bài thực hành từng dòng code thực tế trong 26 tuần giáo trình.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/lesson/week-01"
              style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
              className="h-[48px] px-6 sm:px-7 rounded-[6px] hover:opacity-95 text-[12px] sm:text-[13px] font-medium tracking-[0.08em] uppercase transition-all shadow-[0_0_24px_rgba(0,180,170,0.3)] flex items-center justify-center space-x-2.5 cursor-pointer text-center"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>BẮT ĐẦU TUẦN 01: PYTHON CĂN BẢN</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>

            <Link
              href="/lab"
              style={{ background: "var(--btn-surface-bg)", color: "var(--btn-surface-text)" }}
              className="h-[48px] px-5 sm:px-6 rounded-[6px] hover:opacity-90 text-[12px] sm:text-[13px] font-medium tracking-[0.08em] uppercase border border-[var(--border-main)] transition-colors flex items-center justify-center space-x-2 shadow-sm text-center"
            >
              <Cpu className="w-4 h-4 text-[var(--accent-aqua)] shrink-0" />
              <span>TRẢI NGHIỆM PHÒNG LAB 3D</span>
            </Link>

            <Link
              href="/roadmap"
              className="h-[48px] px-5 rounded-[6px] bg-transparent hover:bg-[var(--surface-hover)] text-[var(--text-mist)] text-[12px] font-mono tracking-wider uppercase border border-[var(--border-main)] transition-colors flex items-center justify-center space-x-2 text-center"
            >
              <Compass className="w-4 h-4 text-[var(--accent-aqua)] shrink-0" />
              <span>XEM LỘ TRÌNH 26 TUẦN</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Editorial Footer */}
      <footer className="w-full border-t border-[var(--border-main)] px-4 sm:px-8 lg:px-12 py-8 bg-[var(--bg-canvas)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--text-primary)] font-medium">AUROS AI LAB</span>
            <span>//</span>
            <span>3D ARCHITECTURAL VISUAL COMPENDIUM</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              TRANG CHỦ
            </Link>
            <Link href="/anatomy-3d" className="text-[var(--accent-aqua)] hover:underline">
              GIẢI MÃ 3D
            </Link>
            <Link href="/lab" className="hover:text-[var(--text-primary)] transition-colors">
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
            DUAL THEME // LIGHT & DARKROOM
          </div>
        </div>
      </footer>

      {/* Daily AI Radar Modal Popup */}
      <DailyRadarModal
        isOpen={isRadarModalOpen}
        onClose={() => setIsRadarModalOpen(false)}
      />
    </div>
  );
}
