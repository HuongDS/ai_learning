"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface ComputeDieSceneProps {
  isExploded?: boolean;
  quantMode?: "FP16" | "INT8" | "INT4";
  onInspectCore?: (coreName: string) => void;
}

export default function ComputeDieScene({
  isExploded = false,
  quantMode = "FP16",
  onInspectCore,
}: ComputeDieSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // References for animation state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupsRef = useRef<{
    root: THREE.Group;
    substrate: THREE.Mesh;
    computeDie: THREE.Group;
    tensorCores: THREE.Mesh[];
    hbmStacks: THREE.Group[];
    traces: THREE.LineSegments;
  } | null>(null);

  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.003 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4.2, 5.8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = theme === "light" ? 1.4 : 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Adapts to Dark / Light mode)
    const ambientColor = theme === "light" ? 0xeae0d4 : 0x2a1a10;
    const ambientIntensity = theme === "light" ? 2.8 : 2.2;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);

    // Warm rim light from upper right
    const rimColor = theme === "light" ? 0xfff3e6 : 0xffedd7;
    const rimLight = new THREE.DirectionalLight(rimColor, theme === "light" ? 3.0 : 3.5);
    rimLight.position.set(5, 7, 3);
    scene.add(rimLight);

    // Ember accent backlight
    const backEmberLight = new THREE.DirectionalLight(0xdc5000, theme === "light" ? 2.0 : 2.5);
    backEmberLight.position.set(-6, -2, -5);
    scene.add(backEmberLight);

    // Bottom bounce
    const bounceColor = theme === "light" ? 0xd0c4b2 : 0x382416;
    const bounceLight = new THREE.DirectionalLight(bounceColor, 1.2);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // 3. Build The 3D Compute Die Structure
    const root = new THREE.Group();
    scene.add(root);

    // --- Substrate (Base board) ---
    const substrateGeo = new THREE.BoxGeometry(4.2, 0.15, 3.8);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: theme === "light" ? 0x2e231b : 0x18120d,
      roughness: 0.6,
      metalness: 0.35,
    });
    const substrate = new THREE.Mesh(substrateGeo, substrateMat);
    substrate.position.y = -0.1;
    root.add(substrate);

    // Substrate border ring
    const borderEdges = new THREE.EdgesGeometry(substrateGeo);
    const borderLine = new THREE.LineSegments(
      borderEdges,
      new THREE.LineBasicMaterial({
        color: theme === "light" ? 0xa89987 : 0x40372e,
        linewidth: 1,
      })
    );
    substrate.add(borderLine);

    // --- Compute Die (Central Silicon Plate) ---
    const computeDieGroup = new THREE.Group();
    const dieGeo = new THREE.BoxGeometry(2.0, 0.12, 2.0);
    const dieMat = new THREE.MeshStandardMaterial({
      color: theme === "light" ? 0x3d2f24 : 0x241a12,
      roughness: 0.25,
      metalness: 0.85,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.y = 0.08;
    computeDieGroup.add(dieMesh);

    // Etched grid lines on central die
    const dieGridEdges = new THREE.EdgesGeometry(dieGeo);
    const dieGridLine = new THREE.LineSegments(
      dieGridEdges,
      new THREE.LineBasicMaterial({ color: 0xdc5000, opacity: 0.7, transparent: true })
    );
    dieMesh.add(dieGridLine);

    // --- Tensor Cores (4x4 matrix of micro-cores) ---
    const tensorCores: THREE.Mesh[] = [];
    const coreGeo = new THREE.BoxGeometry(0.32, 0.08, 0.32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: theme === "light" ? 0x483222 : 0x3d2719,
      emissive: 0xdc5000,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.9,
    });

    const gridSize = 4;
    const spacing = 0.42;
    const offset = ((gridSize - 1) * spacing) / 2;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const core = new THREE.Mesh(coreGeo, coreMat.clone());
        core.position.set(c * spacing - offset, 0.18, r * spacing - offset);
        core.userData = {
          name: `TENSOR_CORE_[${r},${c}]`,
          phase: Math.random() * Math.PI * 2,
        };
        computeDieGroup.add(core);
        tensorCores.push(core);
      }
    }
    root.add(computeDieGroup);

    // --- High Bandwidth Memory (HBM3) Stacks ---
    const hbmStacks: THREE.Group[] = [];
    const hbmPositions = [
      { x: -1.5, z: -0.7 },
      { x: -1.5, z: 0.7 },
      { x: 1.5, z: -0.7 },
      { x: 1.5, z: 0.7 },
    ];

    hbmPositions.forEach((pos, idx) => {
      const hbmGroup = new THREE.Group();
      hbmGroup.position.set(pos.x, 0.08, pos.z);

      for (let layer = 0; layer < 4; layer++) {
        const layerGeo = new THREE.BoxGeometry(0.72, 0.06, 0.85);
        const layerMat = new THREE.MeshStandardMaterial({
          color: layer % 2 === 0 ? 0x322419 : 0x221710,
          roughness: 0.3,
          metalness: 0.8,
        });
        const layerMesh = new THREE.Mesh(layerGeo, layerMat);
        layerMesh.position.y = layer * 0.07;
        hbmGroup.add(layerMesh);
      }

      // Memory top heat cap
      const capGeo = new THREE.BoxGeometry(0.68, 0.02, 0.8);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x40372e,
        emissive: 0xdc5000,
        emissiveIntensity: 0.15,
        roughness: 0.4,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 4 * 0.07;
      hbmGroup.add(capMesh);

      hbmGroup.userData = { name: `HBM3_STACK_0${idx + 1}` };
      root.add(hbmGroup);
      hbmStacks.push(hbmGroup);
    });

    // --- High Speed Interconnect Traces ---
    const tracePoints: THREE.Vector3[] = [];
    hbmPositions.forEach((hbmPos) => {
      const startX = hbmPos.x;
      const startZ = hbmPos.z;
      const endX = hbmPos.x > 0 ? 0.9 : -0.9;
      const endZ = hbmPos.z * 0.6;

      for (let i = -2; i <= 2; i++) {
        const offsetZ = i * 0.05;
        tracePoints.push(new THREE.Vector3(startX, 0.03, startZ + offsetZ));
        tracePoints.push(new THREE.Vector3(endX, 0.03, endZ + offsetZ));
      }
    });

    const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
    const traceMat = new THREE.LineBasicMaterial({
      color: theme === "light" ? 0x8a6f52 : 0xffedd7,
      transparent: true,
      opacity: theme === "light" ? 0.6 : 0.4,
    });
    const traces = new THREE.LineSegments(traceGeo, traceMat);
    root.add(traces);

    groupsRef.current = {
      root,
      substrate,
      computeDie: computeDieGroup,
      tensorCores,
      hbmStacks,
      traces,
    };

    // 4. Interaction Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      rotationVelocity.current.y = deltaX * 0.006;
      rotationVelocity.current.x = deltaY * 0.004;

      root.rotation.y += rotationVelocity.current.y;
      root.rotation.x = Math.max(-0.4, Math.min(0.7, root.rotation.x + rotationVelocity.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      root.rotation.y += deltaX * 0.007;
      root.rotation.x = Math.max(-0.4, Math.min(0.7, root.rotation.x + deltaY * 0.005));

      previousMousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    domElement.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDraggingRef.current) {
        rotationVelocity.current.y *= 0.95;
        root.rotation.y += Math.max(0.002, rotationVelocity.current.y);
        root.position.y = Math.sin(elapsedTime * 1.2) * 0.06;
      }

      const speedMultiplier = quantMode === "INT4" ? 6.5 : quantMode === "INT8" ? 4.0 : 2.0;
      tensorCores.forEach((core) => {
        const mat = core.material as THREE.MeshStandardMaterial;
        const phase = core.userData.phase || 0;
        const pulse = (Math.sin(elapsedTime * speedMultiplier + phase) + 1) / 2;
        mat.emissiveIntensity = 0.2 + pulse * (quantMode === "INT4" ? 1.4 : 0.8);
      });

      traceMat.opacity = (theme === "light" ? 0.4 : 0.25) + Math.sin(elapsedTime * 3.5) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      domElement.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [quantMode, theme]);

  // Explode animation effect
  useEffect(() => {
    if (!groupsRef.current) return;
    const { substrate, computeDie, hbmStacks } = groupsRef.current;

    const targetSubstrateY = isExploded ? -0.65 : -0.1;
    const targetDieY = isExploded ? 0.75 : 0;
    const targetHbmSpacing = isExploded ? 1.45 : 1.0;

    let t = 0;
    const interval = setInterval(() => {
      t += 0.1;
      substrate.position.y = THREE.MathUtils.lerp(substrate.position.y, targetSubstrateY, 0.25);
      computeDie.position.y = THREE.MathUtils.lerp(computeDie.position.y, targetDieY, 0.25);

      hbmStacks.forEach((stack) => {
        const basePos = stack.position;
        const targetX = (basePos.x > 0 ? 1.5 : -1.5) * targetHbmSpacing;
        const targetZ = (basePos.z > 0 ? 0.7 : -0.7) * targetHbmSpacing;
        const targetY = isExploded ? 0.35 : 0.08;

        stack.position.x = THREE.MathUtils.lerp(stack.position.x, targetX, 0.2);
        stack.position.z = THREE.MathUtils.lerp(stack.position.z, targetZ, 0.2);
        stack.position.y = THREE.MathUtils.lerp(stack.position.y, targetY, 0.2);
      });

      if (t >= 1) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [isExploded]);

  return (
    <div className="relative w-full h-full min-h-[460px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Coordinate Badge */}
      <div className="absolute top-4 left-4 pointer-events-none text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-mono">
        ORTHO // DIE 01-MMU <br />
        MATRIX: 4x4 TENSOR CORES
      </div>

      {/* Exploded / Normal Indicator */}
      <div className="absolute bottom-4 right-4 pointer-events-none text-[9px] uppercase tracking-widest text-[var(--text-secondary)] font-mono">
        {isExploded ? "MODE: EXPLODED VIEW // 3 LAYERS" : "MODE: ASSEMBLED COMPONENT"}
      </div>
    </div>
  );
}
