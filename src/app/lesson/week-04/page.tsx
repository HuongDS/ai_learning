"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Sun,
  Moon,
  ArrowRight,
  Code2,
  Check,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Database,
  BarChart3,
  Filter,
  FileSpreadsheet,
  Cpu,
  Award,
  Zap,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface DataRecord {
  id: number;
  prompt_id: string;
  model: string;
  tokens_per_sec: number | null; // Có thể bị thiếu (NaN)
  latency_ms: number | null;     // Có thể bị thiếu (NaN)
  status: "SUCCESS" | "FAILED" | "TIMEOUT";
  is_duplicate?: boolean;
}

const RAW_BENCHMARK_DATA: DataRecord[] = [
  { id: 1, prompt_id: "p_101", model: "Llama-3-8B", tokens_per_sec: 142.5, latency_ms: 18.2, status: "SUCCESS" },
  { id: 2, prompt_id: "p_102", model: "DeepSeek-V3", tokens_per_sec: 96.0, latency_ms: 28.4, status: "SUCCESS" },
  { id: 3, prompt_id: "p_103", model: "Llama-3-8B", tokens_per_sec: null, latency_ms: 19.1, status: "TIMEOUT" }, // Missing tokens
  { id: 4, prompt_id: "p_104", model: "Mistral-7B", tokens_per_sec: 135.2, latency_ms: null, status: "SUCCESS" }, // Missing latency
  { id: 5, prompt_id: "p_102", model: "DeepSeek-V3", tokens_per_sec: 96.0, latency_ms: 28.4, status: "SUCCESS", is_duplicate: true }, // Duplicate
  { id: 6, prompt_id: "p_105", model: "Mistral-7B", tokens_per_sec: 138.0, latency_ms: 21.0, status: "SUCCESS" },
  { id: 7, prompt_id: "p_106", model: "Llama-3-8B", tokens_per_sec: 145.8, latency_ms: 17.5, status: "SUCCESS" },
  { id: 8, prompt_id: "p_107", model: "DeepSeek-V3", tokens_per_sec: 94.2, latency_ms: 29.1, status: "SUCCESS" },
];

export default function WeekFourLessonPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Lab State
  const [activeTab, setActiveTab] = useState<"vectorization" | "cleaning" | "stats">("vectorization");

  // Vectorization Demo State
  const [arraySize, setArraySize] = useState<number>(100000);
  const [vectorSpeedup, setVectorSpeedup] = useState<{ pyTime: number; npTime: number; ratio: number } | null>(null);
  const [isComputingVector, setIsComputingVector] = useState(false);

  // Data Cleaning Interactive Pipeline State
  const [dropDuplicates, setDropDuplicates] = useState(false);
  const [imputeMissing, setImputeMissing] = useState(false); // Điền giá trị trung vị
  const [filterSuccessOnly, setFilterSuccessOnly] = useState(false);
  const [selectedModelFilter, setSelectedModelFilter] = useState<string>("ALL");

  // Quiz State (3 questions)
  const [quizAnswers, setQuizAnswers] = useState<{
    q1: number | null;
    q2: number | null;
    q3: number | null;
  }>({
    q1: null,
    q2: null,
    q3: null,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    try {
      const completed = JSON.parse(localStorage.getItem("oryzo_completed_lessons") || "[]");
      if (completed.includes(4)) {
        setIsUnlocked(true);
      }
    } catch {}

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute Vectorization Speedup Simulation
  const handleRunVectorBenchmark = () => {
    setIsComputingVector(true);
    setTimeout(() => {
      // Thời gian tính toán mô phỏng dựa trên kích thước mảng
      // Python loop ~ O(n) overhead trong thông dịch
      // NumPy C-vectorization sử dụng SIMD registers
      const pyTime = Number((arraySize * 0.00072).toFixed(2));
      const npTime = Number((arraySize * 0.000018 + 0.05).toFixed(2));
      const ratio = Number((pyTime / npTime).toFixed(1));
      setVectorSpeedup({ pyTime, npTime, ratio });
      setIsComputingVector(false);
    }, 250);
  };

  // Cleaned Dataset Pipeline
  const cleanedData = useMemo(() => {
    let result = [...RAW_BENCHMARK_DATA];

    if (dropDuplicates) {
      const seen = new Set<string>();
      result = result.filter((row) => {
        if (seen.has(row.prompt_id)) return false;
        seen.add(row.prompt_id);
        return true;
      });
    }

    if (filterSuccessOnly) {
      result = result.filter((row) => row.status === "SUCCESS");
    }

    if (selectedModelFilter !== "ALL") {
      result = result.filter((row) => row.model === selectedModelFilter);
    }

    if (imputeMissing) {
      // Tính median cho tokens và latency
      const validTokens = result.filter((r) => r.tokens_per_sec !== null).map((r) => r.tokens_per_sec as number);
      const validLatency = result.filter((r) => r.latency_ms !== null).map((r) => r.latency_ms as number);

      const medianToken = validTokens.length > 0 ? validTokens.sort((a, b) => a - b)[Math.floor(validTokens.length / 2)] : 100;
      const medianLat = validLatency.length > 0 ? validLatency.sort((a, b) => a - b)[Math.floor(validLatency.length / 2)] : 20;

      result = result.map((row) => ({
        ...row,
        tokens_per_sec: row.tokens_per_sec ?? medianToken,
        latency_ms: row.latency_ms ?? medianLat,
      }));
    }

    return result;
  }, [dropDuplicates, imputeMissing, filterSuccessOnly, selectedModelFilter]);

  // Descriptive Statistics Calculation
  const stats = useMemo(() => {
    const validTokens = cleanedData
      .map((r) => r.tokens_per_sec)
      .filter((v): v is number => v !== null);

    const validLatency = cleanedData
      .map((r) => r.latency_ms)
      .filter((v): v is number => v !== null);

    const meanToken = validTokens.length ? validTokens.reduce((a, b) => a + b, 0) / validTokens.length : 0;
    const meanLatency = validLatency.length ? validLatency.reduce((a, b) => a + b, 0) / validLatency.length : 0;

    return {
      count: cleanedData.length,
      meanToken: meanToken.toFixed(1),
      meanLatency: meanLatency.toFixed(1),
      missingCount: cleanedData.filter((r) => r.tokens_per_sec === null || r.latency_ms === null).length,
    };
  }, [cleanedData]);

  // Quiz Validation:
  // Q1: 1 (Broadcasting tự động dãn các chiều có kích thước bằng 1 để tương thích phép tính mà không cần sao chép bộ nhớ)
  // Q2: 0 (Vì phép gán df[col] = val trên view có thể gây SettingWithCopyWarning; cần dùng .loc hoặc .copy() tường minh)
  // Q3: 2 (Vectorization sử dụng SIMD instruction và contiguous C-memory layout, tránh chi phí overhead duyệt con trỏ từng phần tử của Python interpreter)
  const isQuizCorrect = quizAnswers.q1 === 1 && quizAnswers.q2 === 0 && quizAnswers.q3 === 2;

  const handleCompleteWeekFour = () => {
    if (!isQuizCorrect) return;
    setIsUnlocked(true);
    setShowCelebration(true);

    try {
      const completed = JSON.parse(localStorage.getItem("oryzo_completed_lessons") || "[]");
      if (!completed.includes(4)) {
        completed.push(4);
        localStorage.setItem("oryzo_completed_lessons", JSON.stringify(completed));
      }
      const artifacts = JSON.parse(localStorage.getItem("oryzo_unlocked_artifacts") || "[]");
      if (!artifacts.includes("month_01_completion_badge")) {
        artifacts.push("month_01_completion_badge");
        localStorage.setItem("oryzo_unlocked_artifacts", JSON.stringify(artifacts));
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-main)] px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/learn"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-2.5 sm:px-3 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">HUB BÀI HỌC</span>
            <span className="xs:hidden">HUB</span>
          </Link>

          <Link
            href="/lesson/week-03"
            className="hidden sm:flex items-center space-x-1 text-[11px] font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-3 rounded-[22.5px] border border-[var(--border-main)] shrink-0"
          >
            <span>&larr; TUẦN 03</span>
          </Link>

          <div className="hidden md:block text-[11px] font-mono uppercase tracking-widest text-[var(--accent-aqua)] border-l border-[var(--border-main)] pl-4 truncate">
            TUẦN 04 // NUMPY VECTORIZATION, PANDAS &amp; PIPELINE LÀM SẠCH DỮ LIỆU
          </div>
        </div>

        {/* Reading progress & Theme Switcher */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-[var(--text-secondary)]">
            <span>TIẾN ĐỘ ĐỌC:</span>
            <span className="text-[var(--text-primary)] font-medium">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors shrink-0 cursor-pointer"
            title="Chuyển chế độ Sáng / Tối"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>
        </div>

        {/* Progress bar hairline */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent-aqua)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Hero Header */}
        <section className="space-y-4 border-b border-[var(--border-main)] pb-8">
          <div className="flex items-center space-x-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--accent-aqua)] font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-aqua)] animate-pulse" />
            <span>THÁNG 01 — PYTHON VÀ DỮ LIỆU // TUẦN 04 / 26 (TỔNG KẾT THÁNG 1)</span>
          </div>

          <h1 className="text-[26px] sm:text-[38px] md:text-[42px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.08]">
            NUMPY VECTORIZATION, PANDAS DATAFRAME &amp; PIPELINE LÀM SẠCH DỮ LIỆU AI
          </h1>

          <p className="text-[16px] sm:text-[19px] font-normal leading-relaxed text-[var(--text-secondary)] pt-1">
            Chào mừng bạn đến với tuần cuối cùng của Tháng 1. Trong kỹ thuật AI, dữ liệu thực tế luôn chứa đầy giá trị rỗng (<code>NaN</code>), bản ghi trùng lặp và phân phối lệch. Tuần này, chúng ta sẽ bóc tách cơ chế <strong>SIMD Vectorization</strong> của NumPy (nền tảng của Tensor trong PyTorch), làm chủ phân tích dữ liệu với <strong>Pandas</strong> và hoàn thành notebook làm sạch dữ liệu chuẩn kỹ sư.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] font-mono uppercase text-[var(--text-secondary)]">
            <span>THỜI LƯỢNG: 6–8 GIỜ</span>
            <span>•</span>
            <span>TRỌNG TÂM: BROADCASTING, CONTIGUOUS MEMORY, PANDAS CLEANING</span>
            <span>•</span>
            <span className="text-[var(--accent-aqua)] font-medium">LAB TƯƠNG TÁC CUỐI TRANG &darr;</span>
          </div>
        </section>

        {/* PART 1: NumPy Vectorization & Broadcasting */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Zap className="w-4 h-4" />
            <span>PHẦN 1 // BẢN CHẤT BỘ NHỚ NUMPY: VECTORIZATION VS VÒNG LẶP FOR</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            1. Tại Sao Vòng Lặp <code>for</code> Trong Python Chậm Hơn NumPy 50–100 Lần?
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Trong Python thuần, một <code>list</code> thực chất là một mảng chứa các con trỏ trỏ tới các đối tượng số nguyên/thực nằm rải rác trên heap (Boxing overhead). Mỗi lần lặp qua phần tử, Python phải kiểm tra kiểu dữ liệu và giải nén giá trị.
          </p>

          <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-2 text-[14px]">
            <div className="font-mono text-[12px] uppercase text-[var(--accent-aqua)] font-semibold flex items-center justify-between">
              <span>NumPy ndarray: C-Contiguous Memory &amp; SIMD</span>
              <span className="text-[10px] text-emerald-400">HARDWARE ACCELERATION</span>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[13px]">
              Ngược lại, <code>np.ndarray</code> lưu trữ dữ liệu thô liên tục trong bộ nhớ RAM (Contiguous Block of Memory). Khi thực hiện phép tính cộng ma trận, NumPy gọi trực tiếp các chỉ thị <strong>SIMD (Single Instruction, Multiple Data)</strong> trên CPU (như AVX-512) để tính toán đồng thời 8 hoặc 16 số cùng lúc trong một chu kỳ xung nhịp.
            </p>
          </div>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto space-y-2">
            <div className="text-[var(--accent-aqua)]"># Quy tắc Broadcasting trong NumPy:</div>
            <pre className="text-emerald-300">{`import numpy as np

# Ma trận trọng số (Batch=32, Hidden=768)
activations = np.random.randn(32, 768)

# Vector bias (768,)
bias = np.random.randn(768)

# Broadcasting tự động dãn chiều bias từ (768,) -> (1, 768) -> (32, 768)
# mà KHÔNG hề nhân bản vùng nhớ vật lý!
output = activations + bias  # Shape kết quả: (32, 768)`}</pre>
          </div>
        </section>

        {/* PART 2: Pandas Series & DataFrame */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Database className="w-4 h-4" />
            <span>PHẦN 2 // PANDAS SERIES, DATAFRAME &amp; CẠM BẪY SETTINGWITHCOPY</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            2. Thao Tác DataFrame Chuẩn Kỹ Sư &amp; Tránh Cảnh Báo Bản Sao
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Trong Pandas, một <code>DataFrame</code> là tập hợp các <code>Series</code> (tương đương với các cột). Mỗi cột được quản lý bởi một mảng NumPy bên dưới.
          </p>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto">
            <pre className="text-emerald-300">{`import pandas as pd

# 1. Đọc dữ liệu với chỉ định kiểu cụ thể để tiết kiệm RAM
df = pd.read_csv(
    "benchmark.csv",
    dtype={"prompt_id": "string", "model": "category"},
    parse_dates=["timestamp"]
)

# 2. Lọc dữ liệu bằng Boolean Masking
fast_llama = df[(df["model"] == "Llama-3-8B") & (df["tokens_per_sec"] > 140)]

# ❌ TRÁNH: Chained indexing gây SettingWithCopyWarning
# df[df["model"] == "Llama-3-8B"]["status"] = "VERIFIED"

# ✅ ĐÚNG: Sử dụng .loc tường minh
df.loc[df["model"] == "Llama-3-8B", "status"] = "VERIFIED"`}</pre>
          </div>
        </section>

        {/* PART 3: Missing Values, Duplicates & Outliers */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Filter className="w-4 h-4" />
            <span>PHẦN 3 // QUY TRÌNH LÀM SẠCH DỮ LIỆU CHUẨN CÔNG NGHIỆP</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            3. Xử Lý Missing Values, Trùng Lặp &amp; Ngoại Lai (Outliers)
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Nguyên tắc vàng: <strong>&quot;Garbage In, Garbage Out&quot;</strong>. Nếu dữ liệu huấn luyện hoặc đánh giá LLM bị nhiễm giá trị rỗng hoặc trùng lặp, kết quả benchmark hoàn toàn vô giá trị:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] font-mono">
            <div className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <span className="text-amber-400 font-semibold block">1. Missing Values (NaN)</span>
              <p className="text-[var(--text-secondary)] leading-relaxed font-sans text-[11px]">
                Kiểm tra bằng <code>df.isna().sum()</code>. Với dữ liệu lệch (skewed), điền khuyết bằng <strong>Median</strong> an toàn hơn Mean vì không bị ảnh hưởng bởi điểm ngoại lai.
              </p>
            </div>

            <div className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <span className="text-red-400 font-semibold block">2. Duplicate Rows</span>
              <p className="text-[var(--text-secondary)] leading-relaxed font-sans text-[11px]">
                Kiểm tra bằng <code>df.duplicated(subset=[&apos;prompt_id&apos;])</code>. Loại bỏ trùng lặp bằng <code>drop_duplicates()</code> để tránh thiên lệch khi tính trung bình.
              </p>
            </div>

            <div className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <span className="text-sky-400 font-semibold block">3. Outlier Filtering</span>
              <p className="text-[var(--text-secondary)] leading-relaxed font-sans text-[11px]">
                Sử dụng khoảng tứ phân vị <strong>IQR = Q3 - Q1</strong> hoặc Z-Score để cắt tỉa các điểm dị biệt (ví dụ độ trễ mạng bất thường 10,000ms).
              </p>
            </div>
          </div>
        </section>

        {/* PART 4: Interactive Lab */}
        <section className="space-y-6 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Play className="w-4 h-4" />
            <span>PHẦN 4 // PHÒNG LAB TƯƠNG TÁC: VECTORIZATION BENCHMARK &amp; DATA CLEANING PIPELINE</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            4. Thử Nghiệm Tốc Độ SIMD &amp; Làm Sạch Dataset Trực Tuyến
          </h2>

          <div className="p-5 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-5">
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-main)] pb-3">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setActiveTab("vectorization")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "vectorization"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>1. Vectorization Benchmark</span>
                </button>

                <button
                  onClick={() => setActiveTab("cleaning")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "cleaning"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>2. Data Cleaning Pipeline</span>
                </button>

                <button
                  onClick={() => setActiveTab("stats")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "stats"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>3. Thống Kê &amp; Phân Phối</span>
                </button>
              </div>
            </div>

            {/* TAB 1: Vectorization Benchmark */}
            {activeTab === "vectorization" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-[12px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
                    <span>CHỌN KÍCH THƯỚC MẢNG (ARRAY SIZE N):</span>
                    <span className="text-[var(--accent-aqua)] font-semibold">{arraySize.toLocaleString()} PHẦN TỬ</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    className="w-full accent-[var(--accent-aqua)] cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <button
                    onClick={handleRunVectorBenchmark}
                    disabled={isComputingVector}
                    className="h-[38px] px-5 rounded-[6px] bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isComputingVector ? "ĐANG TÍNH TOÁN..." : "CHẠY BENCHMARK SIMD"}</span>
                  </button>
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                    So sánh phép tính $y = x^2 + 2x + 1$
                  </span>
                </div>

                {vectorSpeedup && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[12px]">
                    <div className="p-3.5 rounded-[8px] bg-[#081214] border border-red-900/40 space-y-1">
                      <div className="text-red-400 text-[10px] uppercase">Python Pure Loop</div>
                      <div className="text-[18px] font-bold text-[#ffedd7]">{vectorSpeedup.pyTime} ms</div>
                      <div className="text-[10px] text-slate-400">Duyệt từng con trỏ pointer</div>
                    </div>

                    <div className="p-3.5 rounded-[8px] bg-[#081214] border border-emerald-900/40 space-y-1">
                      <div className="text-emerald-400 text-[10px] uppercase">NumPy SIMD Vectorized</div>
                      <div className="text-[18px] font-bold text-emerald-300">{vectorSpeedup.npTime} ms</div>
                      <div className="text-[10px] text-slate-400">AVX-512 Contiguous RAM</div>
                    </div>

                    <div className="p-3.5 rounded-[8px] bg-[var(--badge-bg)] border border-[var(--badge-border)] space-y-1">
                      <div className="text-[var(--accent-aqua)] text-[10px] uppercase">TỐC ĐỘ VƯỢT TRỘI</div>
                      <div className="text-[18px] font-bold text-[var(--accent-aqua)]">{vectorSpeedup.ratio}x NHANH HƠN</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">Nền tảng của Deep Learning</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Data Cleaning Pipeline */}
            {activeTab === "cleaning" && (
              <div className="space-y-4">
                {/* Control switches */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
                  <label className="p-2.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] flex items-center space-x-2 cursor-pointer hover:border-[var(--accent-aqua)] transition-colors">
                    <input
                      type="checkbox"
                      checked={dropDuplicates}
                      onChange={(e) => setDropDuplicates(e.target.checked)}
                      className="rounded accent-[var(--accent-aqua)] w-3.5 h-3.5"
                    />
                    <span>1. drop_duplicates()</span>
                  </label>

                  <label className="p-2.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] flex items-center space-x-2 cursor-pointer hover:border-[var(--accent-aqua)] transition-colors">
                    <input
                      type="checkbox"
                      checked={imputeMissing}
                      onChange={(e) => setImputeMissing(e.target.checked)}
                      className="rounded accent-[var(--accent-aqua)] w-3.5 h-3.5"
                    />
                    <span>2. fillna(median)</span>
                  </label>

                  <label className="p-2.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] flex items-center space-x-2 cursor-pointer hover:border-[var(--accent-aqua)] transition-colors">
                    <input
                      type="checkbox"
                      checked={filterSuccessOnly}
                      onChange={(e) => setFilterSuccessOnly(e.target.checked)}
                      className="rounded accent-[var(--accent-aqua)] w-3.5 h-3.5"
                    />
                    <span>3. Lọc SUCCESS only</span>
                  </label>
                </div>

                {/* Model filter */}
                <div className="flex items-center space-x-2 text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>LỌC MODEL:</span>
                  {(["ALL", "Llama-3-8B", "DeepSeek-V3", "Mistral-7B"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedModelFilter(m)}
                      className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition-colors ${
                        selectedModelFilter === m
                          ? "bg-[var(--accent-aqua)] text-black font-semibold"
                          : "bg-[var(--surface-hover)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                {/* Table representation */}
                <div className="border border-[var(--border-main)] rounded-[6px] overflow-x-auto max-h-60">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="bg-[var(--bg-canvas)] text-[var(--text-secondary)] border-b border-[var(--border-main)]">
                      <tr>
                        <th className="p-2">PROMPT_ID</th>
                        <th className="p-2">MODEL</th>
                        <th className="p-2">TOKENS/SEC</th>
                        <th className="p-2">LATENCY (MS)</th>
                        <th className="p-2">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-main)]/50">
                      {cleanedData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[var(--surface-hover)]">
                          <td className="p-2 text-[var(--accent-aqua)]">{row.prompt_id}</td>
                          <td className="p-2">{row.model}</td>
                          <td className="p-2">
                            {row.tokens_per_sec === null ? (
                              <span className="text-red-400 font-bold bg-red-950/20 px-1.5 py-0.5 rounded">NaN</span>
                            ) : (
                              row.tokens_per_sec.toFixed(1)
                            )}
                          </td>
                          <td className="p-2">
                            {row.latency_ms === null ? (
                              <span className="text-red-400 font-bold bg-red-950/20 px-1.5 py-0.5 rounded">NaN</span>
                            ) : (
                              row.latency_ms.toFixed(1)
                            )}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                                row.status === "SUCCESS"
                                  ? "bg-emerald-500/15 text-emerald-400"
                                  : "bg-amber-500/15 text-amber-400"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Descriptive Stats */}
            {activeTab === "stats" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono">
                  <div className="p-3 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)]">TỔNG SỐ BẢN GHI</div>
                    <div className="text-[18px] font-bold text-[var(--text-primary)] mt-0.5">{stats.count}</div>
                  </div>
                  <div className="p-3 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)]">MEAN TOKENS/S</div>
                    <div className="text-[18px] font-bold text-emerald-400 mt-0.5">{stats.meanToken}</div>
                  </div>
                  <div className="p-3 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)]">MEAN LATENCY</div>
                    <div className="text-[18px] font-bold text-[var(--accent-aqua)] mt-0.5">{stats.meanLatency} ms</div>
                  </div>
                  <div className="p-3 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                    <div className="text-[var(--text-secondary)]">SỐ Ô CÒN NaN</div>
                    <div className={`text-[18px] font-bold mt-0.5 ${stats.missingCount > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                      {stats.missingCount}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[#081214] text-[11px] font-mono text-[#e2fbf9] border border-[#143338]">
                  <span className="text-[var(--accent-aqua)]">&gt;</span> df.describe(include=[&apos;float64&apos;]) output ready. Dữ liệu đã được làm sạch và chuẩn bị sẵn sàng cho pipeline phân tích.
                </div>
              </div>
            )}
          </div>

          {/* Quiz Section */}
          <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-5">
            <div className="flex items-center space-x-2 text-[12px] font-mono text-[var(--accent-aqua)] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>BÀI KIỂM ĐỊNH NĂNG LỰC TUẦN 04 (TỔNG KẾT THÁNG 1)</span>
            </div>

            {/* Q1 */}
            <div className="space-y-2 text-[13px]">
              <div className="text-[var(--text-primary)] font-medium">
                1. Cơ chế Broadcasting trong NumPy cho phép thực hiện phép tính giữa 2 mảng khác kích thước (shape) khi nào?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Khi 2 mảng có cùng tổng số lượng phần tử tuyệt đối",
                  "Khi ở mỗi chiều tính từ phải sang trái, kích thước của chúng bằng nhau hoặc có ít nhất một chiều bằng 1",
                  "NumPy tự động cắt bỏ phần dư để ép 2 mảng về cùng kích thước",
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuizAnswers({ ...quizAnswers, q1: i })}
                    className={`p-2.5 rounded-[6px] border text-left transition-colors cursor-pointer ${
                      quizAnswers.q1 === i
                        ? "border-[var(--accent-aqua)] bg-[var(--accent-aqua)]/10 text-[var(--text-primary)]"
                        : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-2 text-[13px] pt-2">
              <div className="text-[var(--text-primary)] font-medium">
                2. Tại sao câu lệnh <code>df[df[&apos;col&apos;] &gt; 0][&apos;status&apos;] = &apos;OK&apos;</code> lại ném cảnh báo <code>SettingWithCopyWarning</code> trong Pandas?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Vì phép lọc liên tiếp (Chained Indexing) không đảm bảo trả về một View hay một Bản sao (Copy), dẫn đến việc gán giá trị có thể không tác động lên DataFrame gốc; cần dùng .loc tường minh",
                  "Vì Pandas không cho phép chỉnh sửa giá trị sau khi đã đọc file",
                  "Vì cột 'status' bắt buộc phải là số nguyên",
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuizAnswers({ ...quizAnswers, q2: i })}
                    className={`p-2.5 rounded-[6px] border text-left transition-colors cursor-pointer ${
                      quizAnswers.q2 === i
                        ? "border-[var(--accent-aqua)] bg-[var(--accent-aqua)]/10 text-[var(--text-primary)]"
                        : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-2 text-[13px] pt-2">
              <div className="text-[var(--text-primary)] font-medium">
                3. Yếu tố phần cứng nào giúp phép tính vector hóa trong NumPy chạy nhanh hơn 50–100 lần so với vòng lặp <code>for</code> của Python?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "NumPy tự động gửi dữ liệu lên GPU đám mây",
                  "NumPy xóa bỏ bộ nhớ đệm cache L1/L2 của CPU",
                  "NumPy bố trí mảng liên tục trong bộ nhớ RAM (C-contiguous) và tận dụng tập chỉ thị SIMD (AVX/SSE) của CPU để tính toán song song nhiều phần tử cùng lúc",
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuizAnswers({ ...quizAnswers, q3: i })}
                    className={`p-2.5 rounded-[6px] border text-left transition-colors cursor-pointer ${
                      quizAnswers.q3 === i
                        ? "border-[var(--accent-aqua)] bg-[var(--accent-aqua)]/10 text-[var(--text-primary)]"
                        : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                {isQuizCorrect ? (
                  <span className="text-emerald-400 font-medium">
                    ✓ Xuất sắc! Bạn đã vượt qua bài kiểm định và hoàn thành toàn bộ Tháng 1.
                  </span>
                ) : (
                  <span>Vui lòng chọn đúng cả 3 câu hỏi để hoàn thành Tuần 04.</span>
                )}
              </div>

              <button
                disabled={!isQuizCorrect}
                onClick={handleCompleteWeekFour}
                className={`h-[42px] px-6 rounded-[22.5px] font-mono text-[11px] uppercase tracking-wider font-medium transition-all flex items-center space-x-2 ${
                  isQuizCorrect
                    ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] hover:bg-[var(--btn-solid-hover)] cursor-pointer shadow-md"
                    : "opacity-40 cursor-not-allowed border border-[var(--border-main)] text-[var(--text-secondary)]"
                }`}
              >
                <Award className="w-4 h-4 text-[var(--accent-aqua)]" />
                <span>
                  {isUnlocked ? "ĐÃ HOÀN THÀNH THÁNG 1 ✓" : "HOÀN THÀNH BÀI HỌC TUẦN 04"}
                </span>
              </button>
            </div>

            {showCelebration && (
              <div className="p-4 rounded-[8px] bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-[12px] font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Chúc mừng! Bạn đã hoàn thành xuất sắc toàn bộ THÁNG 01 (Python, Cấu trúc dữ liệu, OOP &amp; NumPy/Pandas). Huy hiệu Milestone Tháng 1 đã được trao tặng!
                  </span>
                </div>
                <Link
                  href="/learn"
                  className="px-4 py-1.5 rounded-[6px] bg-emerald-500 text-black font-semibold text-[11px] uppercase tracking-wider hover:bg-emerald-400 transition-colors shrink-0"
                >
                  VỀ HUB BÀI HỌC &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[var(--border-main)] py-6 px-4 sm:px-8 text-center text-[11px] font-mono text-[var(--text-secondary)]">
        <div>AUROS AI LAB // TUẦN 04 — NUMPY, PANDAS &amp; DATA CLEANING PIPELINE</div>
      </footer>
    </div>
  );
}
