"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  Bug,
  FileCode,
  Activity,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface TaskEntity {
  id: number;
  title: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
}

interface LogEntry {
  id: number;
  timestamp: string;
  level: "DEBUG" | "INFO" | "WARNING" | "ERROR";
  component: string;
  message: string;
}

interface UnitTestCase {
  id: string;
  name: string;
  description: string;
  status: "IDLE" | "PASSED";
  durationMs: number;
  assertionCode: string;
}

const INITIAL_UNIT_TESTS: UnitTestCase[] = [
  {
    id: "t1",
    name: "test_create_valid_task",
    description: "Khởi tạo Task hợp lệ qua TodoService và kiểm tra ID tự tăng.",
    status: "IDLE",
    durationMs: 2,
    assertionCode: "self.assertEqual(task.title, 'Train MLP'); self.assertFalse(task.completed)",
  },
  {
    id: "t2",
    name: "test_create_empty_title_raises_value_error",
    description: "Đảm bảo TodoService ném ValueError khi tiêu đề chỉ chứa khoảng trắng.",
    status: "IDLE",
    durationMs: 1,
    assertionCode: "with self.assertRaises(ValueError): service.create_task('   ')",
  },
  {
    id: "t3",
    name: "test_complete_existing_task",
    description: "Đánh dấu hoàn thành Task tồn tại và kiểm tra trạng thái lưu trong Repository.",
    status: "IDLE",
    durationMs: 2,
    assertionCode: "updated = service.complete_task(1); self.assertTrue(updated.completed)",
  },
  {
    id: "t4",
    name: "test_complete_missing_id_raises_key_error",
    description: "Truy vấn ID không tồn tại phải ném KeyError rõ ràng.",
    status: "IDLE",
    durationMs: 1,
    assertionCode: "with self.assertRaises(KeyError): service.complete_task(999)",
  },
  {
    id: "t5",
    name: "test_service_with_in_memory_mock_repo",
    description: "Kiểm thử cô lập nghiệp vụ bằng InMemoryTaskRepository không chạm ổ cứng.",
    status: "IDLE",
    durationMs: 3,
    assertionCode: "self.assertEqual(len(mock_repo.list_all()), 1)",
  },
];

export default function WeekThreeLessonPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive OOP Service & Logging Simulator State
  const [repoBackend, setRepoBackend] = useState<"InMemoryRepository" | "JsonFileRepository">(
    "JsonFileRepository"
  );
  const [tasks, setTasks] = useState<TaskEntity[]>([
    { id: 1, title: "Định nghĩa @dataclass Task trong models.py", priority: "HIGH", completed: true },
    { id: 2, title: "Tách TaskRepository và TodoService (Composition)", priority: "HIGH", completed: true },
    { id: 3, title: "Viết 5 unit tests với unittest.TestCase", priority: "MEDIUM", completed: false },
  ]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputPriority, setInputPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("HIGH");
  const [activeLabTab, setActiveLabTab] = useState<"service" | "logs" | "unittest">("service");
  const [logFilter, setLogFilter] = useState<"ALL" | "DEBUG" | "INFO" | "WARNING" | "ERROR">("ALL");

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: "12:00:01.104",
      level: "DEBUG",
      component: "TaskRepository",
      message: "Initialized JsonFileRepository(path='data/tasks.json')",
    },
    {
      id: 2,
      timestamp: "12:00:01.112",
      level: "INFO",
      component: "TodoService",
      message: "TodoService ready with 3 tasks loaded from repository.",
    },
  ]);

  const [unitTests, setUnitTests] = useState<UnitTestCase[]>(INITIAL_UNIT_TESTS);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Quiz state (3 questions)
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
      if (completed.includes(3)) {
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

  const appendLog = (
    level: "DEBUG" | "INFO" | "WARNING" | "ERROR",
    component: string,
    message: string
  ) => {
    const now = new Date();
    const timeStr =
      now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
    setLogs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        timestamp: timeStr,
        level,
        component,
        message,
      },
    ]);
  };

  const handleSwitchBackend = (nextBackend: "InMemoryRepository" | "JsonFileRepository") => {
    setRepoBackend(nextBackend);
    appendLog(
      "INFO",
      "DependencyInjector",
      `Switched TodoService repository dependency -> ${nextBackend}`
    );
  };

  const handleCreateTask = () => {
    if (!inputTitle.trim()) {
      appendLog(
        "ERROR",
        "TodoService",
        "ValueError: Cannot create Task with empty title string!"
      );
      setActiveLabTab("logs");
      return;
    }
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask: TaskEntity = {
      id: nextId,
      title: inputTitle.trim(),
      priority: inputPriority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputTitle("");
    appendLog(
      "DEBUG",
      repoBackend,
      `save(Task(id=${nextId}, priority='${inputPriority}')) executed.`
    );
    appendLog(
      "INFO",
      "TodoService",
      `Created Task #${nextId}: "${newTask.title}" via ${repoBackend}.`
    );
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          appendLog(
            "INFO",
            "TodoService",
            `Task #${id} state transitioned -> completed=${next}`
          );
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const handleSimulateMissingId = () => {
    appendLog(
      "WARNING",
      "TodoService",
      "Lookup warning: Requested task_id=999 does not exist in active cache."
    );
    appendLog(
      "ERROR",
      "TodoService",
      "KeyError: 'Task with id=999 not found in TaskRepository'"
    );
    setActiveLabTab("logs");
  };

  const handleRunAllTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setUnitTests(INITIAL_UNIT_TESTS.map((t) => ({ ...t, status: "PASSED" })));
      setIsRunningTests(false);
      appendLog(
        "INFO",
        "TestRunner",
        "Ran 5 unit tests in 0.009s — OK (5 passed, 0 failed)."
      );
    }, 350);
  };

  const handleResetTests = () => {
    setUnitTests(INITIAL_UNIT_TESTS.map((t) => ({ ...t, status: "IDLE" })));
  };

  const filteredLogs = logs.filter((l) => logFilter === "ALL" || l.level === logFilter);
  const allTestsPassed = unitTests.every((t) => t.status === "PASSED");

  // Quiz validation:
  // Q1: 0 (Tự động sinh __init__, __repr__, __eq__ và giúp định nghĩa Domain Model rõ ràng với Type Hints)
  // Q2: 1 (Giúp TodoService không phụ thuộc cứng vào ổ đĩa, dễ dàng truyền InMemoryMockRepository vào khi chạy Unit Test)
  // Q3: 2 (Dùng module logging để phân cấp mức độ nghiêm trọng DEBUG/INFO/WARNING/ERROR, ghi kèm timestamp và định tuyến ra file/console linh hoạt)
  const isQuizCorrect =
    quizAnswers.q1 === 0 && quizAnswers.q2 === 1 && quizAnswers.q3 === 2;

  const handleCompleteWeekThree = () => {
    if (!isQuizCorrect) return;
    setIsUnlocked(true);
    setShowCelebration(true);

    try {
      const completed = JSON.parse(localStorage.getItem("oryzo_completed_lessons") || "[]");
      if (!completed.includes(3)) {
        completed.push(3);
        localStorage.setItem("oryzo_completed_lessons", JSON.stringify(completed));
      }
      const artifacts = JSON.parse(localStorage.getItem("oryzo_unlocked_artifacts") || "[]");
      if (!artifacts.includes("oop_architecture_badge")) {
        artifacts.push("oop_architecture_badge");
        localStorage.setItem("oryzo_unlocked_artifacts", JSON.stringify(artifacts));
      }
    } catch {}
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
            href="/lesson/week-02"
            className="hidden sm:flex items-center space-x-1 text-[11px] font-mono tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-3 rounded-[22.5px] border border-[var(--border-main)] shrink-0"
          >
            <span>&larr; TUẦN 02</span>
          </Link>

          <div className="hidden md:block text-[11px] font-mono uppercase tracking-widest text-[var(--accent-aqua)] border-l border-[var(--border-main)] pl-4 truncate">
            TUẦN 03 // OOP, KIẾN TRÚC 3 LỚP, LOGGING &amp; UNIT TESTING
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
            <span>THÁNG 01 — PYTHON VÀ DỮ LIỆU // TUẦN 03 / 26</span>
          </div>

          <h1 className="text-[26px] sm:text-[38px] md:text-[42px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.08]">
            OOP HIỆN ĐẠI, KIẾN TRÚC PHÂN TẦNG, LOGGING &amp; UNIT TESTING (TODO CLI V3)
          </h1>

          <p className="text-[16px] sm:text-[19px] font-normal leading-relaxed text-[var(--text-secondary)] pt-1">
            Một hệ thống AI cấp doanh nghiệp không bao giờ viết toàn bộ logic vào một file script duy nhất hay gỡ lỗi bằng các câu lệnh <code>print()</code> rời rạc. Tuần này, chúng ta nâng cấp dự án lên <strong>Todo CLI v3</strong> với kiến trúc 3 tầng tách biệt (<code>Domain</code> &rarr; <code>Repository</code> &rarr; <code>Service</code>), tích hợp <code>logging</code> chuẩn công nghiệp và bộ kiểm thử tự động <code>unittest</code>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-[11px] font-mono uppercase text-[var(--text-secondary)]">
            <span>THỜI LƯỢNG: 6–8 GIỜ</span>
            <span>•</span>
            <span>TRỌNG TÂM: @DATACLASS, COMPOSITION, LOGGING, UNITTEST</span>
            <span>•</span>
            <span className="text-[var(--accent-aqua)] font-medium">TEST RUNNER TƯƠNG TÁC CUỐI TRANG &darr;</span>
          </div>
        </section>

        {/* PART 1: Modern Python OOP & Dataclasses */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Layers className="w-4 h-4" />
            <span>PHẦN 1 // OOP HIỆN ĐẠI TRONG PYTHON: @DATACLASS &amp; COMPOSITION</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            1. Thiết Kế Thực Thể Với <code>@dataclass</code> &amp; Nguyên Lý Composition
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Thay vì dùng <code>dict</code> lỏng lẻo dễ gõ sai tên khóa (như <code>task[&quot;titel&quot;]</code>), chúng ta đóng gói dữ liệu vào một lớp thực thể rõ ràng bằng decorator <code>@dataclass</code>. Python sẽ tự động sinh các phương thức khởi tạo <code>__init__</code>, biểu diễn chuỗi <code>__repr__</code> và so sánh bằng <code>__eq__</code>.
          </p>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto">
            <pre className="text-emerald-300">{`# models.py - Định nghĩa thực thể Domain với @dataclass
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from typing import Any

@dataclass
class Task:
    id: int
    title: str
    priority: str = "MEDIUM"
    completed: bool = False
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    def mark_done(self) -> None:
        """Phương thức đóng gói hành vi thay đổi trạng thái."""
        self.completed = True

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)`}</pre>
          </div>

          <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-2 text-[14px]">
            <div className="font-mono text-[12px] uppercase text-[var(--accent-aqua)] font-semibold">
              Tại sao ưu tiên Composition hơn Inheritance (Composition over Inheritance)?
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Thay vì cho <code>TodoService</code> kế thừa trực tiếp từ <code>JsonTaskRepository</code> (khiến tầng nghiệp vụ bị khóa chặt vào file JSON), ta truyền một đối tượng <code>repo</code> vào <code>TodoService(repo)</code>. Nhờ đó, khi chạy thật ta truyền <code>JsonTaskRepository</code>, còn khi chạy Unit Test ta chỉ cần truyền <code>InMemoryTaskRepository</code> siêu tốc độ!
            </p>
          </div>
        </section>

        {/* PART 2: 3-Layer Architecture */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Code2 className="w-4 h-4" />
            <span>PHẦN 2 // TÁCH BIỆT NGHIỆP VỤ KHỎI GIAO DIỆN CLI &amp; LƯU TRỮ</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            2. Kiến Trúc 3 Tầng: Repository &amp; Service Layer
          </h2>

          <div className="p-4 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] font-mono text-[11px] sm:text-[12px] text-[var(--accent-aqua)] overflow-x-auto">
            CLI Presentation (cli.py) &rarr; Business Logic (TodoService) &rarr; Data Access (TaskRepository) &rarr; Domain (Task)
          </div>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto">
            <pre className="text-emerald-300">{`# service.py - Tầng nghiệp vụ (Business Logic) độc lập khỏi CLI và cơ sở dữ liệu
import logging
from models import Task

logger = logging.getLogger(__name__)

class TodoService:
    def __init__(self, repository) -> None:
        # Composition / Dependency Injection
        self.repo = repository
        logger.info("TodoService initialized with %s", type(repository).__name__)

    def create_task(self, title: str, priority: str = "MEDIUM") -> Task:
        clean_title = title.strip()
        if not clean_title:
            logger.error("Rejected task creation: empty title")
            raise ValueError("Tiêu đề công việc không được để trống!")

        tasks = self.repo.list_all()
        next_id = max((t.id for t in tasks), default=0) + 1
        new_task = Task(id=next_id, title=clean_title, priority=priority)
        self.repo.save(new_task)
        logger.info("Created Task id=%d title='%s'", new_task.id, new_task.title)
        return new_task

    def complete_task(self, task_id: int) -> Task:
        task = self.repo.get_by_id(task_id)
        if task is None:
            logger.warning("Attempted to complete missing task_id=%d", task_id)
            raise KeyError(f"Không tìm thấy công việc có ID={task_id}")
        task.mark_done()
        self.repo.update(task)
        logger.info("Completed Task id=%d", task_id)
        return task`}</pre>
          </div>
        </section>

        {/* PART 3: Structured Logging & Unit Testing */}
        <section className="space-y-4 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <ShieldCheck className="w-4 h-4" />
            <span>PHẦN 3 // LOGGING 4 CẤP ĐỘ &amp; KIỂM THỬ TỰ ĐỘNG VỚI UNITTEST</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            3. Thay Thế <code>print()</code> Bằng <code>logging</code> &amp; Viết Unit Tests
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Trong môi trường Production, lệnh <code>print()</code> không cho biết thời điểm xảy ra sự kiện, mức độ nghiêm trọng hay module nào phát sinh lỗi. Module <code>logging</code> tiêu chuẩn của Python giải quyết triệt để vấn đề này:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-mono">
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-sky-400 font-semibold">DEBUG:</span> Thông tin chi tiết cấp thấp phục vụ lập trình viên truy vết biến và luồng gọi.
            </div>
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-emerald-400 font-semibold">INFO:</span> Xác nhận các sự kiện nghiệp vụ bình thường (khởi tạo service, tạo bản ghi thành công).
            </div>
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-amber-400 font-semibold">WARNING:</span> Cảnh báo tình huống bất thường nhưng hệ thống vẫn tiếp tục chạy (ví dụ: tra cứu ID không tồn tại).
            </div>
            <div className="p-3 rounded-[6px] bg-[var(--surface-card)] border border-[var(--border-main)]">
              <span className="text-red-400 font-semibold">ERROR:</span> Lỗi nghiêm trọng khiến một thao tác nghiệp vụ thất bại và ném ngoại lệ.
            </div>
          </div>

          <div className="bg-[#081214] p-4 sm:p-5 rounded-[8px] border border-[#143338] font-mono text-[12px] text-[#e2fbf9] overflow-x-auto">
            <pre className="text-emerald-300">{`# test_service.py - Kiểm thử tự động TodoService theo mô hình Arrange - Act - Assert
import unittest
from service import TodoService
from repository import InMemoryTaskRepository

class TestTodoService(unittest.TestCase):
    def setUp(self) -> None:
        # Khởi tạo kho lưu trữ giả lập trên RAM hoàn toàn sạch trước mỗi test case
        self.repo = InMemoryTaskRepository()
        self.service = TodoService(self.repo)

    def test_create_valid_task(self) -> None:
        task = self.service.create_task("Huấn luyện mô hình PyTorch", priority="HIGH")
        self.assertEqual(task.id, 1)
        self.assertFalse(task.completed)

    def test_create_empty_title_raises_value_error(self) -> None:
        with self.assertRaises(ValueError):
            self.service.create_task("    ")

    def test_complete_missing_id_raises_key_error(self) -> None:
        with self.assertRaises(KeyError):
            self.service.complete_task(999)

if __name__ == "__main__":
    unittest.main()`}</pre>
          </div>
        </section>

        {/* PART 4: Interactive OOP, Logging & Unit Test Lab */}
        <section className="space-y-6 border-t border-[var(--border-main)] pt-8">
          <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-aqua)]">
            <Play className="w-4 h-4" />
            <span>PHẦN 4 // PHÒNG LAB TƯƠNG TÁC: TODO SERVICE OOP + STRUCTURED LOGS + TEST RUNNER</span>
          </div>

          <h2 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
            4. Thử Nghiệm Dependency Injection, Xem Log Phân Tầng &amp; Chạy Unit Tests
          </h2>

          <div className="p-5 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
            {/* Lab Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-main)] pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveLabTab("service")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeLabTab === "service"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>1. TodoService (OOP)</span>
                </button>

                <button
                  onClick={() => setActiveLabTab("logs")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeLabTab === "logs"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>2. Logging Stream ({logs.length})</span>
                </button>

                <button
                  onClick={() => setActiveLabTab("unittest")}
                  className={`px-3 py-1.5 rounded-[6px] text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeLabTab === "unittest"
                      ? "bg-[var(--accent-aqua)] text-black font-semibold"
                      : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>
                    3. Unit Test Runner ({unitTests.filter((t) => t.status === "PASSED").length}/5)
                  </span>
                </button>
              </div>

              {/* Dependency Injection Selector */}
              <div className="flex items-center space-x-1.5 text-[10px] font-mono">
                <span className="text-[var(--text-secondary)]">INJECT REPO:</span>
                {(["JsonFileRepository", "InMemoryRepository"] as const).map((repo) => (
                  <button
                    key={repo}
                    onClick={() => handleSwitchBackend(repo)}
                    className={`px-2 py-1 rounded-[4px] border transition-colors cursor-pointer ${
                      repoBackend === repo
                        ? "border-[var(--accent-aqua)] bg-[var(--accent-aqua)]/15 text-[var(--accent-aqua)] font-semibold"
                        : "border-[var(--border-main)] bg-[var(--bg-canvas)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {repo === "JsonFileRepository" ? "JsonFileRepo" : "InMemoryMockRepo"}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB 1: TodoService Interactive Operations */}
            {activeLabTab === "service" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Gọi service.create_task(title) — thử để trống rồi bấm để xem log ERROR..."
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateTask()}
                    className="flex-1 px-3.5 py-2 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[12px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-aqua)] font-mono"
                  />
                  <select
                    value={inputPriority}
                    onChange={(e) =>
                      setInputPriority(e.target.value as "HIGH" | "MEDIUM" | "LOW")
                    }
                    className="px-3 py-2 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] text-[11px] text-[var(--text-primary)] font-mono"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                  <button
                    onClick={handleCreateTask}
                    className="h-[38px] px-4 rounded-[6px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-mono uppercase font-medium tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    service.create_task()
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
                  <span>
                    ACTIVE REPOSITORY: <strong className="text-[var(--accent-aqua)]">{repoBackend}</strong>
                  </span>
                  <button
                    onClick={handleSimulateMissingId}
                    className="text-amber-400 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Bug className="w-3.5 h-3.5" />
                    <span>Thử gọi service.complete_task(999) (Giả lập KeyError)</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-52 overflow-y-auto">
                  {tasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(t.id)}
                      className="flex items-center justify-between p-2.5 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] hover:border-[var(--accent-aqua)] text-[12px] font-mono cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <div
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                            t.completed
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-[var(--border-main)]"
                          }`}
                        >
                          {t.completed && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--accent-aqua)]">
                          Task(id={t.id})
                        </span>
                        <span
                          className={`truncate ${
                            t.completed
                              ? "line-through text-[var(--text-secondary)]"
                              : "text-[var(--text-primary)]"
                          }`}
                        >
                          {t.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--text-secondary)] shrink-0 ml-2">
                        priority=&apos;{t.priority}&apos;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Structured Logging Stream */}
            {activeLabTab === "logs" && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase text-[var(--text-secondary)]">
                    LỌC CẤP ĐỘ LOG (LOGGING LEVEL FILTER):
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] font-mono">
                    {(["ALL", "DEBUG", "INFO", "WARNING", "ERROR"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setLogFilter(lvl)}
                        className={`px-2 py-1 rounded-[4px] cursor-pointer transition-colors ${
                          logFilter === lvl
                            ? "bg-[var(--accent-aqua)] text-black font-semibold"
                            : "bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-main)]"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-[8px] bg-[#081214] border border-[#143338] font-mono text-[11px] space-y-1.5 max-h-56 overflow-y-auto">
                  {filteredLogs.map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-2 leading-relaxed">
                      <span className="text-slate-500 shrink-0">{entry.timestamp}</span>
                      <span
                        className={`px-1.5 rounded text-[10px] font-semibold shrink-0 ${
                          entry.level === "ERROR"
                            ? "bg-red-500/20 text-red-400"
                            : entry.level === "WARNING"
                            ? "bg-amber-500/20 text-amber-300"
                            : entry.level === "INFO"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-sky-500/20 text-sky-300"
                        }`}
                      >
                        {entry.level}
                      </span>
                      <span className="text-[var(--accent-aqua)] shrink-0">
                        [{entry.component}]
                      </span>
                      <span className="text-[#e2fbf9]">{entry.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Interactive Unit Test Runner */}
            {activeLabTab === "unittest" && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                    SUITE: <strong className="text-[var(--text-primary)]">test_service.TestTodoService</strong> (5 test cases)
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleResetTests}
                      className="px-2.5 py-1 rounded-[6px] border border-[var(--border-main)] text-[10px] font-mono uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      RESET
                    </button>
                    <button
                      onClick={handleRunAllTests}
                      disabled={isRunningTests}
                      className="px-3.5 py-1.5 rounded-[6px] bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isRunningTests ? "ĐANG CHẠY..." : "CHẠY 5 UNIT TESTS"}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {unitTests.map((tc) => (
                    <div
                      key={tc.id}
                      className="p-3 rounded-[6px] bg-[var(--bg-canvas)] border border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                              tc.status === "PASSED"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-stone-500/20 text-[var(--text-secondary)]"
                            }`}
                          >
                            {tc.status === "PASSED" ? `PASS (${tc.durationMs}ms)` : "PENDING"}
                          </span>
                          <span className="text-[var(--text-primary)] font-semibold">
                            {tc.name}()
                          </span>
                        </div>
                        <div className="text-[var(--text-secondary)] text-[11px] font-sans">
                          {tc.description}
                        </div>
                        <div className="text-[10px] text-[var(--accent-aqua)]">
                          &rarr; <code>{tc.assertionCode}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {allTestsPassed && (
                  <div className="p-3 rounded-[6px] bg-emerald-950/30 border border-emerald-700/40 text-emerald-300 font-mono text-[11px] flex items-center justify-between">
                    <span>Ran 5 tests in 0.009s — OK (All assertions passed!)</span>
                    <span>100% COVERAGE</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quiz Section */}
          <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-5">
            <div className="flex items-center space-x-2 text-[12px] font-mono text-[var(--accent-aqua)] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>BÀI KIỂM ĐỊNH NĂNG LỰC TUẦN 03 (3 CÂU HỎI)</span>
            </div>

            {/* Q1 */}
            <div className="space-y-2 text-[13px]">
              <div className="text-[var(--text-primary)] font-medium">
                1. Sử dụng decorator <code>@dataclass</code> cho lớp thực thể <code>Task</code> mang lại lợi ích cốt lõi nào?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Tự động sinh các phương thức __init__, __repr__, __eq__ chuẩn xác dựa trên khai báo Type Hints mà không cần viết code lặp lại (boilerplate)",
                  "Tự động lưu đối tượng xuống cơ sở dữ liệu đám mây mà không cần viết Repository",
                  "Biến lớp Python thành mã máy C++ ngay lập tức",
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
                2. Tại sao việc thiết kế <code>TodoService</code> nhận <code>repository</code> qua hàm khởi tạo (Composition / Dependency Injection) lại quan trọng khi viết Unit Test?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Vì Python cấm một class gọi trực tiếp hàm đọc file",
                  "Giúp tách rời tầng nghiệp vụ khỏi ổ cứng vật lý; khi chạy Unit Test ta có thể truyền InMemoryTaskRepository vào để kiểm thử nhanh, cô lập và không làm bẩn file dữ liệu thật",
                  "Để giảm dung lượng file mã nguồn xuống dưới 50 dòng",
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
                3. Tại sao trong các dự án AI/Backend thực tế ta phải dùng thư viện <code>logging</code> thay vì dùng lệnh <code>print()</code>?
              </div>
              <div className="grid grid-cols-1 gap-2 text-[12px] font-mono">
                {[
                  "Vì lệnh print() đã bị xóa khỏi Python 3.11+",
                  "Vì print() không in được tiếng Việt có dấu",
                  "Vì logging hỗ trợ phân cấp độ nghiêm trọng (DEBUG, INFO, WARNING, ERROR), tự động gắn timestamp/module và dễ dàng cấu hình xuất ra cả màn hình lẫn file log",
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
                    ✓ Tuyệt vời! Bạn đã trả lời chính xác cả 3 câu hỏi kiểm định Tuần 03.
                  </span>
                ) : (
                  <span>Vui lòng chọn đúng cả 3 câu hỏi để hoàn thành Tuần 03.</span>
                )}
              </div>

              <button
                disabled={!isQuizCorrect}
                onClick={handleCompleteWeekThree}
                className={`h-[42px] px-6 rounded-[22.5px] font-mono text-[11px] uppercase tracking-wider font-medium transition-all flex items-center space-x-2 ${
                  isQuizCorrect
                    ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] hover:bg-[var(--btn-solid-hover)] cursor-pointer shadow-md"
                    : "opacity-40 cursor-not-allowed border border-[var(--border-main)] text-[var(--text-secondary)]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-aqua)]" />
                <span>
                  {isUnlocked ? "ĐÃ HOÀN THÀNH TUẦN 03 ✓" : "HOÀN THÀNH BÀI HỌC TUẦN 03"}
                </span>
              </button>
            </div>

            {showCelebration && (
              <div className="p-4 rounded-[8px] bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-[12px] font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Chúc mừng! Bạn đã hoàn thành Tuần 03 (OOP, Logging &amp; Unit Testing) và mở khóa Tuần 04: NumPy, Pandas &amp; Làm sạch dữ liệu!
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
        <div>AUROS AI LAB // TUẦN 03 — OOP, KIẾN TRÚC 3 LỚP, LOGGING &amp; UNIT TESTING</div>
      </footer>
    </div>
  );
}
