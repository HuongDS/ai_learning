"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Terminal,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  ExternalLink,
  Radio,
  Play,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import PythonWasmRunner, { DEFAULT_PRESETS, CodePreset } from "@/components/PythonWasmRunner";
import DailyRadarModal from "@/components/DailyRadarModal";

const CHALLENGE_SNIPPETS = [
  {
    title: "1. Thử thách Ma trận NumPy (@ Operator)",
    desc: "Khởi tạo 2 ma trận ngẫu nhiên (3x4) và (4x2) rồi thực hiện phép nhân ma trận GEMM.",
    code: `# Thử thách: Nhân ma trận bằng toán tử @ trong NumPy
import numpy as np

# A: 3 hàng, 4 cột | B: 4 hàng, 2 cột
A = np.random.randint(1, 10, size=(3, 4))
B = np.random.randint(1, 10, size=(4, 2))

# C = A @ B -> Kích thước (3, 2)
C = A @ B

print("Ma trận A (3x4):\\n", A)
print("\\nMa trận B (4x2):\\n", B)
print("\\nKết quả C = A @ B (3x2):\\n", C)
`,
  },
  {
    title: "2. Thử thách Lọc List Comprehension & Slicing",
    desc: "Tạo danh sách 20 số nguyên và lọc ra các số chẵn bình phương bằng cú pháp Pythonic.",
    code: `# Thử thách: List Comprehension & Slicing
numbers = list(range(1, 21))

# Lọc các số chẵn và tính bình phương
even_squares = [x**2 for x in numbers if x % 2 == 0]

print("Dãy số ban đầu:", numbers)
print("Bình phương các số chẵn:", even_squares)
print("5 phần tử lớn nhất đảo ngược:", even_squares[-5:][::-1])
`,
  },
  {
    title: "3. Thử thách Tối ưu Đệ quy Fibonacci với @lru_cache",
    desc: "So sánh thời gian tính số Fibonacci thứ 35 có và không có bộ nhớ đệm (Memoization).",
    code: `# Thử thách: Đệ quy & Tối ưu hóa hiệu năng bằng functools
import time
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memoized(n: int) -> int:
    if n <= 1:
        return n
    return fib_memoized(n - 1) + fib_memoized(n - 2)

t0 = time.perf_counter()
result = fib_memoized(35)
t1 = time.perf_counter()

print(f"Fibonacci(35) = {result}")
print(f"Thời gian tính toán với @lru_cache: {(t1 - t0)*1000:.4f} ms (Siêu tốc độ!)")
`,
  },
];

export default function PythonPlaygroundPage() {
  const { theme, toggleTheme } = useTheme();
  const [isRadarModalOpen, setIsRadarModalOpen] = useState(false);
  const [customKey, setCustomKey] = useState<number>(0);
  const [selectedChallengeCode, setSelectedChallengeCode] = useState<string | undefined>(undefined);

  const handleLoadChallenge = (snippet: string) => {
    setSelectedChallengeCode(snippet);
    setCustomKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-main)] px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between transition-colors">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-2.5 rounded-[6px] border border-[var(--border-main)] hover:border-[var(--text-primary)] shrink-0"
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

          <span className="hidden xl:inline-block text-[10px] uppercase tracking-widest text-[var(--accent-aqua)] border-l border-[var(--border-main)] pl-3 font-mono">
            PYTHON WASM
          </span>
        </div>

        {/* Center Nav Links */}
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
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap"
          >
            GIẢI MÃ 3D
          </Link>
          <Link
            href="/playground"
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] text-[var(--accent-aqua)] font-medium bg-[var(--surface-hover)] transition-all whitespace-nowrap"
          >
            <span className="hidden xl:inline">PLAYGROUND PYTHON</span>
            <span className="xl:hidden">PLAYGROUND</span>
          </Link>
          <button
            onClick={() => setIsRadarModalOpen(true)}
            className="px-2.5 xl:px-3 py-1.5 rounded-[6px] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap cursor-pointer uppercase font-mono"
          >
            <span className="hidden xl:inline">DAILY RADAR</span>
            <span className="xl:hidden">RADAR</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-[6px] border border-[var(--border-main)] bg-[var(--badge-bg)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] transition-all cursor-pointer shrink-0"
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
            className="h-8 sm:h-9 px-3 sm:px-4 rounded-[6px] hover:opacity-95 text-[11px] sm:text-[12px] font-medium tracking-[0.06em] uppercase transition-all shadow-[0_0_18px_rgba(0,180,170,0.25)] flex items-center space-x-1.5 whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">BẮT ĐẦU HỌC</span>
            <span className="sm:hidden">HỌC</span>
          </Link>
        </div>
      </header>

      {/* 2. Hero Headline */}
      <section className="relative w-full pt-12 pb-8 sm:pt-16 sm:pb-10 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-main)] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[600px] h-[260px] bg-[var(--accent-bioluminescent)]/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-[6px] bg-[var(--badge-bg)] border border-[var(--badge-border)] shadow-sm">
            <Cpu className="w-4 h-4 text-[var(--accent-aqua)] animate-pulse" />
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--text-mist)] font-mono">
              CLIENT-SIDE EXECUTION // CPYTHON 3.12 WEBASSEMBLY
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[42px] md:text-[50px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.1]">
            PHÒNG THÍ NGHIỆM THỰC THI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-aqua)] to-[var(--accent-phosphor)]">
              CODE PYTHON TRỰC TIẾP TRÊN WEB
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[14px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Chạy mã nguồn Python 3.12 và thư viện tính toán <strong>NumPy</strong> trực tiếp trên CPU của bạn
            thông qua công nghệ WebAssembly (Wasm). <strong>Không cần cài đặt Python, không cần backend server, không gửi dữ liệu ra ngoài</strong>.
          </p>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-[11px] font-mono text-[var(--text-secondary)]">
            <div className="p-3 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] flex items-center space-x-2 text-left">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>SIMD In-Browser Execution</span>
            </div>
            <div className="p-3 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] flex items-center space-x-2 text-left">
              <FolderGit2 className="w-4 h-4 text-[var(--accent-aqua)] shrink-0" />
              <span>Virtual File System (JSON/CSV)</span>
            </div>
            <div className="p-3 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] flex items-center space-x-2 text-left">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Playground Interactive Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-8">
        {/* Quick Challenge Chips */}
        <div className="p-4 rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[var(--accent-aqua)]">
            <span className="flex items-center space-x-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NẠP NHANH BÀI TOÁN THỬ THÁCH (ONE-CLICK PRESETS):</span>
            </span>
            <span className="text-[10px] text-[var(--text-secondary)] hidden sm:inline">
              CHỌN ĐỂ TỰ ĐỘNG NẠP VÀO TRÌNH SOẠN THẢO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {CHALLENGE_SNIPPETS.map((c, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadChallenge(c.code)}
                className="p-3 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] text-left transition-all space-y-1 cursor-pointer group"
              >
                <div className="text-[11px] font-mono font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-aqua)] flex items-center justify-between">
                  <span>{c.title}</span>
                  <Play className="w-3 h-3 text-[var(--accent-aqua)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] font-sans line-clamp-2">
                  {c.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Core Wasm Interactive Runner */}
        <div className="w-full">
          <PythonWasmRunner
            key={customKey}
            initialCode={selectedChallengeCode}
            initialPresetId="week-01"
            title="AUROS PYTHON COMPILER // WEBASSEMBLY ENGINE"
            subtitle="Gõ hoặc chỉnh sửa mã nguồn bên trái và bấm 'CHẠY PYTHON (RUN)' hoặc phím tắt Ctrl + Enter để thực thi."
            showPresets={true}
          />
        </div>

        {/* Integration Callouts to 26-Week Curriculum */}
        <div className="p-6 rounded-[12px] bg-[var(--bg-recessed)]/50 border border-[var(--border-main)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-aqua)]">
              GIÁO TRÌNH 26 TUẦN // THỰC CHIẾN ĐẾN ĐÂU CODE ĐẾN ĐÓ
            </span>
            <h3 className="text-[18px] sm:text-[20px] font-medium uppercase text-[var(--text-primary)]">
              Áp Dụng Python WebAssembly Vào Từng Bài Học
            </h3>
            <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Trình thực thi này đã được nhúng trực tiếp vào các bài học Tuần 01, Tuần 02, Tuần 03 và Tuần 04.
              Học viên có thể trực tiếp thí nghiệm các thuật toán ma trận và mô hình học sâu mà không lo sợ xung đột môi trường trên máy tính.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              href="/learn"
              style={{ background: "var(--btn-aurora-bg)", color: "var(--btn-aurora-text)" }}
              className="h-[44px] px-5 rounded-[6px] hover:opacity-95 text-[11px] sm:text-[12px] font-medium tracking-wider uppercase transition-all shadow-[0_0_18px_rgba(0,180,170,0.25)] flex items-center space-x-1.5 whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>VÀO HUB BÀI HỌC</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="w-full border-t border-[var(--border-main)] px-4 sm:px-8 lg:px-12 py-8 bg-[var(--bg-canvas)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--text-primary)] font-medium">AUROS AI LAB</span>
            <span>//</span>
            <span>PYTHON WEBASSEMBLY RUNTIME</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              TRANG CHỦ
            </Link>
            <Link href="/playground" className="text-[var(--accent-aqua)] hover:underline">
              PLAYGROUND PYTHON
            </Link>
            <Link href="/anatomy-3d" className="hover:text-[var(--text-primary)] transition-colors">
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
            DUAL THEME // LIGHT &amp; DARKROOM
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
