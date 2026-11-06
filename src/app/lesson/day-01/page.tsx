"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Cpu, Terminal, Flame, BookOpen, Sun, Moon, ArrowRight, Layers, Sparkles } from "lucide-react";
import ComputeDieScene from "@/components/ComputeDieScene";
import { useTheme } from "@/context/ThemeContext";

export default function DayOneLessonPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Exercise State at the bottom of the page
  const [quantMode, setQuantMode] = useState<"FP16" | "INT8" | "INT4">("INT4");
  const [modelSize, setModelSize] = useState<number>(7); // 7B
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Check if already completed
    const saved = localStorage.getItem("oryzo_unlocked_artifacts");
    if (saved && JSON.parse(saved).includes("compute_die")) {
      setIsUnlocked(true);
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // VRAM Calculation
  const bytesPerParam = quantMode === "FP16" ? 2 : quantMode === "INT8" ? 1 : 0.5;
  const vramRequired = (modelSize * bytesPerParam * 1.25).toFixed(1);
  const isFitsVRAM = parseFloat(vramRequired) <= 12; // Assuming 12GB RTX 3060/4060 baseline

  const handleCompleteLesson = () => {
    if (quizAnswer !== 0) return;
    setIsUnlocked(true);
    setShowCelebration(true);

    try {
      const current = JSON.parse(localStorage.getItem("oryzo_unlocked_artifacts") || "[]");
      if (!current.includes("compute_die")) {
        current.push("compute_die");
        localStorage.setItem("oryzo_unlocked_artifacts", JSON.stringify(current));
      }
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)]">
      {/* Sticky Top Reading Bar */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-main)] px-6 sm:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-2.5 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>3D HUB MATRIX</span>
          </Link>

          <Link
            href="/roadmap"
            className="hidden md:flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--accent-ember)] transition-colors py-1 px-2.5 rounded-[22.5px] border border-[var(--border-main)]"
          >
            <span>LỘ TRÌNH 26 TUẦN</span>
          </Link>

          <div className="hidden sm:block text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] border-l border-[var(--border-main)] pl-4">
            DAY 01 // SILICON & TENSORS
          </div>
        </div>

        {/* Progress & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-[var(--text-secondary)]">
            <span>TIẾN ĐỘ ĐỌC:</span>
            <span className="text-[var(--text-primary)] font-medium">{Math.round(scrollProgress)}%</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors"
            title="Chuyển chế độ Sáng / Tối"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>

        {/* Reading progress hairline */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent-ember)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Main Reading Container */}
      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 space-y-12">
        {/* Header Section */}
        <section className="space-y-4 border-b border-[var(--border-main)] pb-8">
          <div className="flex items-center space-x-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--accent-ember)] font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)]" />
            <span>GIÁO TRÌNH NỀN TẢNG — DAY 01 / 75</span>
          </div>

          <h1 className="text-[34px] sm:text-[44px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.05]">
            TẠI SAO SILICON VÀ TENSOR QUYẾT ĐỊNH TƯ DUY CỦA AI?
          </h1>

          <p className="text-[19px] sm:text-[22px] font-normal leading-relaxed text-[var(--text-secondary)] pt-1">
            Trước khi mô hình ngôn ngữ lớn (LLM) có thể phân tích code hay trò chuyện, hàng tỷ tham số phải được nạp và nhân với nhau trong một phần nghìn giây. Đây là bài học giải phẫu cỗ máy từ phần cứng lên phần mềm.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] font-mono uppercase text-[var(--text-secondary)]">
            <span>THỜI GIAN ĐỌC: ~7 PHÚT</span>
            <span>•</span>
            <span>MỤC TIÊU: HIỂU BẢN CHẤT GEMM & QUANTIZATION</span>
            <span>•</span>
            <span className="text-[var(--accent-ember)] font-medium">BÀI TẬP Ở CUỐI TRANG ↓</span>
          </div>
        </section>

        {/* Part 1: CPU vs GPU vs Tensor Core */}
        <section className="space-y-4 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-primary)]/90">
          <h2 className="text-[22px] sm:text-[26px] font-medium uppercase tracking-tight text-[var(--text-primary)] pt-4">
            1. CPU vs GPU vs Tensor Cores: Sự khác biệt bản chất
          </h2>

          <p>
            Là kỹ sư phần mềm, chúng ta quen thuộc với việc viết code chạy trên <strong>CPU</strong>: các câu lệnh tuần tự, vòng lặp <code>for</code>, các khối điều kiện <code>if/else</code> phức tạp và tối ưu hóa bộ nhớ đệm (L1/L2 Cache) cho độ trễ cực thấp.
          </p>

          <p>
            Tuy nhiên, <strong>Mạng nơ-ron nhân tạo (Neural Networks)</strong> hoàn toàn không tư duy theo cách đó. Toàn bộ kiến trúc Transformer, Attention hay Feed-Forward thực chất chỉ là một phép toán duy nhất lặp đi lặp lại hàng nghìn tỷ lần: <strong>Phép nhân ma trận tổng quát (General Matrix Multiplication - GEMM)</strong>:
          </p>

          <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] font-mono text-[14px] text-[var(--accent-ember)] my-3">
            Output = Activation( Input × Weight + Bias )
          </div>

          <p>
            Trong khi CPU chỉ có từ 8 đến 64 lõi tính toán tuần tự, một chip AI hiện đại (như NVIDIA H100 hoặc Google TPU) chứa hàng nghìn <strong>Tensor Cores</strong>. Mỗi Tensor Core là một mạch phần cứng chuyên dụng trên silicon được tôi luyện để thực hiện phép nhân ma trận <code>4×4</code> hoặc <code>16×16</code> chỉ trong đúng <strong>1 chu kỳ xung nhịp (clock cycle)</strong>.
          </p>
        </section>

        {/* Part 2: 3D Embedded Inspector within Reading */}
        <section className="p-6 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[var(--accent-ember)]" />
              <span className="text-[12px] font-medium uppercase tracking-wider font-mono text-[var(--text-primary)]">
                TRỰC QUAN HÓA 3D: CẤU TẠO THE COMPUTE DIE
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-mono">
              XOAY & TƯƠNG TÁC TRỰC TIẾP
            </span>
          </div>

          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            Quan sát mô hình bên dưới: Khối trung tâm là <strong>Compute Die</strong> chứa 16 cụm Tensor Cores phát sáng (xử lý phép nhân ma trận). Bốn khối hộp nhiều tầng xung quanh là <strong>HBM3 (High Bandwidth Memory)</strong>, nối với die trung tâm qua các bus dẫn tín hiệu cực ngắn:
          </p>

          <div className="h-[360px] w-full rounded-[8px] overflow-hidden bg-[var(--bg-canvas)] border border-[var(--border-main)]">
            <ComputeDieScene isExploded={false} quantMode={quantMode} />
          </div>

          <div className="text-[11px] text-center text-[var(--text-secondary)] font-mono uppercase">
            HÌNH 1.1: KIẾN TRÚC VI MẠCH NPU MONOLITHIC & 4x HBM3 MEMORY STACKS
          </div>
        </section>

        {/* Part 3: The Memory Bandwidth Bottleneck */}
        <section className="space-y-4 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-primary)]/90">
          <h2 className="text-[22px] sm:text-[26px] font-medium uppercase tracking-tight text-[var(--text-primary)] pt-4">
            2. Nút thắt cổ chai lớn nhất: Băng thông bộ nhớ (Memory Bandwidth)
          </h2>

          <p>
            Rất nhiều kỹ sư lầm tưởng rằng chạy AI bị chậm là do GPU "tính không kịp". <strong>Thực tế hoàn toàn ngược lại.</strong>
          </p>

          <p>
            Trong quá trình sinh token (LLM Inference Autoregressive): để sinh ra chỉ <strong>1 token tiếp theo</strong>, toàn bộ hàng tỷ tham số trọng số (Weights) của mô hình phải được đọc từ VRAM và đẩy qua bus bộ nhớ vào Tensor Cores.
          </p>

          <blockquote className="my-4 p-4 rounded-[8px] bg-[var(--surface-elevated)] border-l-2 border-[var(--accent-ember)] italic text-[16px] text-[var(--text-primary)]">
            "Nếu bạn có một mô hình 70 tỷ tham số, mỗi token sinh ra tương đương việc bạn phải di chuyển khoảng 140GB dữ liệu qua đường truyền bộ nhớ. Đây chính là lý do vì sao LLM bị nghẽn ở Memory-bound chứ không phải Compute-bound."
          </blockquote>
        </section>

        {/* Part 4: Quantization Fundamentals */}
        <section className="space-y-4 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-primary)]/90">
          <h2 className="text-[22px] sm:text-[26px] font-medium uppercase tracking-tight text-[var(--text-primary)] pt-4">
            3. Lượng tử hóa (Quantization): Bí kíp tối ưu của AI Engineer
          </h2>

          <p>
            Làm thế nào để đưa một mô hình 70B (yêu cầu ~140GB VRAM ở chuẩn FP16) về chạy mượt mà trên một máy chủ giá rẻ hoặc thậm chí là máy trạm cá nhân? Câu trả lời là <strong>Quantization (Lượng tử hóa)</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <div className="text-[12px] font-mono text-[var(--accent-ember)] font-medium">FP16 (Half Precision)</div>
              <div className="text-[13px] text-[var(--text-primary)] mt-1">2 Bytes / tham số</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Chuẩn gốc khi train, tốn VRAM nhất.</div>
            </div>

            <div className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <div className="text-[12px] font-mono text-[var(--accent-ember)] font-medium">INT8 (Quantized)</div>
              <div className="text-[13px] text-[var(--text-primary)] mt-1">1 Byte / tham số</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Tiết kiệm 50% VRAM, giữ nguyên độ chính xác.</div>
            </div>

            <div className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <div className="text-[12px] font-mono text-[var(--accent-ember)] font-medium">INT4 (Ultra Quant)</div>
              <div className="text-[13px] text-[var(--text-primary)] mt-1">0.5 Byte / tham số</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Tiết kiệm 75% VRAM! Chạy được trên laptop.</div>
            </div>
          </div>
        </section>

        {/* Dashed Separator */}
        <div className="border-dashed-hairline my-8" />

        {/* Part 5: HANDS-ON EXERCISE SECTION (AT THE BOTTOM OF SCROLL) */}
        <section id="exercise-section" className="space-y-8 pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--accent-ember)] font-mono">
              <Flame className="w-4 h-4" />
              <span>PHẦN BÀI TẬP THỰC HÀNH // CUỐI BÀI</span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
              BÀI TẬP KIỂM TRA & MỞ KHÓA TẠO TÁC 3D
            </h2>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
              Hoàn thành 2 bài thực hành nhỏ bên dưới để mở khóa linh kiện <strong>The Compute Die</strong> và tích hợp nó vào Bộ não 3D cá nhân của bạn.
            </p>
          </div>

          {/* Exercise 1: Live Interactive Calculator */}
          <div className="p-6 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
              <span className="text-[12px] font-mono uppercase tracking-wider font-medium text-[var(--text-primary)]">
                BÀI 1: MÔ PHỎNG VRAM CẦN THIẾT THEO QUAN MỨC NÉN
              </span>
              <span className="text-[11px] font-mono text-[var(--accent-ember)]">
                TƯƠNG TÁC THỜI GIAN THỰC
              </span>
            </div>

            {/* Parameter selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[var(--text-secondary)]">Chọn kích thước mô hình (Parameters):</span>
                <span className="font-mono font-medium text-[var(--text-primary)]">{modelSize} TỶ THAM SỐ ({modelSize}B)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[7, 13, 70].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setModelSize(sz)}
                    className={`py-2 px-3 rounded-[8px] border text-[12px] font-mono font-medium transition-colors ${
                      modelSize === sz
                        ? "border-[var(--text-primary)] bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)]"
                        : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    MÔ HÌNH {sz}B
                  </button>
                ))}
              </div>
            </div>

            {/* Quant selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[var(--text-secondary)]">Chọn độ chính xác lượng tử hóa:</span>
                <span className="font-mono font-medium text-[var(--accent-ember)]">{quantMode}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["FP16", "INT8", "INT4"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuantMode(q)}
                    className={`py-2 px-3 rounded-[8px] border text-[12px] font-mono font-medium transition-colors ${
                      quantMode === q
                        ? "border-[var(--text-primary)] bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)]"
                        : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {q} {q === "INT4" && "🔥"}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Readout */}
            <div className="p-4 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)] space-y-2.5">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[var(--text-secondary)]">VRAM ước tính cần thiết (kèm KV-Cache):</span>
                <span className="text-[18px] font-mono font-medium text-[var(--text-primary)]">
                  {vramRequired} GB
                </span>
              </div>

              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[var(--text-secondary)]">Khả năng chạy trên GPU RTX 3060/4060 (12GB VRAM):</span>
                <span className={`text-[11px] font-mono font-medium uppercase px-2 py-0.5 rounded ${
                  isFitsVRAM
                    ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-400"
                    : "bg-red-950/40 border border-red-500/40 text-red-400"
                }`}>
                  {isFitsVRAM ? "VỪA VẶN TRONG BỘ NHỚ ✓" : "TRÀN BỘ NHỚ (OOM) ✗"}
                </span>
              </div>
            </div>
          </div>

          {/* Exercise 2: Concept Quiz */}
          <div className="p-6 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
              <span className="text-[12px] font-mono uppercase tracking-wider font-medium text-[var(--text-primary)]">
                BÀI 2: CÂU HỎI KIỂM TRA BẢN CHẤT KỸ SƯ
              </span>
              <span className="text-[11px] font-mono text-[var(--accent-ember)]">BẮT BUỘC</span>
            </div>

            <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
              Khi bạn deploy một LLM phục vụ người dùng chat thời gian thực (sinh từng token nối tiếp nhau), đâu là yếu tố phần cứng quyết định lớn nhất đến tốc độ sinh token (Tokens per second)?
            </p>

            <div className="space-y-2.5 pt-1">
              {[
                {
                  id: 0,
                  text: "Băng thông bộ nhớ (Memory Bandwidth của VRAM / HBM) để load trọng số mô hình cho mỗi token.",
                  explanation: "Chính xác! Mỗi token sinh ra đòi hỏi đọc lại toàn bộ hàng tỷ tham số từ VRAM vào nhân tính toán.",
                },
                {
                  id: 1,
                  text: "Xung nhịp tính toán GHz của CPU trên máy chủ.",
                  explanation: "Sai. CPU hầu như không tham gia vào phép tính ma trận lõi của mạng nơ-ron.",
                },
                {
                  id: 2,
                  text: "Dung lượng ổ cứng SSD cài đặt hệ điều hành.",
                  explanation: "Sai. Trọng số mô hình khi chạy đã được tải hoàn toàn vào RAM/VRAM.",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setQuizAnswer(item.id)}
                  className={`w-full text-left p-3.5 rounded-[8px] text-[13px] border transition-all ${
                    quizAnswer === item.id
                      ? item.id === 0
                        ? "border-emerald-500 bg-emerald-950/30 text-[var(--text-primary)]"
                        : "border-red-500 bg-red-950/30 text-[var(--text-primary)]"
                      : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="font-normal">{item.text}</div>
                  {quizAnswer === item.id && (
                    <div className={`mt-2 text-[12px] font-mono ${item.id === 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {item.explanation}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Submit & Unlock Section */}
          <div className="p-6 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] text-center space-y-4">
            <h3 className="text-[18px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
              {isUnlocked ? "CHÚC MỪNG! BẠN ĐÃ HOÀN THÀNH DAY 01" : "HOÀN THÀNH BÀI HỌC VÀ NHẬN LINH KIỆN 3D"}
            </h3>

            <p className="text-[13px] text-[var(--text-secondary)] max-w-md mx-auto">
              {isUnlocked
                ? "Linh kiện The Compute Die đã được tích hợp vĩnh viễn vào Bộ não 3D của bạn. Hãy quay lại Hub để chiêm ngưỡng cỗ máy!"
                : "Chọn đúng đáp án ở Bài 2 để kích hoạt quá trình lắp ráp linh kiện vi mạch vào hệ thống."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {!isUnlocked ? (
                <button
                  onClick={handleCompleteLesson}
                  disabled={quizAnswer !== 0}
                  className={`h-[46px] px-8 rounded-[36px] font-medium text-[12px] uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 whitespace-nowrap shrink-0 ${
                    quizAnswer === 0
                      ? "bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] border border-[var(--border-main)] shadow-lg cursor-pointer"
                      : "bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-not-allowed opacity-60"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1 shrink-0" />
                  <span>NỘP BÀI & MỞ KHÓA THE COMPUTE DIE</span>
                </button>
              ) : (
                <Link
                  href="/"
                  className="h-[46px] px-8 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[12px] font-medium uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent-ember)] mr-1 shrink-0" />
                  <span>QUAY LẠI 3D HUB XEM BỘ NÃO CỦA BẠN</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Celebration Notification */}
      {showCelebration && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-[12px] bg-[var(--surface-card)] border border-emerald-500/50 shadow-2xl flex items-center space-x-3 text-[var(--text-primary)] animate-bounce">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            ✓
          </div>
          <div>
            <div className="text-[12px] font-medium uppercase font-mono text-emerald-400">
              ARTIFACT UNLOCKED!
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">
              The Compute Die đã được tích hợp vào 3D Matrix.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
