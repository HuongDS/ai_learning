"use client";

import React, { useEffect, useRef, useState } from "react";
import { WEEKS_DATA, MONTHS_OVERVIEW, WeekData, MonthOverview } from "@/lib/roadmap-data";
import { useTheme } from "@/context/ThemeContext";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Search,
  Filter,
  Award,
  BookOpen,
  ArrowRight,
  X,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface GraphNode {
  id: string;
  label: string;
  shortLabel: string;
  type: "root" | "month" | "week";
  month?: number;
  weekNumber?: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  weekData?: WeekData;
  monthData?: MonthOverview;
  isMilestone?: boolean;
}

interface GraphEdge {
  source: string;
  target: string;
  length: number;
  strength: number;
  color?: string;
}

interface ObsidianGraphViewProps {
  onSwitchToCards?: (targetWeek?: number) => void;
  selectedMonthFilter?: number | "all";
}

export default function ObsidianGraphView({
  onSwitchToCards,
  selectedMonthFilter = "all",
}: ObsidianGraphViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // State
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<number | "all">(selectedMonthFilter);
  const [onlyMilestones, setOnlyMilestones] = useState<boolean>(false);

  // Transform (pan & zoom)
  const transformRef = useRef({ x: 0, y: 0, scale: 0.95 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<GraphNode | null>(null);

  // Graph data references
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);

  // Initialize graph nodes & edges
  useEffect(() => {
    const isDark = theme === "dark";
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    // 1. Central Core Root
    const rootNode: GraphNode = {
      id: "root",
      label: "AI SOFTWARE ENGINEER CURRICULUM",
      shortLabel: "AI CORE",
      type: "root",
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 22,
      color: isDark ? "#38bdf8" : "#0056d2",
    };
    nodes.push(rootNode);

    // 2. Month Hubs (6 Nodes arranged in circle around root)
    MONTHS_OVERVIEW.forEach((m, idx) => {
      const angle = (idx / MONTHS_OVERVIEW.length) * Math.PI * 2 - Math.PI / 2;
      const dist = 140;
      const monthNode: GraphNode = {
        id: `month-${m.month}`,
        label: `Tháng 0${m.month}: ${m.title}`,
        shortLabel: `T0${m.month}`,
        type: "month",
        month: m.month,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: 17,
        color: m.color || "#dc5000",
        monthData: m,
      };
      nodes.push(monthNode);

      // Edge from root to month hub
      edges.push({
        source: "root",
        target: monthNode.id,
        length: 130,
        strength: 0.05,
        color: m.color,
      });
    });

    // 3. 26 Week Nodes
    WEEKS_DATA.forEach((w) => {
      const monthHub = nodes.find((n) => n.id === `month-${w.month}`);
      const baseAngle = ((w.month - 1) / 6) * Math.PI * 2 - Math.PI / 2;
      const weekOffset = ((w.week % 4) - 2) * 0.45;
      const dist = 240 + ((w.week % 2) === 0 ? 30 : -20);
      const angle = baseAngle + weekOffset;

      const weekNode: GraphNode = {
        id: `week-${w.week}`,
        label: `Tuần ${w.week < 10 ? "0" + w.week : w.week}: ${w.title}`,
        shortLabel: `W${w.week < 10 ? "0" + w.week : w.week}`,
        type: "week",
        month: w.month,
        weekNumber: w.week,
        x: Math.cos(angle) * dist + (Math.random() - 0.5) * 20,
        y: Math.sin(angle) * dist + (Math.random() - 0.5) * 20,
        vx: 0,
        vy: 0,
        radius: w.isMilestone ? 12 : 8.5,
        color: monthHub ? monthHub.color : "#dc5000",
        weekData: w,
        isMilestone: w.isMilestone,
      };
      nodes.push(weekNode);

      // Edge from week to its month
      edges.push({
        source: `month-${w.month}`,
        target: weekNode.id,
        length: 95,
        strength: 0.07,
        color: monthHub?.color,
      });

      // Chain edge to previous week (sequential progression)
      if (w.week > 1) {
        edges.push({
          source: `week-${w.week - 1}`,
          target: `week-${w.week}`,
          length: 55,
          strength: 0.04,
          color: isDark ? "rgba(220, 80, 0, 0.25)" : "rgba(180, 83, 9, 0.25)",
        });
      }
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, [theme]);

  // Canvas Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.parentElement?.clientHeight || 600;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Center transform initially
    transformRef.current.x = width / 2;
    transformRef.current.y = height / 2;

    const isDark = theme === "dark";

    const render = () => {
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // 1. Force Physics Simulation Step
      const repulsion = 450;
      const centering = 0.0012;
      const damping = 0.86;

      // Node Repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 320) {
            const force = repulsion / distSq;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (n1 !== draggedNodeRef.current) {
              n1.vx -= fx;
              n1.vy -= fy;
            }
            if (n2 !== draggedNodeRef.current) {
              n2.vx += fx;
              n2.vy += fy;
            }
          }
        }
      }

      // Edge Springs Attraction
      const nodeMap = new Map<string, GraphNode>();
      nodes.forEach((n) => nodeMap.set(n.id, n));

      edges.forEach((edge) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const displacement = dist - edge.length;
        const force = displacement * edge.strength;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (source !== draggedNodeRef.current) {
          source.vx += fx;
          source.vy += fy;
        }
        if (target !== draggedNodeRef.current) {
          target.vx -= fx;
          target.vy -= fy;
        }
      });

      // Gravity to Center & Position update
      nodes.forEach((n) => {
        if (n === draggedNodeRef.current) return;
        n.vx -= n.x * centering;
        n.vy -= n.y * centering;

        n.vx *= damping;
        n.vy *= damping;

        n.x += n.vx;
        n.y += n.vy;
      });

      // 2. Render Canvas Frame
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Background subtle canvas
      ctx.fillStyle = isDark ? "#090d16" : "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Apply Pan & Zoom Transform
      ctx.save();
      ctx.translate(transformRef.current.x, transformRef.current.y);
      ctx.scale(transformRef.current.scale, transformRef.current.scale);

      // Filter matching state
      const isFiltered = (n: GraphNode) => {
        if (monthFilter !== "all" && n.month !== undefined && n.month !== monthFilter) {
          return false;
        }
        if (onlyMilestones && n.type === "week" && !n.isMilestone) {
          return false;
        }
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchLabel = n.label.toLowerCase().includes(q);
          const matchTag = n.weekData?.tag.toLowerCase().includes(q);
          const matchHandsOn = n.weekData?.handsOn.toLowerCase().includes(q);
          if (!matchLabel && !matchTag && !matchHandsOn) return false;
        }
        return true;
      };

      // Draw Edges
      edges.forEach((edge) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) return;

        const isSourceActive = isFiltered(source);
        const isTargetActive = isFiltered(target);
        const isHoverConnected =
          hoveredNode &&
          (hoveredNode.id === source.id || hoveredNode.id === target.id);

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (isHoverConnected) {
          ctx.strokeStyle = isDark ? "#38bdf8" : "#0056d2";
          ctx.lineWidth = 2.0;
          ctx.globalAlpha = 0.9;
        } else if (isSourceActive && isTargetActive) {
          ctx.strokeStyle = edge.color || (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,86,210,0.2)");
          ctx.lineWidth = edge.source === "root" ? 1.4 : 0.9;
          ctx.globalAlpha = isDark ? 0.35 : 0.45;
        } else {
          ctx.strokeStyle = isDark ? "#1e293b" : "#e2e8f0";
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.15;
        }

        ctx.stroke();
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const active = isFiltered(node);
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;

        const alpha = active ? (isHovered || isSelected ? 1 : 0.85) : 0.15;
        ctx.globalAlpha = alpha;

        // Node Glow Halo
        if (isHovered || isSelected || node.type === "root" || node.isMilestone) {
          const glowGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            node.radius * 0.5,
            node.x,
            node.y,
            node.radius * 2.5
          );
          glowGrad.addColorStop(0, node.color);
          glowGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node Border
        ctx.strokeStyle = isDark ? "#ffffff" : "#000000";
        ctx.lineWidth = isHovered || isSelected ? 2.5 : 1;
        ctx.stroke();

        // Extra Pulsing Milestone Ring
        if (node.isMilestone) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Labels
        const shouldShowLabel =
          isHovered ||
          isSelected ||
          node.type === "root" ||
          node.type === "month" ||
          transformRef.current.scale > 1.2 ||
          (node.isMilestone && active);

        if (shouldShowLabel && active) {
          ctx.globalAlpha = isHovered || isSelected ? 1 : 0.85;
          ctx.font = node.type === "root" ? "bold 13px monospace" : "11px monospace";
          ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.shortLabel, node.x, node.y + node.radius + 5);
        }
      });

      ctx.restore();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize observer
    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || 800;
      height = canvas.parentElement?.clientHeight || 600;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, monthFilter, onlyMilestones, searchQuery, hoveredNode, selectedNode]);

  // Mouse & Touch Interaction Handlers
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left - transformRef.current.x) / transformRef.current.scale;
    const y = (clientY - rect.top - transformRef.current.y) / transformRef.current.scale;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    const nodes = nodesRef.current;

    // Check if clicked a node
    let clickedNode: GraphNode | null = null;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist <= node.radius + 6) {
        clickedNode = node;
        break;
      }
    }

    if (clickedNode) {
      draggedNodeRef.current = clickedNode;
      setSelectedNode(clickedNode);
    } else {
      isPanningRef.current = true;
      panStartRef.current = {
        x: e.clientX - transformRef.current.x,
        y: e.clientY - transformRef.current.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNodeRef.current) {
      const { x, y } = getCanvasCoords(e.clientX, e.clientY);
      draggedNodeRef.current.x = x;
      draggedNodeRef.current.y = y;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else if (isPanningRef.current) {
      transformRef.current.x = e.clientX - panStartRef.current.x;
      transformRef.current.y = e.clientY - panStartRef.current.y;
    } else {
      // Hover detection
      const { x, y } = getCanvasCoords(e.clientX, e.clientY);
      const nodes = nodesRef.current;
      let found: GraphNode | null = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        const dist = Math.hypot(node.x - x, node.y - y);
        if (dist <= node.radius + 6) {
          found = node;
          break;
        }
      }
      setHoveredNode(found);
    }
  };

  const handleMouseUp = () => {
    isPanningRef.current = false;
    draggedNodeRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.max(0.35, Math.min(3.2, transformRef.current.scale * zoomFactor));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    transformRef.current.x = mouseX - (mouseX - transformRef.current.x) * (newScale / transformRef.current.scale);
    transformRef.current.y = mouseY - (mouseY - transformRef.current.y) * (newScale / transformRef.current.scale);
    transformRef.current.scale = newScale;
  };

  const resetView = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    transformRef.current = {
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2,
      scale: 0.95,
    };
  };

  const zoomIn = () => {
    transformRef.current.scale = Math.min(3.2, transformRef.current.scale * 1.25);
  };

  const zoomOut = () => {
    transformRef.current.scale = Math.max(0.35, transformRef.current.scale * 0.8);
  };

  return (
    <div className="relative w-full rounded-[16px] border border-[var(--border-main)] bg-[var(--surface-card)] overflow-hidden shadow-xl flex flex-col">
      {/* 1. Obsidian Toolbar */}
      <div className="px-5 py-3.5 border-b border-[var(--border-main)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-canvas)]/75 backdrop-blur-md z-20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)] animate-pulse" />
            <span>OBSIDIAN KNOWLEDGE GRAPH // 26 TUẦN</span>
          </div>

          <span className="text-[10px] font-mono uppercase text-[var(--text-secondary)] border-l border-[var(--border-main)] pl-3 hidden sm:inline-block">
            33 NODES • 38 EDGES
          </span>
        </div>

        {/* Search & Month Filter Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Quick Search */}
          <div className="relative w-44 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm node..."
              className="w-full h-[32px] pl-8 pr-3 bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-[18px] text-[11px] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-ember)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Month Hub Filters */}
          <div className="hidden lg:flex items-center space-x-1 font-mono text-[10px]">
            <button
              onClick={() => setMonthFilter("all")}
              className={`px-2.5 py-1 rounded-[16px] transition-colors ${
                monthFilter === "all"
                  ? "bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
              }`}
            >
              ALL
            </button>
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <button
                key={m}
                onClick={() => setMonthFilter(m)}
                className={`px-2.5 py-1 rounded-[16px] transition-colors ${
                  monthFilter === m
                    ? "bg-[var(--accent-ember)] text-white font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]"
                }`}
              >
                T{m}
              </button>
            ))}
          </div>

          {/* Toggle Milestones Only */}
          <button
            onClick={() => setOnlyMilestones(!onlyMilestones)}
            className={`px-3 py-1 rounded-[16px] text-[10px] font-mono uppercase tracking-wider border transition-colors flex items-center space-x-1 ${
              onlyMilestones
                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                : "border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Award className="w-3 h-3" />
            <span className="hidden sm:inline">MILESTONES</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 border-l border-[var(--border-main)] pl-2">
            <button
              onClick={zoomIn}
              className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)]"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={zoomOut}
              className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)]"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)]"
              title="Căn giữa đồ thị"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Graph Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[520px] sm:h-[620px] cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full block"
        />

        {/* Floating Instruction Pill */}
        <div className="hidden sm:flex absolute bottom-4 left-4 z-10 pointer-events-none px-3 py-1.5 rounded-[22.5px] bg-[var(--surface-elevated)]/85 backdrop-blur-md border border-[var(--border-main)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] items-center space-x-2">
          <Sparkles className="w-3 h-3 text-[var(--accent-ember)]" />
          <span>KÉO THẢ NODE • CUỘN ĐỂ PHÓNG TO • BẤM ĐỂ XEM CHI TIẾT</span>
        </div>

        {/* Hover Floating Tooltip */}
        {hoveredNode && !selectedNode && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none p-3 rounded-[10px] bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-main)] shadow-xl max-w-xs space-y-1">
            <div className="text-[10px] font-mono text-[var(--accent-ember)] uppercase font-medium">
              {hoveredNode.type === "week"
                ? `TUẦN 0${hoveredNode.weekNumber} // ${hoveredNode.weekData?.tag}`
                : hoveredNode.type === "month"
                ? `THÁNG 0${hoveredNode.month}`
                : "ROOT HUB"}
            </div>
            <div className="text-[12px] font-medium text-[var(--text-primary)] leading-snug">
              {hoveredNode.label}
            </div>
            {hoveredNode.isMilestone && (
              <div className="text-[10px] font-mono text-amber-400 flex items-center space-x-1 pt-1">
                <Award className="w-3 h-3" />
                <span>MILESTONE QUAN TRỌNG</span>
              </div>
            )}
          </div>
        )}

        {/* 3. Floating Detail Inspector Card (When Node is Clicked) */}
        {selectedNode && (
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-auto right-2 sm:right-4 z-30 max-w-none sm:max-w-md p-4 sm:p-5 rounded-[14px] bg-[var(--surface-card)]/95 backdrop-blur-lg border border-[var(--accent-ember)]/60 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start justify-between border-b border-[var(--border-main)] pb-2.5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-ember)] font-medium">
                  {selectedNode.type === "week"
                    ? `TUẦN 0${selectedNode.weekNumber} // THÁNG 0${selectedNode.month}`
                    : selectedNode.type === "month"
                    ? `HUB THÁNG 0${selectedNode.month}`
                    : "HẠT NHÂN CHƯƠNG TRÌNH"}
                </span>
                <h4 className="text-[16px] font-medium text-[var(--text-primary)] uppercase tracking-tight mt-0.5">
                  {selectedNode.label}
                </h4>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedNode.type === "week" && selectedNode.weekData && (
              <div className="space-y-3 text-[12px]">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[var(--text-secondary)]">MỤC TIÊU & LÝ THUYẾT:</div>
                  <ul className="list-disc pl-4 mt-1 text-[var(--text-primary)] space-y-0.5 text-[11px] leading-relaxed">
                    {selectedNode.weekData.theory.slice(0, 2).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-[8px] bg-[var(--bg-canvas)] border border-[var(--border-main)]">
                  <div className="text-[10px] font-mono uppercase text-[var(--accent-ember)]">BÀI THỰC HÀNH & DELIVERABLE:</div>
                  <div className="text-[11px] text-[var(--text-primary)] mt-1 font-mono">
                    {selectedNode.weekData.deliverable}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {selectedNode.weekNumber === 1 ? (
                    <Link
                      href="/lesson/day-01"
                      className="flex-1 h-[36px] px-4 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[10px] font-medium tracking-wider uppercase flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[var(--accent-ember)]" />
                      <span>VÀO BÀI HỌC DAY 01</span>
                    </Link>
                  ) : (
                    onSwitchToCards && (
                      <button
                        onClick={() => onSwitchToCards(selectedNode.weekNumber)}
                        className="flex-1 h-[36px] px-4 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[10px] font-medium tracking-wider uppercase flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <span>XEM CHI TIẾT TRONG CARDS</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-ember)]" />
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {selectedNode.type === "month" && selectedNode.monthData && (
              <div className="space-y-3 text-[12px]">
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  {selectedNode.monthData.focus}
                </p>
                <div className="text-[11px] font-mono text-[var(--accent-ember)] flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{selectedNode.monthData.highlight}</span>
                </div>
                {onSwitchToCards && (
                  <button
                    onClick={() => onSwitchToCards()}
                    className="w-full h-[36px] px-4 rounded-[22.5px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[10px] font-medium tracking-wider uppercase flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>LỌC TOÀN BỘ TUẦN CỦA THÁNG NÀY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-ember)]" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
