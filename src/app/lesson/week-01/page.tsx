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
  FolderGit2,
  Check,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import PythonWasmRunner from "@/components/PythonWasmRunner";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export default function WeekOneLessonPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState<"wasm" | "simulator">("wasm");

  // Interactive Todo CLI Simulator State
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: "Cài đặt Python 3.11+ và VS Code", completed: true },
    { id: 2, title: "Tạo virtualenv: python -m venv venv", completed: true },
    { id: 3, title: "Viết Todo CLI v1 và push lên GitHub", completed: false },
  ]);
  const [inputTitle, setInputTitle] = useState("");
  const [cliOutput, setCliOutput] = useState<string>("Hệ thống sẵn sàng. Nhập lệnh hoặc thao tác bên dưới.");
  const [cliError, setCliError] = useState<string | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ q1: number | null; q2: number | null }>({
    q1: null,
    q2: null,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Check if Week 1 was completed previously
    try {
      const completed = JSON.parse(localStorage.getItem("oryzo_completed_lessons") || "[]");
      if (completed.includes(1)) {
        setIsUnlocked(true);
      }
    } catch (e) {}

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Todo CLI Simulator handlers
  const handleAddTodo = () => {
    setCliError(null);
    if (!inputTitle.trim()) {
      setCliError("Lỗi: Không được để trống tên công việc! (Bắt lỗi đầu vào rỗng)");
      setCliOutput("[ERROR] ValueError: Title cannot be empty.");
      return;
    }
    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo: TodoItem = { id: newId, title: inputTitle.trim(), completed: false };
    setTodos([...todos, newTodo]);
    setInputTitle("");
    setCliOutput(`[SUCCESS] Đã thêm task #${newId}: "${newTodo.title}"`);
  };

  const handleToggleTodo = (id: number) => {
    setCliError(null);
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          setCliOutput(`[UPDATED] Task #${id} -> ${next ? "Đã hoàn thành [DONE]" : "Chưa hoàn thành [TODO]"}`);
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const handleDeleteTodo = (id: number) => {
    setCliError(null);
    setTodos(todos.filter((t) => t.id !== id));
    setCliOutput(`[DELETED] Đã xóa task #${id} khỏi danh sách.`);
  };

  // Completion check
  const isQuizCorrect = quizAnswers.q1 === 1 && quizAnswers.q2 === 0;

  const handleCompleteWeekOne = () => {
    if (!isQuizCorrect) return;
    setIsUnlocked(true);
    setShowCelebration(true);

    try {
      const completed = JSON.parse(localStorage.getItem("oryzo_completed_lessons") || "[]");
      if (!completed.includes(1)) {
        completed.push(1);
        localStorage.setItem("oryzo_completed_lessons", JSON.stringify(completed));
      }
      const artifacts = JSON.parse(localStorage.getItem("oryzo_unlocked_artifacts") || "[]");
      if (!artifacts.includes("python_foundations_badge")) {
        artifacts.push("python_foundations_badge");
        localStorage.setItem("oryzo_unlocked_artifacts", JSON.stringify(artifacts));
      }
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-main)] px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between">
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
            href="/roadmap"
            className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--accent-ember)] hover:text-[var(--text-primary)] transition-colors py-1 px-3 rounded-[22.5px] border border-[var(--border-main)] shrink-0"
          >
            <span>LỘ TRÌNH 26 TUẦN</span>
          </Link>

          <div className="hidden md:block text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] border-l border-[var(--border-main)] pl-4 truncate">
            TUẦN 01 // PYTHON CĂN BẢN & MÔI TRƯỜNG
          </div>
        </div>

        {/* Reading progress & Theme Switcher */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-[var(--text-secondary)]">
            <span>TIẾN ĐỘ:</span>
            <span className="text-[var(--text-primary)] font-medium">{Math.round(scrollProgress)}%</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors shrink-0"
            title="Chuyển chế độ Sáng / Tối"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>

        {/* Progress bar hairline */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent-ember)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <section className="space-y-4 border-b border-[var(--border-main)] pb-8">
          <div className="flex items-center space-x-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--accent-ember)] font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)] animate-pulse" />
            <span>THÁNG 01 — PYTHON VÀ DỮ LIỆU // TUẦN 01 / 26</span>
          </div>

          <h1 className="text-[26px] sm:text-[38px] md:text-[44px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.08] sm:leading-[1.05]">
            PYTHON CĂN BẢN, MÔI TRƯỜNG VENV & DỰ ÁN TODO CLI V1
          </h1>

          <p className="text-[17px] sm:text-[20px] font-normal leading-relaxed text-[var(--text-secondary)] pt-1">
            Dành cho Kỹ sư Phần mềm: Bạn không cần học lập trình lại từ con số 0. Mục tiêu của tuần này là làm quen với triết lý thông dịch của Python, thiết lập môi trường ảo <code>venv</code> chuẩn công nghiệp và hoàn thành sản phẩm đầu tay <strong>Todo CLI v1</strong> có bắt lỗi biên vững chắc.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] font-mono uppercase text-[var(--text-secondary)]">
            <span>THỜI LƯỢNG: 5–7 GIỜ</span>
            <span>•</span>
            <span>TÀI LIỆU: THE PYTHON TUTORIAL</span>
            <span>•</span>
            <span className="text-[var(--accent-ember)] font-medium">BÀI TẬP CUỐI TRANG ↓</span>
          </div>
        </section>

        {/* PART 1: Python Mindset */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)]">
            <Code2 className="w-4 h-4" />
            <span>PHẦN 1 // TƯ DUY LẬP TRÌNH PYTHON CHO SOFTWARE ENGINEER</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            1. Python Thông Dịch Hoạt Động Như Thế Nào?
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Khác với ngôn ngữ biên dịch sang mã máy thuần (như C, C++, Rust, Go) hay JIT qua JVM (.NET/Java), mã nguồn Python (<code>.py</code>) được <strong>Python Interpreter</strong> biên dịch trước sang dạng mã trung gian gọi là <strong>Bytecode</strong> (lưu trong <code>__pycache__/*.pyc</code>), sau đó chạy trên máy ảo <strong>Python Virtual Machine (PVM)</strong>.
          </p>

          <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] font-mono text-[12px] space-y-2">
            <div className="text-[var(--text-primary)] font-semibold">Tóm tắt luồng thực thi:</div>
            <div className="text-[var(--accent-ember)]">
              source.py &rarr; [Compiler] &rarr; source.pyc (Bytecode) &rarr; [PVM + CPython runtime] &rarr; OS CPU
            </div>
          </div>

          <div className="space-y-2 text-[15px] text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong>Dynamic Typing nhưng Strongly Typed:</strong> Trong Python, bạn không cần khai báo kiểu biến (<code>x = 10</code>), nhưng kiểu dữ liệu gắn liền với giá trị trong bộ nhớ chứ không phải tên biến. Phép cộng chuỗi và số nguyên (<code>"5" + 5</code>) sẽ ném <code>TypeError</code> ngay lập tức chứ không tự ép kiểu ngầm như JavaScript.
            </p>
          </div>
        </section>

        {/* PART 2: Virtual Environment */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)]">
            <FolderGit2 className="w-4 h-4" />
            <span>PHẦN 2 // QUẢN TRỊ MÔI TRƯỜNG CÔ LẬP VỚI VENV & PIP</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            2. Tại Sao Tuyệt Đối Không Cài Gói Toàn Cục (Global)?
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Trong thế giới AI Engineering, xung đột phiên bản thư viện là nguyên nhân gây lỗi hàng đầu. Ví dụ: Dự án RAG cần <code>pydantic==2.8</code>, trong khi một mô hình cũ lại đòi hỏi <code>pydantic==1.10</code>. Nếu cài đặt toàn cục vào máy, hai dự án sẽ xung đột và làm hỏng môi trường máy chủ.
          </p>

          <div className="bg-[#0c0805] p-4 sm:p-5 rounded-[8px] border border-[#2a1c12] font-mono text-[12px] text-[#ffedd7] space-y-3">
            <div className="text-[var(--text-secondary)]"># 1. Khởi tạo virtual environment tên &apos;venv&apos;:</div>
            <div className="text-emerald-400">python -m venv venv</div>

            <div className="text-[var(--text-secondary)] pt-1"># 2. Kích hoạt môi trường (Windows PowerShell):</div>
            <div className="text-emerald-400">.\venv\Scripts\Activate.ps1</div>
            <div className="text-[var(--text-secondary)]"># (Trên Linux / macOS: source venv/bin/activate)</div>

            <div className="text-[var(--text-secondary)] pt-1"># 3. Quản lý thư viện phụ thuộc:</div>
            <div className="text-emerald-400">pip install requests</div>
            <div className="text-emerald-400">pip freeze &gt; requirements.txt</div>
            <div className="text-emerald-400">pip install -r requirements.txt</div>
          </div>
        </section>

        {/* PART 3: Traceback & Syntax */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)]">
            <AlertCircle className="w-4 h-4" />
            <span>PHẦN 3 // ĐỌC TRACEBACK & BẮT LỖI BIÊN CHUẨN CÔNG NGHIỆP</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            3. Đọc Hiểu Traceback và Xử Lý Ngoại Lệ
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Traceback trong Python đọc từ <strong>trên xuống dưới</strong> (cuộc gọi ban đầu ở trên cùng, dòng gây crash thực tế ở dòng cuối cùng). Các lỗi phổ biến nhất bạn sẽ gặp:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] font-mono">
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-red-400 font-semibold">IndexError:</span> Truy cập chỉ số index vượt quá độ dài mảng list.
            </div>
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-red-400 font-semibold">KeyError:</span> Truy cập một key không tồn tại trong từ điển <code>dict</code>.
            </div>
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-red-400 font-semibold">ValueError:</span> Hàm nhận đúng kiểu dữ liệu nhưng sai giá trị (ví dụ: <code>int(&quot;abc&quot;)</code>).
            </div>
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-red-400 font-semibold">TypeError:</span> Truyền sai kiểu đối số cho hàm hoặc phép toán.
            </div>
          </div>
        </section>

        {/* PART 4: Hands-on Todo CLI v1 */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)]">
            <Terminal className="w-4 h-4" />
            <span>PHẦN 4 // NHIỆM VỤ THỰC HÀNH: XÂY DỰNG TODO CLI V1</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            4. Đề Bài Xây Dựng Todo CLI v1
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Tạo repository <code>python-foundations</code> trên máy tính của bạn và viết file <code>todo.py</code> thực hiện 4 thao tác quản trị công việc với vòng lặp <code>while True</code>, kiểm tra lỗi đầu vào rỗng và xử lý menu:
          </p>

          <div className="bg-[#0c0805] p-4 sm:p-5 rounded-[8px] border border-[#2a1c12] font-mono text-[12px] text-[#ffedd7] overflow-x-auto">
            <pre className="text-emerald-300">{`# todo.py - Phiên bản Todo CLI v1 tối giản
tasks = []

def list_tasks():
    if not tasks:
        print("[!] Danh sách rỗng. Hãy thêm công việc mới.")
        return
    for idx, task in enumerate(tasks, start=1):
        status = "[X]" if task["done"] else "[ ]"
        print(f"{idx}. {status} {task['title']}")

def add_task(title):
    if not title.strip():
        print("[LỖI] Tên công việc không được để trống!")
        return
    tasks.append({"title": title.strip(), "done": False})
    print(f"[OK] Đã thêm: {title}")

# Vòng lặp chính điều phối CLI
while True:
    print("\\n=== TODO CLI V1 ===")
    print("1. Xem danh sách | 2. Thêm | 3. Hoàn thành | 4. Thoát")
    choice = input("Chọn (1-4): ").strip()
    if choice == "1":
        list_tasks()
    elif choice == "2":
        t = input("Nhập tên công việc: ")
        add_task(t)
    elif choice == "4":
        print("Tạm biệt!")
        break
    else:
        print("[LỖI] Lựa chọn không hợp lệ. Vui lòng chọn từ 1 đến 4.")`}</pre>
          </div>
        </section>

        {/* PART 5: Interactive Simulator & Quiz */}
        <section className="space-y-6 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)]">
            <Play className="w-4 h-4" />
            <span>PHẦN 5 // TRẢI NGHIỆM TƯƠNG TÁC TODO CLI TRỰC TIẾP TRÊN WEB</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            5. Thử Nghiệm Console & Kiểm Tra Trắc Nghiệm
          </h2>

          {/* Interactive Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)]">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setInteractiveMode("wasm")}
                className={`px-3.5 py-1.5 rounded-[6px] font-mono text-[11px] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  interactiveMode === "wasm"
                    ? "bg-[var(--accent-aqua)] text-black font-semibold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>⚡ CHẠY CODE PYTHON THẬT (WASM)</span>
              </button>

              <button
                onClick={() => setInteractiveMode("simulator")}
                className={`px-3.5 py-1.5 rounded-[6px] font-mono text-[11px] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  interactiveMode === "simulator"
                    ? "bg-[var(--accent-ember)] text-white font-semibold shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>MÔ PHỎNG TODO CLI</span>
              </button>
            </div>

            <Link
              href="/playground"
              className="text-[11px] font-mono text-[var(--accent-aqua)] hover:underline uppercase flex items-center space-x-1 px-2.5 py-1"
            >
              <span>MỞ PLAYGROUND ĐẦY ĐỦ ↗</span>
            </Link>
          </div>

          {/* Tab 1: Real Pyodide WebAssembly Runner */}
          {interactiveMode === "wasm" && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <PythonWasmRunner initialPresetId="week-01" showPresets={false} />
            </div>
          )}

          {/* Tab 2: Interactive Console Sandbox (GUI Simulator) */}
          {interactiveMode === "simulator" && (
            <div className="p-5 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                <span className="text-[12px] font-mono text-[var(--accent-ember)] font-medium">
                  INTERACTIVE CONSOLE: TODO CLI SIMULATOR
                </span>
                <span className="text-[10px] font-mono text-[var(--text-secondary)]">V1.0 EMULATOR</span>
              </div>

              {/* Input row */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nhập tên công việc mới (ví dụ: Viết unit test cho todo)..."
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                  className="flex-1 px-3.5 py-2 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[13px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-ember)] font-mono"
                />
                <button
                  onClick={handleAddTodo}
                  className="h-[38px] px-5 rounded-[6px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-mono uppercase font-medium tracking-wider transition-colors shrink-0"
                >
                  + THÊM TASK
                </button>
              </div>

              {cliError && (
                <div className="text-[11px] font-mono text-red-400 bg-red-950/20 p-2.5 rounded-[6px] border border-red-800/30">
                  {cliError}
                </div>
              )}

              {/* Tasks list */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
                  DANH SÁCH CÔNG VIỆC HIỆN TẠI ({todos.length}):
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
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
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                            t.completed ? "bg-emerald-600 border-emerald-600 text-white" : "border-[var(--border-main)]"
                          }`}
                        >
                          {t.completed && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`truncate ${t.completed ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                          #{t.id}. {t.title}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteTodo(t.id)}
                        className="text-red-400 hover:text-red-300 text-[10px] uppercase font-mono px-2 py-0.5"
                      >
                        XÓA
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal output log */}
              <div className="p-3 rounded-[6px] bg-[#0c0805] text-[#ffedd7] font-mono text-[11px] border border-[#2a1c12]">
                <span className="text-[var(--accent-ember)]">&gt;</span> {cliOutput}
              </div>
            </div>
          )}

          {/* Quick Quiz */}
          <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-4">
            <div className="flex items-center space-x-2 text-[12px] font-mono text-[var(--accent-ember)] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>CÂU HỎI KIỂM ĐỊNH NĂNG LỰC TUẦN 01</span>
            </div>

            {/* Q1 */}
            <div className="space-y-2 text-[13px]">
              <div className="text-[var(--text-primary)] font-medium">
                1. Lệnh nào sau đây dùng để kích hoạt virtualenv trên PowerShell (Windows)?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] font-mono">
                {[
                  "source venv/bin/activate",
                  ".\\venv\\Scripts\\Activate.ps1",
                  "pip activate venv",
                  "python venv start",
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuizAnswers({ ...quizAnswers, q1: i })}
                    className={`p-2.5 rounded-[6px] border text-left transition-colors ${
                      quizAnswers.q1 === i
                        ? "border-[var(--accent-ember)] bg-[var(--accent-ember)]/10 text-[var(--text-primary)]"
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
                2. Khi viết mã nguồn thực tế, tại sao luôn phải bắt lỗi đầu vào rỗng trước khi xử lý chuỗi?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px]">
                {[
                  "Để ngăn chặn việc tạo ra các bản ghi vô nghĩa (empty tasks) và phát sinh lỗi logic về sau",
                  "Vì Python bắt buộc mọi biến string phải có ít nhất 1 ký tự",
                  "Để tối ưu hóa xung nhịp CPU của máy tính",
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuizAnswers({ ...quizAnswers, q2: i })}
                    className={`p-2.5 rounded-[6px] border text-left transition-colors font-mono ${
                      quizAnswers.q2 === i
                        ? "border-[var(--accent-ember)] bg-[var(--accent-ember)]/10 text-[var(--text-primary)]"
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
                  <span className="text-emerald-400 font-medium">✓ Đã trả lời chính xác toàn bộ câu hỏi!</span>
                ) : (
                  <span>Vui lòng chọn đúng đáp án để mở khóa tuần tiếp theo.</span>
                )}
              </div>

              <button
                disabled={!isQuizCorrect}
                onClick={handleCompleteWeekOne}
                className={`h-[42px] px-6 rounded-[22.5px] font-mono text-[11px] uppercase tracking-wider font-medium transition-all flex items-center space-x-2 ${
                  isQuizCorrect
                    ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] hover:bg-[var(--btn-solid-hover)] cursor-pointer shadow-md"
                    : "opacity-40 cursor-not-allowed border border-[var(--border-main)] text-[var(--text-secondary)]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-ember)]" />
                <span>{isUnlocked ? "ĐÃ HOÀN THÀNH BÀI HỌC ✓" : "HOÀN THÀNH BÀI HỌC TUẦN 01"}</span>
              </button>
            </div>

            {showCelebration && (
              <div className="p-4 rounded-[8px] bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-[12px] font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Chúc mừng! Bạn đã hoàn thành Bài học Tuần 01: Python Căn Bản &amp; Môi Trường. Bài học Tuần 02 (Cấu trúc dữ liệu &amp; JSON/CSV I/O) đã sẵn sàng!
                  </span>
                </div>
                <Link
                  href="/lesson/week-02"
                  className="px-4 py-1.5 rounded-[6px] bg-emerald-500 text-black font-semibold text-[11px] uppercase tracking-wider hover:bg-emerald-400 transition-colors shrink-0"
                >
                  HỌC TIẾP TUẦN 02 &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[var(--border-main)] py-6 px-4 sm:px-8 text-center text-[11px] font-mono text-[var(--text-secondary)]">
        <div>ORYZO AI LAB // 26-WEEK APPLIED AI CURRICULUM</div>
      </footer>
    </div>
  );
}
