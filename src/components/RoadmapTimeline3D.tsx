"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MONTHS_OVERVIEW, MonthOverview } from "@/lib/roadmap-data";
import { useTheme } from "@/context/ThemeContext";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Compass,
} from "lucide-react";

interface RoadmapTimeline3DProps {
  onSelectMonth: (monthNumber: number) => void;
}

export default function RoadmapTimeline3D({ onSelectMonth }: RoadmapTimeline3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const activeMonth = MONTHS_OVERVIEW[activeMonthIndex];

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const stationsGroupRef = useRef<THREE.Group[]>([]);
  const stationCoresRef = useRef<THREE.Group[]>([]);
  const curvePulseRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Camera smooth target
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraDesiredPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 3.8, 11));

  // Drag rotation
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitAngleRef = useRef<{ theta: number; phi: number }>({ theta: 0, phi: 0.35 });

  // Stations 3D coordinates (curved highway path)
  const stationCoords: [number, number, number][] = [
    [-8.0, -0.6, 2.2],
    [-4.8, 0.1, 0.4],
    [-1.6, -0.2, -1.0],
    [1.6, 0.3, -1.0],
    [4.8, -0.1, 0.4],
    [8.0, 0.5, 2.2],
  ];

  const updateCameraTarget = (index: number) => {
    const coord = stationCoords[index];
    if (!coord) return;
    cameraTargetRef.current.set(coord[0], coord[1], coord[2]);
    cameraDesiredPosRef.current.set(coord[0], coord[1] + 2.8, coord[2] + 6.2);
  };

  useEffect(() => {
    updateCameraTarget(activeMonthIndex);
  }, [activeMonthIndex]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveMonthIndex((prev) => (prev + 1) % MONTHS_OVERVIEW.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 3.8, 11);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 2. Lighting setup
    const isDark = theme === "dark";
    const ambientLight = new THREE.AmbientLight(isDark ? 0xffeedd : 0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffecd0, isDark ? 1.5 : 1.8);
    dirLight1.position.set(8, 14, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xdc5000, isDark ? 1.4 : 0.8);
    dirLight2.position.set(-10, -6, -8);
    scene.add(dirLight2);

    // 3. Curved Pathway (Data Highway)
    const points = stationCoords.map((c) => new THREE.Vector3(c[0], c[1], c[2]));
    const curve = new THREE.CatmullRomCurve3(points);

    // Tube highway
    const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.05, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xe2e8f0,
      metalness: 0.7,
      roughness: 0.3,
      emissive: isDark ? 0x38bdf8 : 0x0056d2,
      emissiveIntensity: isDark ? 0.4 : 0.25,
    });
    const highwayTube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(highwayTube);

    // Flowing glowing pulses along the highway
    const pulseCount = 8;
    const pulses: THREE.Mesh[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0056d2,
    });

    for (let i = 0; i < pulseCount; i++) {
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(pulseMesh);
      pulses.push(pulseMesh);
    }
    curvePulseRef.current = pulses;

    // 4. Construct 6 Stations (Milestone Stations)
    const stationGroups: THREE.Group[] = [];
    const stationCores: THREE.Group[] = [];

    stationCoords.forEach((coord, i) => {
      const stationGroup = new THREE.Group();
      stationGroup.position.set(coord[0], coord[1], coord[2]);
      (stationGroup as any).monthIndex = i;

      // Base Pedestal
      const pedestalGeo = new THREE.CylinderGeometry(0.9, 1.05, 0.16, 32);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0xf8fafc,
        metalness: 0.8,
        roughness: 0.25,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = -0.08;
      stationGroup.add(pedestal);

      // Glowing Rim Ring
      const rimGeo = new THREE.TorusGeometry(0.98, 0.025, 16, 48);
      const rimMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x38bdf8 : 0x0056d2,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.02;
      stationGroup.add(rim);

      // Holographic Core Architecture for each Month
      const coreGroup = new THREE.Group();
      coreGroup.position.y = 0.65;

      if (i === 0) {
        // Month 1: 3D Data Matrix (Voxel Grid of Tensors)
        const cubeMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0xdc5000 : 0xb45309,
          metalness: 0.6,
          roughness: 0.3,
          wireframe: false,
        });
        const miniCubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              const miniCube = new THREE.Mesh(miniCubeGeo, cubeMat);
              miniCube.position.set(x * 0.24, y * 0.24, z * 0.24);
              coreGroup.add(miniCube);
            }
          }
        }
      } else if (i === 1) {
        // Month 2: Neural Torus & MLP Ring (Loss & Weights)
        const torusGeo = new THREE.TorusGeometry(0.42, 0.08, 16, 36);
        const torusMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0xe67e22 : 0xd97706,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0xe67e22,
          emissiveIntensity: 0.3,
        });
        const torus1 = new THREE.Mesh(torusGeo, torusMat);
        const torus2 = new THREE.Mesh(torusGeo, torusMat);
        torus2.rotation.x = Math.PI / 2;
        coreGroup.add(torus1);
        coreGroup.add(torus2);

        const centerSphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffedd7 })
        );
        coreGroup.add(centerSphere);
      } else if (i === 2) {
        // Month 3: Transformer Cube & Self-Attention Ring
        const cubeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0xf39c12 : 0xd97706,
          metalness: 0.9,
          roughness: 0.1,
          wireframe: true,
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        coreGroup.add(cube);

        const innerOcta = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.3, 0),
          new THREE.MeshStandardMaterial({
            color: 0xdc5000,
            metalness: 0.5,
            roughness: 0.2,
          })
        );
        coreGroup.add(innerOcta);
      } else if (i === 3) {
        // Month 4: Vector Database Stack (Cylinders & Embeddings)
        const discGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.09, 24);
        const discMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0x10b981 : 0x059669,
          metalness: 0.7,
          roughness: 0.3,
        });
        for (let d = -1; d <= 1; d++) {
          const disc = new THREE.Mesh(discGeo, discMat);
          disc.position.y = d * 0.18;
          coreGroup.add(disc);
        }
      } else if (i === 4) {
        // Month 5: Multi-Agent Planetary System (Center + Orbiting Satellites)
        const sun = new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 20, 20),
          new THREE.MeshStandardMaterial({
            color: isDark ? 0x3b82f6 : 0x2563eb,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.4,
          })
        );
        coreGroup.add(sun);

        const satGeo = new THREE.SphereGeometry(0.09, 12, 12);
        const satMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
        for (let s = 0; s < 3; s++) {
          const sat = new THREE.Mesh(satGeo, satMat);
          const angle = (s * Math.PI * 2) / 3;
          sat.position.set(Math.cos(angle) * 0.52, 0, Math.sin(angle) * 0.52);
          coreGroup.add(sat);
        }
      } else {
        // Month 6: Capstone Platform (Monolith Tower with Crown Beacon)
        const towerGeo = new THREE.BoxGeometry(0.38, 0.85, 0.38);
        const towerMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0x8b5cf6 : 0x7c3aed,
          metalness: 0.85,
          roughness: 0.2,
        });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        coreGroup.add(tower);

        const crown = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.18, 0),
          new THREE.MeshBasicMaterial({ color: 0xffeed7 })
        );
        crown.position.y = 0.58;
        coreGroup.add(crown);
      }

      stationGroup.add(coreGroup);
      scene.add(stationGroup);

      stationGroups.push(stationGroup);
      stationCores.push(coreGroup);
    });

    stationsGroupRef.current = stationGroups;
    stationCoresRef.current = stationCores;

    // 5. Click Raycasting
    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(stationGroups, true);

      if (intersects.length > 0) {
        let obj: any = intersects[0].object;
        while (obj.parent && obj.parent !== scene) {
          if (obj.monthIndex !== undefined) {
            setActiveMonthIndex(obj.monthIndex);
            setIsAutoPlaying(false);
            break;
          }
          obj = obj.parent;
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;

      orbitAngleRef.current.theta -= deltaX * 0.005;
      orbitAngleRef.current.phi = Math.max(
        0.1,
        Math.min(1.2, orbitAngleRef.current.phi - deltaY * 0.005)
      );

      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    // 6. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Station 3D Cores
      stationCores.forEach((core, idx) => {
        const speed = idx === activeMonthIndex ? 1.4 : 0.6;
        core.rotation.y = elapsedTime * speed;
        // Floating hover motion
        core.position.y = 0.65 + Math.sin(elapsedTime * 2 + idx) * 0.05;
      });

      // Update flowing light pulses
      pulses.forEach((pulse, pIdx) => {
        const t = (elapsedTime * 0.12 + pIdx / pulseCount) % 1.0;
        const pt = curve.getPointAt(t);
        pulse.position.copy(pt);
      });

      // Camera lerp towards target station
      const targetPos = cameraDesiredPosRef.current;
      const targetLookAt = cameraTargetRef.current;

      camera.position.lerp(targetPos, 0.05);
      const currentLookAt = new THREE.Vector3();
      camera.getWorldDirection(currentLookAt);
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 460;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, [theme]);

  return (
    <div className="relative w-full rounded-[16px] border border-[var(--border-main)] bg-[var(--surface-card)] overflow-hidden shadow-xl">
      {/* 1. Header Toolbar of the 3D Timeline */}
      <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-[var(--border-main)] flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-[var(--bg-canvas)]/60 backdrop-blur-md">
        <div className="flex items-center space-x-2 sm:space-x-2.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--accent-ember)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-ember)] animate-pulse shrink-0" />
          <span className="truncate">3D TIMELINE // 6 GIAI ĐOẠN PHÁT TRIỂN</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Auto tour button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1.5 rounded-[22.5px] border text-[10px] font-mono tracking-wider uppercase flex items-center space-x-1.5 transition-colors ${
              isAutoPlaying
                ? "bg-[var(--accent-ember)] text-white border-[var(--accent-ember)]"
                : "border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoPlaying ? "DỪNG TỰ ĐỘNG" : "CHẠY TỰ ĐỘNG"}</span>
          </button>

          {/* Prev / Next buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveMonthIndex((prev) => (prev > 0 ? prev - 1 : MONTHS_OVERVIEW.length - 1));
              }}
              className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors"
              title="Tháng trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveMonthIndex((prev) => (prev < MONTHS_OVERVIEW.length - 1 ? prev + 1 : 0));
              }}
              className="p-1.5 rounded-full border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors"
              title="Tháng tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Three.js Canvas Stage */}
      <div className="relative w-full h-[340px] sm:h-[440px] cursor-grab active:cursor-grabbing">
        <div ref={containerRef} className="w-full h-full" />

        {/* Subtle 3D Navigation Hint Pill */}
        <div className="hidden sm:block absolute top-4 left-4 z-20 pointer-events-none px-3 py-1 rounded-[22.5px] bg-[var(--surface-elevated)]/80 backdrop-blur-md border border-[var(--border-main)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          KÉO CHUỘT XOAY 3D • BẤM ĐỂ CHỌN TRẠM THÁNG
        </div>

        {/* 6-Month Quick Pills on Canvas */}
        <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-1 max-w-[280px] justify-end">
          {MONTHS_OVERVIEW.map((m, idx) => (
            <button
              key={m.month}
              onClick={() => {
                setActiveMonthIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-[16px] text-[10px] font-mono tracking-wider transition-all ${
                activeMonthIndex === idx
                  ? "bg-[var(--accent-ember)] text-white font-medium shadow-md scale-105"
                  : "bg-[var(--surface-card)]/80 backdrop-blur-md border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              T0{m.month}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Active Month Inspection & Detail Card (Docked Bottom) */}
      <div className="p-6 border-t border-[var(--border-main)] bg-[var(--surface-elevated)]/40 backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2.5">
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <span className="px-2.5 py-0.5 rounded-[12px] bg-[var(--accent-ember)]/15 text-[var(--accent-ember)] font-medium uppercase tracking-wider">
                THÁNG 0{activeMonth.month} // {activeMonth.weeks}
              </span>
              <span className="text-[var(--text-secondary)] uppercase">
                TRẠM ĐÀO TẠO NĂNG LỰC
              </span>
            </div>

            <h3 className="text-[20px] sm:text-[24px] font-medium uppercase tracking-tight text-[var(--text-primary)] leading-tight">
              {activeMonth.title}
            </h3>

            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {activeMonth.focus}
            </p>

            <div className="flex items-center space-x-2 text-[12px] font-mono text-[var(--accent-ember)] pt-1">
              <Award className="w-4 h-4 shrink-0" />
              <span>{activeMonth.highlight}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-stretch lg:items-end">
            <button
              onClick={() => onSelectMonth(activeMonth.month)}
              className="h-[46px] px-6 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-widest uppercase border border-[var(--border-main)] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>XEM CHI TIẾT 4 TUẦN NÀY</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-ember)]" />
            </button>

            <div className="text-[10px] font-mono text-[var(--text-secondary)] text-center lg:text-right">
              Chuyển sang Tab 02 với bộ lọc Tháng 0{activeMonth.month}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
