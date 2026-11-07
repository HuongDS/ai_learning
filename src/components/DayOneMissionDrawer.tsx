"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Play, Terminal, Cpu, ArrowRight, ShieldCheck, Flame } from "lucide-react";

interface DayOneMissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quantMode: "FP16" | "INT8" | "INT4";
  setQuantMode: (mode: "FP16" | "INT8" | "INT4") => void;
  onMissionComplete: () => void;
}

export default function DayOneMissionDrawer({
  isOpen,
  onClose,
  quantMode,
  setQuantMode,
  onMissionComplete,
}: DayOneMissionDrawerProps) {
  const [activeTab, setActiveTab] = useState<"brief" | "simulator" | "github_radar">("simulator");
  const [modelParams, setModelParams] = useState<number>(7); // 7B model
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  if (!isOpen) return null;

  // Calculate memory requirements based on Quantization
  const bytesPerParam = quantMode === "FP16" ? 2 : quantMode === "INT8" ? 1 : 0.5;
  const memoryRequiredGB = (modelParams * bytesPerParam * 1.2).toFixed(1); // +20% for KV-cache & activations
  const throughputMultiplier = quantMode === "INT4" ? "3.2x" : quantMode === "INT8" ? "1.9x" : "1.0x";

  const handleFinish = () => {
    setIsCompleted(true);
    onMissionComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-xl h-full bg-[#100904] border-l border-[#40372e] flex flex-col p-6 sm:p-8 overflow-y-auto text-[#ffedd7]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#40372e]">
          <div>
            <div className="text-[10px] tracking-widest uppercase text-[#dc5000] font-medium">
              HARDWARE SIMULATION // LAB 3D (TUẦN 08 & 25)
            </div>
            <h2 className="text-[24px] font-medium uppercase tracking-tight text-[#ffedd7] mt-0.5">
              Silicon, Tensors & Quantization
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#382416] text-[#ffedd7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#40372e] my-4 text-[12px] uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("simulator")}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 ${
              activeTab === "simulator"
                ? "border-[#ffedd7] text-[#ffedd7]"
                : "border-transparent text-[#6c5f51] hover:text-[#ffedd7]"
            }`}
          >
            1. Lab Simulator (3D Sync)
          </button>
          <button
            onClick={() => setActiveTab("brief")}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 ${
              activeTab === "brief"
                ? "border-[#ffedd7] text-[#ffedd7]"
                : "border-transparent text-[#6c5f51] hover:text-[#ffedd7]"
            }`}
          >
            2. Core Theory
          </button>
          <button
            onClick={() => setActiveTab("github_radar")}
            className={`pb-2.5 px-3 font-medium transition-colors border-b-2 ${
              activeTab === "github_radar"
                ? "border-[#ffedd7] text-[#ffedd7]"
                : "border-transparent text-[#6c5f51] hover:text-[#ffedd7]"
            }`}
          >
            3. GitHub Radar Challenge
          </button>
        </div>

        {/* Tab 1: Simulator */}
        {activeTab === "simulator" && (
          <div className="space-y-6 flex-1">
            <div className="bg-[#18100a] p-4 rounded-[12px] border border-[#40372e]">
              <div className="text-[11px] uppercase tracking-wider text-[#6c5f51] mb-2">
                BƯỚC 1: THỬ NGHIỆM ĐỘ NÉN THAM SỐ (QUANTIZATION LEVEL)
              </div>
              <p className="text-[13px] text-[#ffedd7]/80 leading-relaxed mb-4">
                Khi đổi mức Quantization, quan sát khối chip 3D ở giữa màn hình thay đổi tần số xung nhịp dữ liệu và dung lượng VRAM cần thiết:
              </p>

              <div className="grid grid-cols-3 gap-2">
                {(["FP16", "INT8", "INT4"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setQuantMode(mode)}
                    className={`py-2.5 px-3 rounded-[8px] border text-[12px] font-medium uppercase tracking-wider transition-all ${
                      quantMode === mode
                        ? "border-[#ffedd7] bg-[#382416] text-[#ffedd7]"
                        : "border-[#40372e] bg-[#100904] text-[#6c5f51] hover:border-[#6c5f51]"
                    }`}
                  >
                    {mode} {mode === "INT4" && "🔥"}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Metrics Calculator */}
            <div className="bg-[#18100a] p-4 rounded-[12px] border border-[#40372e] space-y-3">
              <div className="text-[11px] uppercase tracking-wider text-[#6c5f51]">
                BƯỚC 2: TÍNH TOÁN VRAM CẦN THIẾT CHO MÔ HÌNH 7B
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#40372e]/60">
                <span className="text-[13px] text-[#ffedd7]/70">Dung lượng VRAM tối thiểu:</span>
                <span className="text-[16px] font-mono font-medium text-[#ffedd7]">
                  {memoryRequiredGB} GB VRAM
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#40372e]/60">
                <span className="text-[13px] text-[#ffedd7]/70">Tốc độ Token Throughput:</span>
                <span className="text-[16px] font-mono font-medium text-[#dc5000]">
                  +{throughputMultiplier} Tokens/s
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[13px] text-[#ffedd7]/70">Khả năng chạy GPU phổ thông (RTX 3060 12GB):</span>
                <span className={`text-[12px] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
                  parseFloat(memoryRequiredGB) <= 12
                    ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/60 border border-red-500/40 text-red-300"
                }`}>
                  {parseFloat(memoryRequiredGB) <= 12 ? "Khả thi ✓" : "Tràn bộ nhớ (OOM) ✗"}
                </span>
              </div>
            </div>

            {/* Quick Check Question */}
            <div className="bg-[#18100a] p-4 rounded-[12px] border border-[#40372e]">
              <div className="text-[11px] uppercase tracking-wider text-[#dc5000] mb-2 font-medium">
                CÂU HỎI KIỂM TRA BẢN CHẤT
              </div>
              <p className="text-[13px] text-[#ffedd7] leading-relaxed mb-3">
                Tại sao mô hình LLM khi sinh từng token (Inference) thường bị nghẽn ở <strong>Băng thông bộ nhớ (Memory Bandwidth)</strong> hơn là sức mạnh tính toán của chip (Compute bound)?
              </p>

              <div className="space-y-2">
                {[
                  "Vì mỗi token sinh ra phải đọc lại toàn bộ hàng tỷ tham số từ VRAM vào Tensor Core một lần.",
                  "Vì chip GPU hiện nay quá chậm để thực hiện phép cộng trừ số thực.",
                  "Vì mạng internet truyền token từ server về client bị gián đoạn.",
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuizAnswer(i)}
                    className={`w-full text-left p-3 rounded-[8px] text-[12px] border transition-all ${
                      quizAnswer === i
                        ? i === 0
                          ? "border-emerald-500 bg-emerald-950/30 text-[#ffedd7]"
                          : "border-red-500 bg-red-950/30 text-[#ffedd7]"
                        : "border-[#40372e] bg-[#100904] text-[#ffedd7]/80 hover:border-[#6c5f51]"
                    }`}
                  >
                    {opt}
                    {quizAnswer === i && i === 0 && (
                      <span className="block mt-1 text-[11px] text-emerald-400">
                        Chính xác! Cứ mỗi 1 token sinh ra, GPU phải kéo toàn bộ model weight qua bus bộ nhớ.
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Theory */}
        {activeTab === "brief" && (
          <div className="space-y-4 flex-1 text-[13px] leading-relaxed text-[#ffedd7]/85">
            <div className="bg-[#18100a] p-4 rounded-[12px] border border-[#40372e]">
              <h3 className="text-[14px] font-medium uppercase tracking-wider text-[#ffedd7] mb-2">
                1. Tại sao AI chạy trên Tensor Core thay vì CPU?
              </h3>
              <p>
                CPU được thiết kế để xử lý tuần tự với độ trễ thấp và các lệnh rẽ nhánh phức tạp (if/else). Ngược lại, trí tuệ nhân tạo hiện đại (Deep Learning & Transformers) thực chất là hàng tỷ phép nhân ma trận (General Matrix Multiply - GEMM).
              </p>
              <p className="mt-2 text-[#ffedd7]/70">
                Tensor Cores là các mạch tích hợp chuyên dụng trên silicon chỉ làm một việc duy nhất: thực hiện phép tính ma trận <code>(A × B) + C</code> trong một chu kỳ xung nhịp đơn.
              </p>
            </div>

            <div className="bg-[#18100a] p-4 rounded-[12px] border border-[#40372e]">
              <h3 className="text-[14px] font-medium uppercase tracking-wider text-[#ffedd7] mb-2">
                2. Nén mô hình (Quantization) hoạt động như thế nào?
              </h3>
              <p>
                Mỗi trọng số (Weight) ban đầu là một số thực 32-bit (FP32) hoặc 16-bit (FP16). Khi lượng tử hóa (Quantization) sang INT8 (8-bit) hoặc INT4 (4-bit), ta ánh xạ dải số liên tục vào các nấc rời rạc.
              </p>
              <p className="mt-2 text-[#dc5000]">
                Kết quả: Giảm dung lượng VRAM tới 4 lần, cho phép chạy model LLM lớn trực tiếp trên laptop cá nhân.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: GitHub Radar Challenge */}
        {activeTab === "github_radar" && (
          <div className="space-y-4 flex-1 text-[13px] leading-relaxed text-[#ffedd7]/85">
            <div className="bg-[#18100a] p-4 rounded-[12px] border border-[#40372e]">
              <div className="flex items-center space-x-2 text-[#dc5000] text-[11px] font-medium uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4" />
                <span>HOT GITHUB REPO IN THE WILD</span>
              </div>
              <h4 className="text-[15px] font-medium text-[#ffedd7] font-mono">
                ggerganov / llama.cpp
              </h4>
              <p className="text-[12px] text-[#ffedd7]/70 mt-1">
                Dự án mã nguồn mở C++ nổi tiếng nhất thế giới về việc chạy mô hình ngôn ngữ lớn (LLM) trên phần cứng thuần CPU và GPU thông thường thông qua định dạng GGUF nén 4-bit.
              </p>
              <div className="mt-3 p-3 bg-[#100904] rounded border border-[#40372e] font-mono text-[11px] text-[#ffedd7]">
                git clone https://github.com/ggerganov/llama.cpp <br />
                cmake -B build <br />
                cmake --build build --config Release
              </div>
            </div>

            <div className="p-4 rounded-[12px] border border-[#40372e] bg-[#18100a]">
              <div className="text-[11px] uppercase tracking-wider text-[#6c5f51] mb-1">
                BÀI TẬP THỰC TẾ
              </div>
              <p className="text-[13px]">
                Hãy download 1 model nén <code>Q4_K_M</code> (khoảng 4GB) về máy và kiểm tra thông lượng tokens/second mà cỗ máy của bạn đạt được.
              </p>
            </div>
          </div>
        )}

        {/* Footer Completion Button */}
        <div className="pt-4 border-t border-[#40372e] mt-6">
          <button
            onClick={handleFinish}
            disabled={quizAnswer !== 0}
            className={`w-full py-3.5 px-6 rounded-[36px] font-medium text-[13px] uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 ${
              quizAnswer === 0
                ? "bg-[#382416] text-[#ffedd7] hover:bg-[#4a301e] border border-[#ffedd7]/30 shadow-lg"
                : "bg-[#18100a] text-[#6c5f51] border border-[#40372e] cursor-not-allowed"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>COMPUTE DIE UNLOCKED INTO MATRIX</span>
              </>
            ) : (
              <>
                <span>HOÀN THÀNH THỬ THÁCH & MỞ KHÓA LINH KIỆN 3D</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          {quizAnswer !== 0 && (
            <p className="text-center text-[10px] text-[#6c5f51] uppercase tracking-wider mt-2">
              (Hãy chọn đúng đáp án câu hỏi kiểm tra ở Tab 1 để hoàn thành bài tập)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
