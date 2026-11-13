"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  Terminal,
  Copy,
  Check,
  AlertCircle,
  Zap,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  FileCode,
} from "lucide-react";
import { executePythonCode, PyodideStatus, ExecutionResult } from "@/lib/pyodide";

export interface CodePreset {
  id: string;
  title: string;
  tag: string;
  code: string;
}

export const DEFAULT_PRESETS: CodePreset[] = [
  {
    id: "week-01",
    title: "1. Python Căn Bản & Xử Lý Logic",
    tag: "TUẦN 01",
    code: `# Tuần 01: Python Căn Bản & Cấu trúc điều khiển
tasks = []

def add_task(title: str, priority: str = "MEDIUM"):
    if not title.strip():
        raise ValueError("Tiêu đề công việc không được để trống!")
    task_id = len(tasks) + 1
    task = {"id": task_id, "title": title.strip(), "priority": priority, "done": False}
    tasks.append(task)
    return task

# Thêm một số công việc mẫu
t1 = add_task("Thiết lập môi trường ảo venv", "HIGH")
t2 = add_task("Học lập trình hướng đối tượng OOP", "HIGH")
t3 = add_task("Thực hành ma trận với NumPy", "MEDIUM")

print("=== DANH SÁCH CÔNG VIỆC (TODO CLI V1) ===")
for t in tasks:
    status = "[x]" if t["done"] else "[ ]"
    print(f"#{t['id']} {status} ({t['priority']}) {t['title']}")

print(f"\\nTổng cộng: {len(tasks)} tasks đã được nạp vào bộ nhớ RAM.")
`,
  },
  {
    id: "week-02",
    title: "2. Cấu Trúc Dữ Liệu & Ghi File JSON",
    tag: "TUẦN 02",
    code: `# Tuần 02: Cấu trúc dữ liệu & Lưu trữ bền vững JSON
import json

# Dùng Dict Comprehension để tạo bảng tra cứu O(1)
raw_records = [
    {"id": 1, "model": "Llama-3-8B", "latency_ms": 18.2},
    {"id": 2, "model": "DeepSeek-V3", "latency_ms": 28.4},
    {"id": 3, "model": "Mistral-7B", "latency_ms": 21.0},
]

# Tạo chỉ mục hash table tra cứu theo model name
model_map = {r["model"]: r for r in raw_records}
print("[HASH TABLE LOOKUP O(1)]")
print("Thông số DeepSeek-V3:", model_map.get("DeepSeek-V3"))

# Lưu trữ file JSON thật trên hệ thống tệp WebAssembly (Pyodide Virtual FS)
with open("benchmark.json", mode="w", encoding="utf-8") as f:
    json.dump(raw_records, f, indent=2)

print("\\n[VIRTUAL FS] Đã ghi thành công file 'benchmark.json'.")

# Đọc ngược lại từ file để xác minh
with open("benchmark.json", mode="r", encoding="utf-8") as f:
    loaded = json.load(f)
    print(f"Đọc lại thành công {len(loaded)} bản ghi từ đĩa ảo!")
`,
  },
  {
    id: "week-03",
    title: "3. OOP Dataclass & Service Layer",
    tag: "TUẦN 03",
    code: `# Tuần 03: OOP Hiện đại với @dataclass & Service Architecture
from dataclasses import dataclass, asdict
from typing import List

@dataclass
class ModelMetric:
    name: string = ""
    parameters_b: float = 0.0
    context_window: int = 4096
    tokens_per_sec: float = 0.0

    def compute_bandwidth_gbps(self, fp_precision: int = 16) -> float:
        """Ước tính băng thông VRAM cần thiết (GB/s)."""
        bytes_per_param = fp_precision / 8
        model_size_gb = (self.parameters_b * 1e9 * bytes_per_param) / 1e9
        return model_size_gb * (self.tokens_per_sec / 100)

class BenchmarkService:
    def __init__(self):
        self._registry: List[ModelMetric] = []

    def register(self, metric: ModelMetric):
        self._registry.append(metric)

    def print_leaderboard(self):
        print(f"{'MÔ HÌNH':<16} | {'THAM SỐ':<8} | {'THÔNG LƯỢNG':<14} | {'BĂNG THÔNG ƯỚC TÍNH'}")
        print("-" * 65)
        for m in self._registry:
            bw = m.compute_bandwidth_gbps()
            print(f"{m.name:<16} | {m.parameters_b:>6.1f}B | {m.tokens_per_sec:>8.1f} t/s | {bw:>12.2f} GB/s")

# Khởi tạo Service và nạp dữ liệu
svc = BenchmarkService()
svc.register(ModelMetric("Llama-3-8B", 8.0, 8192, 142.5))
svc.register(ModelMetric("DeepSeek-V3", 671.0, 128000, 96.0))
svc.register(ModelMetric("Mistral-7B", 7.2, 32768, 138.0))

print("=== BẢNG ĐO THÔNG LƯỢNG SUY LUẬN AI (OOP PIPELINE) ===")
svc.print_leaderboard()
`,
  },
  {
    id: "week-04",
    title: "4. NumPy Matrix Math & Broadcasting",
    tag: "TUẦN 04",
    code: `# Tuần 04: NumPy Vectorization, SIMD & Broadcasting
import numpy as np

print("Đang chạy trên NumPy phiên bản:", np.__version__)

# 1. Khởi tạo Ma trận Trọng số (Batch=4, Hidden=8)
weights = np.random.randn(4, 8)
bias = np.array([0.1, 0.2, -0.1, 0.5, 0.0, -0.3, 0.8, 0.2])

print("\\n[1] Kích thước Ma trận Trọng số (Weights shape):", weights.shape)
print("[2] Kích thước Vector Bias (Bias shape):", bias.shape)

# 2. Cơ chế Broadcasting tự động dãn chiều (4, 8) + (8,) -> (4, 8)
# Phép tính diễn ra trực tiếp qua CPU SIMD registers (AVX/SSE)
linear_output = weights + bias
print("\\n[3] Kết quả Linear Layer (weights + bias):")
print(np.round(linear_output, 3))

# 3. Kỹ thuật kích hoạt hàm ReLU vector hóa: max(0, x)
relu_output = np.maximum(0, linear_output)
print("\\n[4] Sau khi áp dụng hàm kích hoạt ReLU Vectorized:")
print(np.round(relu_output, 3))

# 4. Thống kê nhanh ma trận
print("\\n[5] Thống kê ma trận:")
print(f"- Mean: {np.mean(linear_output):.4f}")
print(f"- Max:  {np.max(linear_output):.4f}")
print(f"- Min:  {np.min(linear_output):.4f}")
`,
  },
];

interface PythonWasmRunnerProps {
  initialCode?: string;
  initialPresetId?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  showPresets?: boolean;
}

export default function PythonWasmRunner({
  initialCode,
  initialPresetId = "week-01",
  className = "",
  title = "PYTHON WEBASSEMBLY RUNNER // BROWSER-NATIVE CPYTHON 3.12",
  subtitle = "Trình biên dịch và thực thi Python thuần trực tiếp trong trình duyệt thông qua WebAssembly. Không cần cài đặt, không cần backend server.",
  showPresets = true,
}: PythonWasmRunnerProps) {
  const defaultPreset = DEFAULT_PRESETS.find((p) => p.id === initialPresetId) || DEFAULT_PRESETS[0];
  const [code, setCode] = useState<string>(initialCode || defaultPreset.code);
  const [activePresetId, setActivePresetId] = useState<string>(initialPresetId);

  const [status, setStatus] = useState<PyodideStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Sẵn sàng chạy code Python.");
  const [stdout, setStdout] = useState<string>("");
  const [stderr, setStderr] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal output to bottom when new logs arrive
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stdout, stderr]);

  const handleSelectPreset = (preset: CodePreset) => {
    setActivePresetId(preset.id);
    setCode(preset.code);
    setStdout("");
    setStderr("");
    setExecutionTime(null);
    setStatus("idle");
    setStatusMessage(`Đã nạp mẫu: ${preset.title}`);
  };

  const handleResetCode = () => {
    const p = DEFAULT_PRESETS.find((item) => item.id === activePresetId) || DEFAULT_PRESETS[0];
    setCode(p.code);
    setStatusMessage("Đã khôi phục mã nguồn ban đầu.");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearTerminal = () => {
    setStdout("");
    setStderr("");
    setExecutionTime(null);
    setStatus("idle");
    setStatusMessage("Đã làm sạch màn hình Terminal.");
  };

  const handleRunCode = async () => {
    if (status === "running") return;

    setStatus("loading");
    setStdout("");
    setStderr("");
    setExecutionTime(null);
    setStatusMessage("Đang khởi tạo môi trường WebAssembly...");

    try {
      const res: ExecutionResult = await executePythonCode(code, {
        onStdout: (text) => {
          setStdout((prev) => prev + text + "\n");
        },
        onStderr: (text) => {
          setStderr((prev) => prev + text + "\n");
        },
        onStatusUpdate: (msg) => {
          setStatusMessage(msg);
        },
      });

      setExecutionTime(res.executionTimeMs);
      if (res.success) {
        setStatus("ready");
        setStatusMessage(`Thực thi thành công trong ${res.executionTimeMs}ms (Exit Code: 0)`);
      } else {
        setStatus("error");
        setStatusMessage(`Phát hiện lỗi ngoại lệ (Exit Code: 1)`);
      }
    } catch (err: any) {
      setStatus("error");
      setStderr(err?.message || String(err));
      setStatusMessage("Lỗi không mong muốn khi khởi chạy WebAssembly.");
    }
  };

  // Keyboard shortcut: Tab support & Ctrl+Enter to execute
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter or Cmd + Enter to Run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunCode();
      return;
    }

    // Tab key: Insert 4 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const newValue = value.substring(0, start) + "    " + value.substring(end);
      setCode(newValue);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  // Line numbers calculation
  const lineCount = Math.max(code.split("\n").length, 12);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div
      className={`rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
        isExpanded ? "fixed inset-4 z-50 bg-[var(--bg-canvas)]" : ""
      } ${className}`}
    >
      {/* Top Header Bar */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--border-main)] bg-[var(--surface-elevated)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="text-[12px] sm:text-[13px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-aqua)] flex items-center space-x-2">
              <span>{title}</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[var(--text-secondary)] font-mono hidden sm:block">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Runtime Status Pill */}
        <div className="flex items-center space-x-2">
          <div
            className={`px-2.5 py-1 rounded-[6px] text-[10px] font-mono uppercase tracking-wider border flex items-center space-x-1.5 transition-colors ${
              status === "loading" || status === "running"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                : status === "ready"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : status === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-[var(--bg-canvas)] border-[var(--border-main)] text-[var(--text-secondary)]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === "loading" || status === "running"
                  ? "bg-amber-400 animate-ping"
                  : status === "ready"
                  ? "bg-emerald-400"
                  : status === "error"
                  ? "bg-red-400"
                  : "bg-slate-400"
              }`}
            />
            <span>
              {status === "loading"
                ? "ĐANG TẢI WASM..."
                : status === "running"
                ? "ĐANG CHẠY..."
                : status === "ready"
                ? "EXIT 0 (OK)"
                : status === "error"
                ? "EXIT 1 (LỖI)"
                : "WASM READY"}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-[6px] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title={isExpanded ? "Thu nhỏ lại" : "Mở rộng toàn màn hình"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Preset Selector Bar (Optional) */}
      {showPresets && (
        <div className="px-3.5 py-2.5 bg-[var(--bg-canvas)] border-b border-[var(--border-main)] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-mono uppercase text-[var(--text-secondary)] mr-1 shrink-0">
              MẪU CODE:
            </span>
            {DEFAULT_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-2.5 py-1 rounded-[4px] text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activePresetId === p.id
                    ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                    : "bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                }`}
              >
                {p.tag}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--text-secondary)]">
            <span className="hidden md:inline">PHÍM TẮT:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border-main)] text-[var(--accent-aqua)]">
              Ctrl + Enter
            </kbd>
          </div>
        </div>
      )}

      {/* Main 2-Column Split View: Left (Editor) vs Right (Terminal Console) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-[460px] overflow-hidden">
        {/* ========================================================
            LEFT PANE: Code Editor with Line Numbers (7 Cols)
           ======================================================== */}
        <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-main)] bg-[#040d0e]">
          {/* Editor Sub-Header */}
          <div className="px-3.5 py-2 border-b border-[#132c2e] bg-[#021415] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <FileCode className="w-3.5 h-3.5 text-[var(--accent-aqua)]" />
              <span>main.py</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500 text-[10px]">Python 3.12 (UTF-8)</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyCode}
                className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1 cursor-pointer"
                title="Sao chép code"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">{isCopied ? "ĐÃ CHÉP" : "CHÉP"}</span>
              </button>

              <button
                onClick={handleResetCode}
                className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1 cursor-pointer ml-1"
                title="Khôi phục code ban đầu"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[10px]">RESET</span>
              </button>
            </div>
          </div>

          {/* Editor Body: Line Numbers + Textarea */}
          <div className="relative flex-1 flex overflow-hidden font-mono text-[13px] leading-[1.6]">
            {/* Line Numbers Gutter */}
            <div className="w-10 sm:w-12 py-3 select-none text-right pr-3 text-slate-600 bg-[#021011] border-r border-[#10292b] text-[12px] shrink-0 overflow-hidden">
              {lineNumbers.map((n) => (
                <div key={n} className="leading-[1.6]">
                  {n}
                </div>
              ))}
            </div>

            {/* Code Input Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="flex-1 w-full h-full p-3 bg-transparent text-[#d4f9f6] focus:outline-none resize-none font-mono selection:bg-[var(--accent-aqua)] selection:text-black leading-[1.6] overflow-y-auto no-scrollbar"
              placeholder="# Nhập mã nguồn Python tại đây..."
            />
          </div>

          {/* Editor Action Bottom Bar */}
          <div className="p-3 border-t border-[#132c2e] bg-[#021415] flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[280px]">
              {statusMessage}
            </span>

            <button
              onClick={handleRunCode}
              disabled={status === "loading" || status === "running"}
              className="h-[38px] px-5 rounded-[6px] bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-mono font-semibold text-[11px] uppercase tracking-wider transition-all flex items-center space-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>
                {status === "loading"
                  ? "ĐANG TẢI WASM..."
                  : status === "running"
                  ? "ĐANG CHẠY..."
                  : "CHẠY PYTHON (RUN)"}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT PANE: Live Terminal Execution Console (5 Cols)
           ======================================================== */}
        <div className="lg:col-span-5 flex flex-col bg-[#011415] overflow-hidden">
          {/* Terminal Console Header */}
          <div className="px-3.5 py-2 border-b border-[#102b2d] bg-[#010e0f] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[#a5f3fc]">TERMINAL STDOUT / STDERR</span>
            </div>

            <div className="flex items-center space-x-2 text-[10px]">
              {executionTime !== null && (
                <span className="text-emerald-400 font-semibold">{executionTime} ms</span>
              )}
              <button
                onClick={handleClearTerminal}
                className="hover:text-red-400 transition-colors flex items-center space-x-1 cursor-pointer"
                title="Xóa log console"
              >
                <Trash2 className="w-3 h-3" />
                <span>XÓA</span>
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-3.5 sm:p-4 font-mono text-[12px] leading-[1.6] overflow-y-auto space-y-2 select-text no-scrollbar">
            {/* System initial banner */}
            <div className="text-slate-500 pb-1 border-b border-slate-800 text-[11px]">
              <div>Python 3.12 (CPython WebAssembly / Pyodide Core)</div>
              <div>Type &quot;help&quot;, &quot;copyright&quot; or &quot;credits&quot; for more information.</div>
            </div>

            {/* Empty state prompt */}
            {!stdout && !stderr && status === "idle" && (
              <div className="text-slate-600 py-6 text-center space-y-2">
                <Terminal className="w-8 h-8 mx-auto opacity-40 text-[var(--accent-aqua)]" />
                <p className="text-[11px]">Bấm nút &quot;CHẠY PYTHON (RUN)&quot; hoặc nhấn Ctrl + Enter để thực thi mã nguồn thật trên WebAssembly.</p>
              </div>
            )}

            {/* Running state spinner */}
            {(status === "loading" || status === "running") && (
              <div className="flex items-center space-x-2 text-amber-300 py-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Standard Output (STDOUT) */}
            {stdout && (
              <div className="text-emerald-300 whitespace-pre-wrap font-mono">
                {stdout}
              </div>
            )}

            {/* Standard Error & Traceback (STDERR) */}
            {stderr && (
              <div className="p-3 rounded-[6px] bg-red-950/40 border border-red-800/40 text-red-300 whitespace-pre-wrap font-mono text-[11px] space-y-1">
                <div className="font-bold flex items-center space-x-1 text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>PYTHON TRACEBACK / EXCEPTION:</span>
                </div>
                <div>{stderr}</div>
              </div>
            )}

            <div ref={consoleBottomRef} />
          </div>

          {/* Terminal Footer Info */}
          <div className="px-3.5 py-2 border-t border-[#102b2d] bg-[#010e0f] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>CLIENT-SIDE SANDBOX // NO DATA SENT TO SERVER</span>
            <span className="text-[var(--accent-aqua)]">WEBASSEMBLY 64-BIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
