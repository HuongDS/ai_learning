"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Terminal,
  BookOpen,
  Sun,
  Moon,
  ArrowRight,
  Code2,
  FileJson,
  FileSpreadsheet,
  Check,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Layers,
  Database,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface TodoItemV2 {
  id: number;
  title: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
  created_at: string;
}

export default function WeekTwoLessonPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Todo CLI v2 Simulator State
  const [todos, setTodos] = useState<TodoItemV2[]>([
    {
      id: 1,
      title: "Tách module storage.py đọc/ghi file JSON",
      priority: "HIGH",
      completed: true,
      created_at: "2026-11-09T08:30:00Z",
    },
    {
      id: 2,
      title: "Bổ sung Type Hints (list[dict[str, Any]]) cho toàn bộ hàm",
      priority: "HIGH",
      completed: true,
      created_at: "2026-11-09T09:15:00Z",
    },
    {
      id: 3,
      title: "Viết hàm export_to_csv() dùng csv.DictWriter",
      priority: "MEDIUM",
      completed: false,
      created_at: "2026-11-09T10:00:00Z",
    },
  ]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputPriority, setInputPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [activeInspectorTab, setActiveInspectorTab] = useState<"ui" | "json" | "csv">("ui");
  const [cliOutput, setCliOutput] = useState<string>(
    "[INFO] Đã nạp 3 bản ghi từ 'data/tasks.json' (Encoding: UTF-8)."
  );
  const [cliError, setCliError] = useState<string | null>(null);
  const [isJsonCorrupted, setIsJsonCorrupted] = useState<boolean>(false);

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
      if (completed.includes(2)) {
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

  // Handlers for Todo CLI v2 Simulator
  const handleAddTodo = () => {
    setCliError(null);
    if (isJsonCorrupted) {
      setCliError(
        "json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 4 column 2. Hãy bấm 'Khôi phục JSON' trước!"
      );
      return;
    }
    if (!inputTitle.trim()) {
      setCliError("ValueError: Tiêu đề công việc không được để trống!");
      setCliOutput("[ERROR] ValueError raised in add_task(): Empty title string.");
      return;
    }
    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo: TodoItemV2 = {
      id: newId,
      title: inputTitle.trim(),
      priority: inputPriority,
      completed: false,
      created_at: new Date().toISOString().split(".")[0] + "Z",
    };
    const updated = [...todos, newTodo];
    setTodos(updated);
    setInputTitle("");
    setCliOutput(
      `[STORAGE] json.dump() -> Đã lưu task #${newId} [${newTodo.priority}] vào 'data/tasks.json' (${updated.length} items).`
    );
  };

  const handleToggleTodo = (id: number) => {
    if (isJsonCorrupted) return;
    setCliError(null);
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          setCliOutput(
            `[STORAGE] Cập nhật id=${id} completed=${next} -> Đã đồng bộ xuống file 'data/tasks.json'.`
          );
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const handleDeleteTodo = (id: number) => {
    if (isJsonCorrupted) return;
    setCliError(null);
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    setCliOutput(`[STORAGE] Đã xóa id=${id} và ghi đè file 'data/tasks.json' thành công.`);
  };

  const handleSimulateCorruptJson = () => {
    setIsJsonCorrupted(true);
    setActiveInspectorTab("json");
    setCliError(
      "json.decoder.JSONDecodeError: Unterminated string starting at: line 3 column 14 (char 48) — Đã kích hoạt nhánh except json.JSONDecodeError!"
    );
    setCliOutput(
      "[CRITICAL] Phát hiện file 'data/tasks.json' bị hỏng cú pháp! Hệ thống đã chặn crash và chờ lệnh khôi phục."
    );
  };

  const handleRecoverJson = () => {
    setIsJsonCorrupted(false);
    setCliError(null);
    setCliOutput(
      "[RECOVERY] Đã khôi phục cấu trúc JSON hợp lệ từ bộ nhớ đệm an toàn (Fallback Empty/Backup State)."
    );
  };

  // Generate CSV Preview string
  const csvContent = [
    "id,title,priority,completed,created_at",
    ...todos.map(
      (t) => `${t.id},"${t.title.replace(/"/g, '""')}",${t.priority},${t.completed},${t.created_at}`
    ),
  ].join("\n");

  // Quiz validation:
  // Q1: 1 (List mặc định chỉ khởi tạo 1 lần duy nhất khi định nghĩa hàm, nên bị dùng chung giữa các lần gọi)
  // Q2: 0 (O(1) trung bình nhờ bảng băm Hash Table, so với O(n) khi duyệt tuần tự trên list)
  // Q3: 2 (Bắt cụ thể FileNotFoundError và json.JSONDecodeError, trả về danh sách rỗng hoặc khôi phục an toàn)
  const isQuizCorrect =
    quizAnswers.q1 === 1 && quizAnswers.q2 === 0 && quizAnswers.q3 === 2;

  const handleCompleteWeekTwo = () => {
    if (!isQuizCorrect) return;
    setIsUnlocked(true);
    setShowCelebration(true);

    try {
      const completed = JSON.parse(localStorage.getItem("oryzo_completed_lessons") || "[]");
      if (!completed.includes(2)) {
        completed.push(2);
        localStorage.setItem("oryzo_completed_lessons", JSON.stringify(completed));
      }
      const artifacts = JSON.parse(localStorage.getItem("oryzo_unlocked_artifacts") || "[]");
      if (!artifacts.includes("data_persistence_badge")) {
        artifacts.push("data_persistence_badge");
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
            href="/lesson/week-01"
            className="hidden sm:flex items-center space-x-1 text-[11px] font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-3 rounded-[22.5px] border border-[var(--border-main)] shrink-0"
          >
            <span>&larr; TUẦN 01</span>
          </Link>

          <div className="hidden md:block text-[11px] font-mono uppercase tracking-widest text-[var(--accent-aqua)] border-l border-[var(--border-main)] pl-4 truncate">
            TUẦN 02 // CẤU TRÚC DỮ LIỆU, HÀM, FILE I/O &amp; EXCEPTION
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
            <span>THÁNG 01 — PYTHON VÀ DỮ LIỆU // TUẦN 02 / 26</span>
          </div>

          <h1 className="text-[26px] sm:text-[38px] md:text-[42px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.08]">
            CẤU TRÚC DỮ LIỆU, TYPE HINTS, FILE I/O &amp; DỰ ÁN TODO CLI V2
          </h1>

          <p className="text-[16px] sm:text-[19px] font-normal leading-relaxed text-[var(--text-secondary)] pt-1">
            Ở Tuần 01, mọi công việc trong Todo CLI đều biến mất ngay khi bạn tắt cửa sổ Terminal vì chúng chỉ nằm trên RAM. Tuần này, chúng ta sẽ làm chủ hiệu năng của các cấu trúc dữ liệu cốt lõi, áp dụng <strong>Type Hints</strong> chuẩn công nghiệp và xây dựng tầng lưu trữ bền vững bằng <strong>JSON &amp; CSV</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] font-mono uppercase text-[var(--text-secondary)]">
            <span>THỜI LƯỢNG: 6–8 GIỜ</span>
            <span>•</span>
            <span>TRỌNG TÂM: DICT HASH TABLE, CONTEXT MANAGER, JSON/CSV</span>
            <span>•</span>
            <span className="text-[var(--accent-aqua)] font-medium">SANDBOX TƯƠNG TÁC CUỐI TRANG &darr;</span>
          </div>
        </section>

        {/* PART 1: Data Structures & Algorithmic Complexity */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Database className="w-4 h-4" />
            <span>PHẦN 1 // CẤU TRÚC DỮ LIỆU DƯỚI GÓC NHÌN BỘ NHỚ &amp; BIG-O</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            1. List, Tuple, Dict, Set và Sự Khác Biệt Về Hiệu Năng
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Khi xử lý hàng trăm nghìn mẫu dữ liệu huấn luyện (dataset records) hoặc quản lý lịch sử hội thoại của LLM, việc chọn đúng cấu trúc dữ liệu quyết định trực tiếp đến tốc độ phản hồi của hệ thống:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
            <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <div className="font-mono font-semibold text-[var(--accent-aqua)] flex items-center justify-between">
                <span>list (Mảng động con trỏ)</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Lookup: O(n)</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Có thứ tự, có thể thay đổi (Mutable). Truy cập theo chỉ số <code>tasks[i]</code> cực nhanh $O(1)$, nhưng kiểm tra sự tồn tại <code>x in list</code> phải duyệt tuần tự $O(n)$.
              </p>
            </div>

            <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <div className="font-mono font-semibold text-[var(--accent-aqua)] flex items-center justify-between">
                <span>tuple (Bộ bất biến)</span>
                <span className="text-[11px] text-[var(--text-secondary)]">Immutable</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Cố định sau khi khởi tạo, tiêu tốn ít bộ nhớ hơn <code>list</code> và có thể dùng làm khóa (key) cho <code>dict</code>. Rất hay dùng để biểu diễn kích thước chiều Tensor (ví dụ: <code>shape = (32, 512, 768)</code>).
              </p>
            </div>

            <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <div className="font-mono font-semibold text-[var(--accent-aqua)] flex items-center justify-between">
                <span>dict (Bảng băm Hash Table)</span>
                <span className="text-[11px] text-emerald-400">Lookup: O(1)</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Lưu trữ cặp <code>key: value</code>. Nhờ cơ chế băm (Hash), việc tra cứu <code>task_map[task_id]</code> có độ phức tạp $O(1)$ bất kể từ điển có 10 hay 10 triệu phần tử.
              </p>
            </div>

            <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5">
              <div className="font-mono font-semibold text-[var(--accent-aqua)] flex items-center justify-between">
                <span>set (Tập hợp không trùng lặp)</span>
                <span className="text-[11px] text-emerald-400">Lookup: O(1)</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Cũng dựa trên Hash Table. Dùng để khử trùng lặp (Deduplication) danh sách tài liệu RAG hoặc kiểm tra từ vựng (Vocabulary lookup) với tốc độ tức thời $O(1)$.
              </p>
            </div>
          </div>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto space-y-2">
            <div className="text-[var(--accent-aqua)]"># Slicing &amp; List/Dict Comprehension chuẩn Pythonic:</div>
            <pre className="text-emerald-300">{`# 1. Lọc ra các task chưa hoàn thành có độ ưu tiên HIGH bằng List Comprehension
urgent_tasks = [t for t in tasks if not t["completed"] and t["priority"] == "HIGH"]

# 2. Tạo bảng tra cứu nhanh O(1) theo ID bằng Dict Comprehension
task_by_id = {t["id"]: t for t in tasks}

# 3. Slicing: Lấy 5 task mới nhất đảo ngược thứ tự
latest_five = tasks[-5:][::-1]`}</pre>
          </div>
        </section>

        {/* PART 2: Functions, Mutable Default Trap & Type Hints */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Code2 className="w-4 h-4" />
            <span>PHẦN 2 // THIẾT KẾ HÀM, BẪY THAM SỐ MẶC ĐỊNH &amp; TYPE HINTS</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            2. Cạm Bẫy &ldquo;Mutable Default Argument&rdquo; &amp; Chuẩn Type Hints
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Một trong những lỗi kinh điển nhất khiến cả các lập trình viên có kinh nghiệm cũng mắc phải khi viết Python là đặt một <code>list</code> hoặc <code>dict</code> làm giá trị mặc định trong hàm:
          </p>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto">
            <pre>{`# ❌ SAI LẦM KINH ĐIỂN: List mặc định chỉ được tạo ĐÚNG 1 LẦN khi định nghĩa hàm!
def add_tag_wrong(tag: str, tags: list[str] = []) -> list[str]:
    tags.append(tag)
    return tags

# Lần gọi 1: add_tag_wrong("ai") -> ["ai"]
# Lần gọi 2: add_tag_wrong("llm") -> ["ai", "llm"]  <-- Bị dính dữ liệu từ lần gọi trước!

# ✅ CÁCH VIẾT CHUẨN CÔNG NGHIỆP: Dùng None làm mặc định
def add_tag_safe(tag: str, tags: list[str] | None = None) -> list[str]:
    if tags is None:
        tags = []
    tags.append(tag)
    return tags`}</pre>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed pt-2">
            <strong>Tại sao Kỹ sư AI bắt buộc phải dùng Type Hints?</strong> Khi làm việc với các hệ thống Agent, Tool Calling và Structured Outputs (như Pydantic hay FastAPI), Type Hints không chỉ giúp IDE bắt lỗi tĩnh mà còn được dùng để tự động sinh JSON Schema cho mô hình ngôn ngữ lớn (LLM) hiểu cách gọi hàm.
          </p>
        </section>

        {/* PART 3: Context Manager, JSON/CSV & Exception Handling */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <FileJson className="w-4 h-4" />
            <span>PHẦN 3 // CONTEXT MANAGER (WITH), JSON/CSV I/O &amp; BẮT NGOẠI LỆ</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            3. Lưu Trữ Bền Vững An Toàn Với Khối Lệnh <code>with open()</code>
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Tuyệt đối không mở file bằng <code>f = open(...)</code> mà quên đóng. Hãy luôn sử dụng Context Manager <code>with open(...) as f:</code> để Python đảm bảo giải phóng File Descriptor ngay cả khi có ngoại lệ xảy ra giữa chừng.
          </p>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto">
            <pre className="text-emerald-300">{`# storage.py - Tầng đọc/ghi dữ liệu bền vững với Type Hints & Exception Handling
import csv
import json
from pathlib import Path
from typing import Any

DATA_FILE = Path("data/tasks.json")

def load_tasks(filepath: Path = DATA_FILE) -> list[dict[str, Any]]:
    """Đọc danh sách công việc từ file JSON một cách an toàn."""
    if not filepath.exists():
        return []
    try:
        with open(filepath, mode="r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except json.JSONDecodeError as err:
        print(f"[CẢNH BÁO] File JSON bị lỗi cú pháp ({err}). Khởi tạo danh sách rỗng.")
        return []
    except OSError as err:
        print(f"[LỖI I/O] Không thể đọc file: {err}")
        return []

def save_tasks(tasks: list[dict[str, Any]], filepath: Path = DATA_FILE) -> bool:
    """Lưu danh sách công việc xuống file JSON với định dạng UTF-8."""
    try:
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, mode="w", encoding="utf-8") as f:
            json.dump(tasks, f, indent=2, ensure_ascii=False)
        return True
    except OSError as err:
        print(f"[LỖI I/O] Không thể ghi file: {err}")
        return False

def export_tasks_csv(tasks: list[dict[str, Any]], csv_path: Path) -> None:
    """Xuất danh sách task ra định dạng bảng CSV để phân tích dữ liệu."""
    fieldnames = ["id", "title", "priority", "completed", "created_at"]
    with open(csv_path, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(tasks)`}</pre>
          </div>
        </section>

        {/* PART 4: Interactive Todo CLI v2 Sandbox */}
        <section className="space-y-6 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Play className="w-4 h-4" />
            <span>PHẦN 4 // PHÒNG THÍ NGHIỆM TƯƠNG TÁC: TODO CLI V2 + JSON/CSV INSPECTOR</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            4. Thực Nghiệm Lưu Trữ JSON, Xuất CSV &amp; Giả Lập Bắt Lỗi Hỏng File
          </h2>

          <div className="p-5 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
            {/* Top Bar with View Mode Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-main)] pb-3">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setActiveInspectorTab("ui")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeInspectorTab === "ui"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  1. CLI Task Manager
                </button>
                <button
                  onClick={() => setActiveInspectorTab("json")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1 ${
                    activeInspectorTab === "json"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>2. tasks.json</span>
                </button>
                <button
                  onClick={() => setActiveInspectorTab("csv")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1 ${
                    activeInspectorTab === "csv"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>3. export.csv</span>
                </button>
              </div>

              {/* Fault Injection Button */}
              <div>
                {!isJsonCorrupted ? (
                  <button
                    onClick={handleSimulateCorruptJson}
                    className="px-2.5 py-1 rounded-[6px] border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center space-x-1 cursor-pointer"
                    title="Mô phỏng trường hợp file tasks.json bị sửa hỏng cú pháp"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>GIẢ LẬP LỖI HỎNG FILE JSON</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRecoverJson}
                    className="px-2.5 py-1 rounded-[6px] border border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-mono uppercase tracking-wider transition-colors flex items-center space-x-1 cursor-pointer animate-pulse"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>KHÔI PHỤC JSON (RECOVERY)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Add task input bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nhập công việc mới (sẽ tự động ghi vào tasks.json)..."
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                className="flex-1 px-3.5 py-2 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-aqua)] font-mono"
              />
              <select
                value={inputPriority}
                onChange={(e) => setInputPriority(e.target.value as "HIGH" | "MEDIUM" | "LOW")}
                className="px-3 py-2 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-aqua)]"
              >
                <option value="HIGH">ƯU TIÊN: HIGH</option>
                <option value="MEDIUM">ƯU TIÊN: MEDIUM</option>
                <option value="LOW">ƯU TIÊN: LOW</option>
              </select>
              <button
                onClick={handleAddTodo}
                className="h-[38px] px-5 rounded-[6px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-mono uppercase font-medium tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                + GHI VÀO JSON
              </button>
            </div>

            {cliError && (
              <div className="text-[11px] font-mono text-red-400 bg-red-950/30 p-3 rounded-[6px] border border-red-800/40 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{cliError}</span>
              </div>
            )}

            {/* Tab 1: Interactive Task List */}
            {activeInspectorTab === "ui" && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase flex items-center justify-between">
                  <span>BẢN GHI TRONG BỘ NHỚ ({todos.length} RECORDS):</span>
                  <span>NHẤP VÀO TASK ĐỂ ĐỔI TRẠNG THÁI</span>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                  {todos.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-2.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] font-mono"
                    >
                      <div
                        onClick={() => handleToggleTodo(t.id)}
                        className="flex items-center space-x-2.5 cursor-pointer select-none flex-1 truncate"
                      >
                        <div
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                            t.completed
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-[var(--border-main)]"
                          }`}
                        >
                          {t.completed && <Check className="w-3 h-3" />}
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-semibold shrink-0 ${
                            t.priority === "HIGH"
                              ? "bg-red-500/15 text-red-400 border border-red-500/30"
                              : t.priority === "MEDIUM"
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                              : "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                          }`}
                        >
                          {t.priority}
                        </span>
                        <span
                          className={`truncate ${
                            t.completed
                              ? "line-through text-[var(--text-secondary)]"
                              : "text-[var(--text-primary)]"
                          }`}
                        >
                          #{t.id}. {t.title}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteTodo(t.id)}
                        className="text-red-400 hover:text-red-300 text-[10px] uppercase font-mono px-2 py-0.5 cursor-pointer shrink-0"
                      >
                        XÓA
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Live JSON File Inspector */}
            {activeInspectorTab === "json" && (
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[var(--accent-aqua)] uppercase flex items-center justify-between">
                  <span>FILE PREVIEW: data/tasks.json (UTF-8)</span>
                  <span>{isJsonCorrupted ? "STATUS: CORRUPTED ❌" : "STATUS: VALID JSON ✓"}</span>
                </div>
                <pre className="p-3.5 rounded-[8px] bg-[#081214] border border-[#143338] text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-56">
                  {isJsonCorrupted
                    ? `[\n  {\n    "id": 1,\n    "title": "File bị ngắt ngang đột ngột khi đang ghi...  <-- THIẾU DẤU NGOẶC KÉP!\n    "priority": HIGH\n`
                    : JSON.stringify(todos, null, 2)}
                </pre>
              </div>
            )}

            {/* Tab 3: Live CSV File Inspector */}
            {activeInspectorTab === "csv" && (
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[var(--accent-aqua)] uppercase flex items-center justify-between">
                  <span>FILE PREVIEW: exports/tasks_export.csv</span>
                  <span>GENERATED BY csv.DictWriter</span>
                </div>
                <pre className="p-3.5 rounded-[8px] bg-[#081214] border border-[#143338] text-[11px] font-mono text-sky-300 overflow-x-auto max-h-56">
                  {csvContent}
                </pre>
              </div>
            )}

            {/* Terminal Log */}
            <div className="p-3 rounded-[6px] bg-[#081214] text-[#e2fbf9] font-mono text-[11px] border border-[#143338]">
              <span className="text-[var(--accent-aqua)]">&gt;</span> {cliOutput}
            </div>
          </div>

          {/* Quiz Section */}
          <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-5">
            <div className="flex items-center space-x-2 text-[12px] font-mono text-[var(--accent-aqua)] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>BÀI KIỂM ĐỊNH NĂNG LỰC TUẦN 02 (3 CÂU HỎI)</span>
            </div>

            {/* Q1 */}
            <div className="space-y-2 text-[13px]">
              <div className="text-[var(--text-primary)] font-medium">
                1. Tại sao không nên viết hàm Python có tham số mặc định là một list rỗng như{" "}
                <code>def add_item(item, bucket=[]):</code>?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Vì Python không cho phép truyền list vào trong hàm",
                  "Vì list mặc định chỉ được khởi tạo 1 lần duy nhất khi định nghĩa hàm, khiến mọi lần gọi hàm sau đó dùng chung cùng một đối tượng list trong bộ nhớ",
                  "Vì list sẽ tự động bị xóa ngay khi hàm chạy xong",
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
                2. Khi cần tra cứu một công việc theo ID trong tập dữ liệu 1,000,000 bản ghi, độ phức tạp thời gian trung bình khi tra cứu bằng khóa trên <code>dict</code> là bao nhiêu so với duyệt tuần tự trên <code>list</code>?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] font-mono">
                {[
                  "O(1) trên dict nhờ Hash Table, so với O(n) trên list",
                  "O(n) trên cả dict và list",
                  "O(log n) trên dict, so với O(1) trên list",
                  "Hai cấu trúc có tốc độ tra cứu hoàn toàn giống nhau",
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
                3. Đâu là cách xử lý chuẩn công nghiệp khi đọc file <code>tasks.json</code> để chương trình không bao giờ bị crash nếu file chưa tồn tại hoặc bị hỏng cú pháp JSON?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Không cần try/except vì json.load() tự động sửa mọi lỗi cú pháp",
                  "Dùng lệnhf = open('tasks.json') mà không cần đóng file",
                  "Sử dụng 'with open(...)' kết hợp bắt cụ thể ngoại lệ FileNotFoundError và json.JSONDecodeError để trả về trạng thái mặc định an toàn",
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
                    ✓ Xuất sắc! Bạn đã trả lời chính xác cả 3 câu hỏi kiểm định Tuần 02.
                  </span>
                ) : (
                  <span>Vui lòng chọn đúng cả 3 câu hỏi để hoàn thành Tuần 02.</span>
                )}
              </div>

              <button
                disabled={!isQuizCorrect}
                onClick={handleCompleteWeekTwo}
                className={`h-[42px] px-6 rounded-[22.5px] font-mono text-[11px] uppercase tracking-wider font-medium transition-all flex items-center space-x-2 ${
                  isQuizCorrect
                    ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] hover:bg-[var(--btn-solid-hover)] cursor-pointer shadow-md"
                    : "opacity-40 cursor-not-allowed border border-[var(--border-main)] text-[var(--text-secondary)]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-aqua)]" />
                <span>
                  {isUnlocked ? "ĐÃ HOÀN THÀNH TUẦN 02 ✓" : "HOÀN THÀNH BÀI HỌC TUẦN 02"}
                </span>
              </button>
            </div>

            {showCelebration && (
              <div className="p-4 rounded-[8px] bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-[12px] font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Chúc mừng! Bạn đã làm chủ Cấu trúc dữ liệu, Type Hints &amp; Lưu trữ JSON/CSV. Tiến độ Tuần 02 đã được ghi nhận và mở khóa Tuần 03!
                  </span>
                </div>
                <Link
                  href="/lesson/week-03"
                  className="px-4 py-1.5 rounded-[6px] bg-emerald-500 text-black font-semibold text-[11px] uppercase tracking-wider hover:bg-emerald-400 transition-colors shrink-0"
                >
                  HỌC TIẾP TUẦN 03 &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[var(--border-main)] py-6 px-4 sm:px-8 text-center text-[11px] font-mono text-[var(--text-secondary)]">
        <div>AUROS AI LAB // TUẦN 02 — CẤU TRÚC DỮ LIỆU, HÀM, FILE I/O &amp; EXCEPTION</div>
      </footer>
    </div>
  );
}
