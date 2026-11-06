"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, CheckCircle2, ChevronRight, Sun, Moon, Sparkles, Filter, Search, Award, Flame, Terminal, Cpu, Database, Network, ShieldCheck, ArrowUpRight, Compass } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { MONTHS_OVERVIEW, CITED_CORPUS, CHECKLIST_ITEMS, WEEKS_DATA, WeekData } from "@/lib/roadmap-data";
import RoadmapTimeline3D from "@/components/RoadmapTimeline3D";

export default function RoadmapPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [filterMilestonesOnly, setFilterMilestonesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timelineViewMode, setTimelineViewMode] = useState<"3d" | "grid">("3d");

  // Filtering weeks for Tab 2
  const filteredWeeks = WEEKS_DATA.filter((w) => {
    const matchMonth = selectedMonth === "all" || w.month === selectedMonth;
    const matchMilestone = !filterMilestonesOnly || w.isMilestone;
    const matchSearch =
      searchQuery === "" ||
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.handsOn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.deliverable.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMonth && matchMilestone && matchSearch;
  });

  const handleJumpToMonth = (monthNumber: number) => {
    setSelectedMonth(monthNumber);
    setActiveTab("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[var(--btn-solid-bg)] selection:text-[var(--btn-solid-text)] flex flex-col justify-between">
      {/* 1. Sticky Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-main)] px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-3 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>TRANG CHỦ</span>
          </Link>

          <Link
            href="/lab"
            className="hidden md:flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--accent-ember)] hover:text-[var(--text-primary)] transition-colors py-1.5 px-3 rounded-[22.5px] border border-[var(--border-main)]"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>PHÒNG LAB 3D</span>
          </Link>

          <div className="text-[12px] font-mono uppercase tracking-widest text-[var(--text-primary)] font-medium border-l border-[var(--border-main)] pl-4 hidden sm:block">
            AI SOFTWARE ENGINEER <span className="text-[var(--accent-ember)]">//</span> 26 TUẦN TOÀN DIỆN
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-[36px] p-1 text-[11px] font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-1.5 rounded-[22.5px] transition-all ${
              activeTab === "overview"
                ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-medium shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            01. THÔNG TIN CHUNG
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-1.5 rounded-[22.5px] transition-all ${
              activeTab === "details"
                ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-medium shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            02. CHI TIẾT 26 TUẦN
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors"
            title="Chuyển chế độ Sáng / Tối"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="max-w-6xl mx-auto w-full px-6 sm:px-12 py-10 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: THÔNG TIN CHUNG & KHÁI QUÁT LỘ TRÌNH              */}
        {/* ======================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="space-y-4 border-b border-[var(--border-main)] pb-8">
              <div className="flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--accent-ember)] font-medium">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)] animate-pulse" />
                <span>STRATEGIC CURRICULUM ARCHITECTURE</span>
              </div>

              <h1 className="text-[32px] sm:text-[46px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-[1.02]">
                LỘ TRÌNH HỌC AI TOÀN DIỆN CHO KỸ SƯ PHẦN MỀM
              </h1>

              <p className="text-[18px] sm:text-[21px] font-normal leading-[1.4] text-[var(--text-secondary)] max-w-4xl">
                Định hướng chuyển dịch từ <strong>Software Engineer</strong> thành <strong>Kỹ sư AI chuyên sâu về LLM Systems & Autonomous Agents</strong> trong 26 tuần (6 tháng), tập trung làm chủ ứng dụng thực tế và hệ thống AI tự trị mà không sa đà vào toán học hàn lâm.
              </p>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
                <div className="p-4 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)]">
                  <div className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">THỜI LƯỢNG KHÓA HỌC</div>
                  <div className="text-[20px] font-mono font-medium text-[var(--text-primary)] mt-0.5">26 TUẦN (6 THÁNG)</div>
                  <div className="text-[11px] text-[var(--accent-ember)] mt-1 font-mono">1 Lộ trình xuyên suốt</div>
                </div>

                <div className="p-4 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)]">
                  <div className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">THỜI GIAN CAM KẾT</div>
                  <div className="text-[20px] font-mono font-medium text-[var(--text-primary)] mt-0.5">5–7 GIỜ / TUẦN</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-1">Phù hợp người đi làm</div>
                </div>

                <div className="p-4 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)]">
                  <div className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">TỔNG THỜI LƯỢNG</div>
                  <div className="text-[20px] font-mono font-medium text-[var(--text-primary)] mt-0.5">~130–182 GIỜ</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-1">70% Code thực hành</div>
                </div>

                <div className="p-4 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)]">
                  <div className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">SẢN PHẨM ĐẦU RA</div>
                  <div className="text-[20px] font-mono font-medium text-[var(--text-primary)] mt-0.5">CAPSTONE PLATFORM</div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono">Production Ready ✓</div>
                </div>
              </div>
            </section>

            {/* Strategy & Allocation Matrix */}
            <section className="space-y-5">
              <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                <Layers className="w-4 h-4" />
                <span>MA TRẬN PHÂN BỔ TRỌNG TÂM CHIẾN LƯỢC</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono text-[var(--accent-ember)] uppercase font-medium">50% THỜI LƯỢNG</span>
                    <Database className="w-4 h-4 text-[var(--text-secondary)]" />
                  </div>
                  <div className="text-[16px] font-medium uppercase text-[var(--text-primary)]">AI Application & RAG</div>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Xây dựng hệ thống hỏi đáp dữ liệu riêng, Vector Database (pgvector), Hybrid Search, Re-ranking & Citations.
                  </p>
                </div>

                <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono text-[var(--accent-ember)] uppercase font-medium">25% THỜI LƯỢNG</span>
                    <Cpu className="w-4 h-4 text-[var(--text-secondary)]" />
                  </div>
                  <div className="text-[16px] font-medium uppercase text-[var(--text-primary)]">Transformer from Scratch</div>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Bóc tách Tokenization (BPE), Vector Embeddings, Self-Attention, và tự lắp ráp mô hình MiniGPT bằng PyTorch.
                  </p>
                </div>

                <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono text-[var(--accent-ember)] uppercase font-medium">15% THỜI LƯỢNG</span>
                    <Network className="w-4 h-4 text-[var(--text-secondary)]" />
                  </div>
                  <div className="text-[16px] font-medium uppercase text-[var(--text-primary)]">AI Agents & Workflows</div>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Chu trình ReAct, LangGraph StateGraph, kiểm soát con người (Human-in-the-Loop) và chuẩn giao tiếp MCP.
                  </p>
                </div>

                <div className="p-5 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono text-[var(--accent-ember)] uppercase font-medium">10% THỜI LƯỢNG</span>
                    <Terminal className="w-4 h-4 text-[var(--text-secondary)]" />
                  </div>
                  <div className="text-[16px] font-medium uppercase text-[var(--text-primary)]">Serving & Observability</div>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    Tối ưu suy luận với vLLM, giám sát chi phí/độ trễ bằng Langfuse, đóng gói container Docker an toàn.
                  </p>
                </div>
              </div>
            </section>

            {/* 6-Month Timeline 3D & Progression Section */}
            <section className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-main)] pb-3">
                <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                  <Compass className="w-4 h-4" />
                  <span>TIẾN TRÌNH 6 THÁNG HỌC TẬP (3D TIMELINE MATRIX)</span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-[22.5px] p-0.5 text-[10px] font-mono uppercase">
                    <button
                      onClick={() => setTimelineViewMode("3d")}
                      className={`px-3 py-1 rounded-[16px] transition-all ${
                        timelineViewMode === "3d"
                          ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-medium shadow-sm"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      3D TIMELINE
                    </button>
                    <button
                      onClick={() => setTimelineViewMode("grid")}
                      className={`px-3 py-1 rounded-[16px] transition-all ${
                        timelineViewMode === "grid"
                          ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-medium shadow-sm"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      DẠNG LƯỚI (2D)
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveTab("details")}
                    className="text-[11px] font-mono uppercase text-[var(--text-secondary)] hover:text-[var(--accent-ember)] flex items-center space-x-1"
                  >
                    <span>MỞ TOÀN BỘ 26 TUẦN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3D Timeline View */}
              {timelineViewMode === "3d" ? (
                <RoadmapTimeline3D onSelectMonth={handleJumpToMonth} />
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MONTHS_OVERVIEW.map((m) => (
                    <div
                      key={m.month}
                      onClick={() => handleJumpToMonth(m.month)}
                      className="p-6 rounded-[12px] bg-[var(--surface-card)] border border-[var(--border-main)] hover:border-[var(--text-primary)] cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-main)]">
                          <span className="text-[11px] font-mono text-[var(--accent-ember)] uppercase font-medium">
                            THÁNG 0{m.month} // {m.weeks}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-[17px] font-medium uppercase tracking-tight text-[var(--text-primary)] mt-3">
                          {m.title}
                        </h3>
                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2">
                          {m.focus}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[var(--border-main)]/60 text-[11px] font-mono text-[var(--accent-ember)] flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{m.highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Cited Academic Corpus */}
            <section className="space-y-5">
              <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                <BookOpen className="w-4 h-4" />
                <span>DANH MỤC NGUỒN HỌC THUẬT TIÊU CHUẨN (CITED CORPUS)</span>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)]">
                Mọi bài học trong lộ trình đều được dẫn chiếu trực tiếp từ các đầu sách và khóa học hàng đầu thế giới:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CITED_CORPUS.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-[10px] bg-[var(--surface-card)] border border-[var(--border-main)] space-y-1.5"
                  >
                    <div className="text-[11px] font-mono text-[var(--accent-ember)] font-medium">
                      [{item.code}]
                    </div>
                    <div className="text-[13px] font-medium text-[var(--text-primary)]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)]">
                      {item.author}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Capstone Architecture Diagram Box */}
            <section className="p-6 rounded-[12px] bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                <span className="text-[12px] font-mono uppercase tracking-wider font-medium text-[var(--text-primary)]">
                  DỰ ÁN CAPSTONE TỐT NGHIỆP: AI KNOWLEDGE & AGENT PLATFORM
                </span>
                <span className="text-[11px] font-mono text-[var(--accent-ember)]">
                  TUẦN 23–26
                </span>
              </div>

              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                Sau 26 tuần, bạn sẽ ghép nối toàn bộ kiến thức thành một sản phẩm công nghiệp hoàn chỉnh: Frontend Next.js (Streaming UI) + Backend FastAPI + RAG pgvector + Multi-Agent LangGraph + MCP Tools + Giám sát Langfuse.
              </p>

              <div className="bg-[#0c0805] p-4 rounded-[8px] border border-[#2a1c12] font-mono text-[11px] text-[#ffedd7] overflow-x-auto leading-relaxed">
                +--------------------------------------------------------------------------+ <br />
                |                       FRONTEND (Next.js / TypeScript)                    | <br />
                |  - Giao diện Chat trực quan, SSE Streaming, Markdown & 3D WebGL Matrix   | <br />
                +------------------------------------+-------------------------------------+ <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| (REST API / SSE Streaming) <br />
                +------------------------------------v-------------------------------------+ <br />
                |                      BACKEND API (Python / FastAPI)                      | <br />
                |  - Authentication, Rate-limiting, Prompt Injection Guard, Tasks Worker   | <br />
                +------------------+------------------------------------+------------------+ <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|                                    | <br />
                +------------------v------------------+  +--------------v------------------+ <br />
                |          RAG SUBSYSTEM              |  |         AGENT SUBSYSTEM         | <br />
                | - Chunking & Embedding Pipeline     |  | - LangGraph Multi-Agent Engine  | <br />
                | - Hybrid Search (pgvector + BM25)   |  | - Custom Tools & MCP Servers    | <br />
                | - Re-ranking & Citations Injection  |  | - Human-in-the-Loop Interrupt   | <br />
                +------------------+------------------+  +--------------+------------------+ <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|                                    | <br />
                +------------------v------------------------------------v------------------+ <br />
                |                    DATA & INFRASTRUCTURE LAYER                           | <br />
                |  - PostgreSQL + pgvector • SQLite Checkpointer • Docker Compose • Langfuse| <br />
                +--------------------------------------------------------------------------+ <br />
              </div>
            </section>

            {/* Checklist of Competencies */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-[12px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>CHECKLIST ĐÁNH GIÁ NĂNG LỰC SAU 6 THÁNG</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[8px] bg-[var(--surface-card)] border border-[var(--border-main)] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[12px] font-medium font-mono text-[var(--text-primary)]">
                        {item.area}
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        {item.skill}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                      READY ✓
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom CTA to start */}
            <div className="p-8 rounded-[14px] bg-[var(--surface-card)] border border-[var(--border-main)] text-center space-y-4">
              <h2 className="text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                BẮT ĐẦU HÀNH TRÌNH CHINH PHỤC AI SOFTWARE ENGINEER
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] max-w-xl mx-auto">
                Tuần đầu tiên là bước chuyển dịch tư duy cú pháp sang Python và chuẩn bị môi trường chuẩn. Nhấn bên dưới để vào ngay bài học đầu tiên!
              </p>
              <div className="pt-2 flex justify-center">
                <Link
                  href="/lesson/day-01"
                  className="h-[48px] px-8 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[12px] font-medium tracking-widest uppercase transition-colors flex items-center space-x-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent-ember)]" />
                  <span>BẮT ĐẦU TUẦN 01 NGAY HÔM NAY</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CHI TIẾT LỘ TRÌNH 26 TUẦN (WEEK-BY-WEEK)          */}
        {/* ======================================================== */}
        {activeTab === "details" && (
          <div className="space-y-8">
            {/* Filter and Search Bar */}
            <div className="space-y-4 border-b border-[var(--border-main)] pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-[26px] sm:text-[34px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                    CHI TIẾT 26 TUẦN HỌC TẬP
                  </h2>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-1">
                    Hiển thị {filteredWeeks.length} / 26 tuần • Mục tiêu, lý thuyết, tài liệu và sản phẩm bàn giao cụ thể
                  </p>
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo chủ đề, keyword..."
                    className="w-full h-[40px] pl-9 pr-4 bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[22.5px] text-[12px] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-ember)] transition-colors"
                  />
                </div>
              </div>

              {/* Month Filters Pills */}
              <div className="flex items-center flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setSelectedMonth("all")}
                  className={`px-3.5 py-1.5 rounded-[22.5px] text-[11px] font-mono uppercase tracking-wider transition-colors ${
                    selectedMonth === "all"
                      ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] border border-[var(--border-main)]"
                      : "border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  TẤT CẢ (26 TUẦN)
                </button>

                {[1, 2, 3, 4, 5, 6].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`px-3.5 py-1.5 rounded-[22.5px] text-[11px] font-mono uppercase tracking-wider transition-colors ${
                      selectedMonth === m
                        ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] border border-[var(--border-main)]"
                        : "border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    THÁNG {m}
                  </button>
                ))}

                <button
                  onClick={() => setFilterMilestonesOnly(!filterMilestonesOnly)}
                  className={`px-3.5 py-1.5 rounded-[22.5px] text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center space-x-1 ${
                    filterMilestonesOnly
                      ? "bg-[var(--accent-ember)] text-[#ffedd7]"
                      : "border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--accent-ember)]"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>CHỈ HIỆN MILESTONES</span>
                </button>
              </div>
            </div>

            {/* Weeks List */}
            <div className="space-y-6">
              {filteredWeeks.length === 0 ? (
                <div className="text-center py-16 text-[var(--text-secondary)] font-mono">
                  Không tìm thấy tuần học nào phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                filteredWeeks.map((w) => (
                  <div
                    key={w.week}
                    className={`p-6 rounded-[14px] bg-[var(--surface-card)] border transition-all duration-200 space-y-5 ${
                      w.isMilestone
                        ? "border-[var(--accent-ember)]/60 shadow-md ring-1 ring-[var(--accent-ember)]/20"
                        : "border-[var(--border-main)] hover:border-[var(--text-primary)]/40"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-main)] pb-3.5">
                      <div className="flex items-center space-x-3">
                        <span className="text-[12px] font-mono font-medium text-[var(--accent-ember)] bg-[var(--accent-ember)]/10 px-2.5 py-0.5 rounded border border-[var(--accent-ember)]/20">
                          TUẦN {w.week < 10 ? `0${w.week}` : w.week}
                        </span>
                        <h3 className="text-[17px] sm:text-[19px] font-medium uppercase tracking-tight text-[var(--text-primary)]">
                          {w.title}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                          {w.tag}
                        </span>
                        {w.isMilestone && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium px-2 py-0.5 rounded bg-[var(--accent-ember)]/10 border border-[var(--accent-ember)]/30 flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>MILESTONE</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Milestone Highlight Banner */}
                    {w.isMilestone && w.milestoneTitle && (
                      <div className="p-3 rounded-[8px] bg-[var(--surface-elevated)] border-l-3 border-[var(--accent-ember)] text-[12px] font-mono text-[var(--accent-ember)] flex items-center space-x-2">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{w.milestoneTitle}</span>
                      </div>
                    )}

                    {/* 3 Columns: Theory, Resources, Hands-on */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-[13px] leading-relaxed">
                      {/* Theory (5 cols) */}
                      <div className="lg:col-span-5 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-medium">
                          MỤC TIÊU & LÝ THUYẾT CỐT LÕI
                        </div>
                        <ul className="space-y-1.5 text-[var(--text-primary)]/90 list-disc list-inside">
                          {w.theory.map((t, idx) => (
                            <li key={idx} className="text-[12.5px] leading-snug">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources (3 cols) */}
                      <div className="lg:col-span-3 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-medium">
                          TÀI LIỆU & NGUỒN TRÍCH DẪN
                        </div>
                        <div className="space-y-1.5 font-mono text-[11px] text-[var(--text-secondary)]">
                          {w.resources.map((r, idx) => (
                            <div key={idx} className="truncate">
                              • {r}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverable & Action (4 cols) */}
                      <div className="lg:col-span-4 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                          BÀI THỰC HÀNH & SẢN PHẨM ĐẦU RA
                        </div>
                        <p className="text-[12px] text-[var(--text-primary)]/90">
                          {w.handsOn}
                        </p>
                        <div className="p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-main)] font-mono text-[11px] text-emerald-400 truncate">
                          📁 {w.deliverable}
                        </div>
                      </div>
                    </div>

                    {/* Week Action Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border-main)]/60 text-[11px] font-mono">
                      <span className="text-[var(--text-secondary)]">
                        {w.monthTitle}
                      </span>

                      {w.week === 1 ? (
                        <Link
                          href="/lesson/day-01"
                          className="px-4 py-1.5 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] uppercase font-medium flex items-center space-x-1 transition-colors"
                        >
                          <span>VÀO BÀI HỌC DAY 01</span>
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      ) : (
                        <span className="text-[var(--text-secondary)] uppercase">
                          KẾ HOẠCH HỌC TẬP
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[var(--border-main)] px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] gap-2">
        <div>ORYZO // AI SOFTWARE ENGINEER ROADMAP — 26 TUẦN TOÀN DIỆN</div>
        <div>TÀI NGUYÊN NỘI BỘ DỰ ÁN AI TEAM</div>
      </footer>
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
