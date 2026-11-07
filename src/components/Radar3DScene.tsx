"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface RadarTarget {
  id: string;
  name: string;
  shortName: string;
  stars: string;
  distance: number; // 0 to 1
  angle: number; // in radians
  color?: string;
}

export const DEFAULT_RADAR_TARGETS: RadarTarget[] = [
  {
    id: "vllm",
    name: "vllm-project / vllm",
    shortName: "vLLM",
    stars: "35.2k",
    distance: 0.42,
    angle: (45 * Math.PI) / 180,
  },
  {
    id: "deepseek",
    name: "deepseek-ai / DeepSeek-V3",
    shortName: "DeepSeek-V3",
    stars: "48.9k",
    distance: 0.65,
    angle: (135 * Math.PI) / 180,
  },
  {
    id: "llamacpp",
    name: "ggerganov / llama.cpp",
    shortName: "llama.cpp",
    stars: "72.4k",
    distance: 0.82,
    angle: (215 * Math.PI) / 180,
  },
  {
    id: "ollama",
    name: "ollama / ollama",
    shortName: "Ollama",
    stars: "112k",
    distance: 0.58,
    angle: (295 * Math.PI) / 180,
  },
  {
    id: "mcp",
    name: "modelcontextprotocol / servers",
    shortName: "MCP Servers",
    stars: "28.5k",
    distance: 0.76,
    angle: (350 * Math.PI) / 180,
  },
];

interface Radar3DSceneProps {
  targets?: RadarTarget[];
  selectedId: string;
  onSelectTarget: (target: RadarTarget) => void;
  theme?: "dark" | "light";
  className?: string;
}

export default function Radar3DScene({
  targets = DEFAULT_RADAR_TARGETS,
  selectedId,
  onSelectTarget,
  theme = "dark",
  className = "",
}: Radar3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef(targets);
  targetsRef.current = targets;
  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;
  const onSelectRef = useRef(onSelectTarget);
  onSelectRef.current = onSelectTarget;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -110, 160);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isLight = theme === "light";
    const mainColor = isLight ? 0x0284c7 : 0x00b4aa;
    const accentColor = isLight ? 0x00827c : 0x00ffd5;
    const gridColor = isLight ? 0x94a3b8 : 0x003734;

    const radarGroup = new THREE.Group();
    // Tilt the radar grid in 3D perspective
    radarGroup.rotation.x = -Math.PI / 4.2;
    scene.add(radarGroup);

    // 2. Concentric Range Rings
    const radiusMax = 68;
    const ringRadii = [0.25, 0.5, 0.75, 1.0].map((f) => f * radiusMax);

    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 96;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
      }
      ringGeo.setFromPoints(points);

      const ringMat = new THREE.LineBasicMaterial({
        color: idx === ringRadii.length - 1 ? mainColor : gridColor,
        transparent: true,
        opacity: idx === ringRadii.length - 1 ? 0.8 : 0.45,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      radarGroup.add(ringLine);
    });

    // 3. Radar Crosshair Axes (+ shaped)
    const axesGeo = new THREE.BufferGeometry();
    const axesPoints = [
      new THREE.Vector3(-radiusMax, 0, 0),
      new THREE.Vector3(radiusMax, 0, 0),
      new THREE.Vector3(0, -radiusMax, 0),
      new THREE.Vector3(0, radiusMax, 0),
    ];
    axesGeo.setFromPoints(axesPoints);
    const axesMat = new THREE.LineBasicMaterial({
      color: gridColor,
      transparent: true,
      opacity: 0.35,
    });
    const axesLine = new THREE.LineSegments(axesGeo, axesMat);
    radarGroup.add(axesLine);

    // 4. Sweeping Sonar Beam (Sector Wedge with Phosphor Trail)
    const sweepSegments = 40;
    const sweepAngle = Math.PI * 0.35; // 63 degrees fan
    const sweepGeo = new THREE.BufferGeometry();
    const sweepVertices: number[] = [];
    const sweepColors: number[] = [];

    // Construct wedge fan
    const cAccent = new THREE.Color(accentColor);
    for (let i = 0; i < sweepSegments; i++) {
      const a1 = (i / sweepSegments) * sweepAngle;
      const a2 = ((i + 1) / sweepSegments) * sweepAngle;

      const alpha1 = Math.pow(i / sweepSegments, 2.5) * 0.45;
      const alpha2 = Math.pow((i + 1) / sweepSegments, 2.5) * 0.45;

      // Triangle center -> pt1 -> pt2
      sweepVertices.push(0, 0, 0);
      sweepVertices.push(Math.cos(a1) * radiusMax, Math.sin(a1) * radiusMax, 0);
      sweepVertices.push(Math.cos(a2) * radiusMax, Math.sin(a2) * radiusMax, 0);

      // Colors with fading alpha
      sweepColors.push(cAccent.r, cAccent.g, cAccent.b, alpha1 * 0.1);
      sweepColors.push(cAccent.r, cAccent.g, cAccent.b, alpha1);
      sweepColors.push(cAccent.r, cAccent.g, cAccent.b, alpha2);
    }

    sweepGeo.setAttribute("position", new THREE.Float32BufferAttribute(sweepVertices, 3));
    sweepGeo.setAttribute("color", new THREE.Float32BufferAttribute(sweepColors, 4));

    // Custom material using vertex colors & transparency
    const sweepMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    radarGroup.add(sweepMesh);

    // Leading sharp scanning needle
    const needleGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0.5),
      new THREE.Vector3(
        Math.cos(sweepAngle) * radiusMax,
        Math.sin(sweepAngle) * radiusMax,
        0.5
      ),
    ]);
    const needleMat = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.95,
      linewidth: 2,
    });
    const needleLine = new THREE.Line(needleGeo, needleMat);
    sweepMesh.add(needleLine);

    // 5. Target Blips & Rings in Space
    interface BlipObject {
      target: RadarTarget;
      mesh: THREE.Mesh;
      ringMesh: THREE.Mesh;
      lockGroup: THREE.Group;
      pos: THREE.Vector3;
    }

    const blipObjects: BlipObject[] = [];
    const sphereGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const pulseRingGeo = new THREE.RingGeometry(1.5, 2.8, 32);

    targetsRef.current.forEach((t) => {
      const r = t.distance * radiusMax;
      const x = Math.cos(t.angle) * r;
      const y = Math.sin(t.angle) * r;
      const z = 1.0;

      const blipGroup = new THREE.Group();
      blipGroup.position.set(x, y, z);
      radarGroup.add(blipGroup);

      // Center glowing point
      const blipMat = new THREE.MeshBasicMaterial({
        color: accentColor,
      });
      const blipMesh = new THREE.Mesh(sphereGeo, blipMat);
      blipGroup.add(blipMesh);

      // Pulsing echo ripple
      const ringMat = new THREE.MeshBasicMaterial({
        color: mainColor,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const echoRing = new THREE.Mesh(pulseRingGeo, ringMat);
      blipGroup.add(echoRing);

      // Target lock bracket indicator
      const lockGroup = new THREE.Group();
      const lockBracketGeo = new THREE.BufferGeometry();
      const s = 4.2;
      const bPts = [
        // top-left
        new THREE.Vector3(-s, s - 1.5, 0),
        new THREE.Vector3(-s, s, 0),
        new THREE.Vector3(-s + 1.5, s, 0),
        // top-right
        new THREE.Vector3(s - 1.5, s, 0),
        new THREE.Vector3(s, s, 0),
        new THREE.Vector3(s, s - 1.5, 0),
        // bottom-right
        new THREE.Vector3(s, -s + 1.5, 0),
        new THREE.Vector3(s, -s, 0),
        new THREE.Vector3(s - 1.5, -s, 0),
        // bottom-left
        new THREE.Vector3(-s + 1.5, -s, 0),
        new THREE.Vector3(-s, -s, 0),
        new THREE.Vector3(-s, -s + 1.5, 0),
      ];
      lockBracketGeo.setFromPoints(bPts);
      const lockMat = new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.9,
      });
      const lockLine = new THREE.LineSegments(lockBracketGeo, lockMat);
      lockGroup.add(lockLine);
      blipGroup.add(lockGroup);

      blipObjects.push({
        target: t,
        mesh: blipMesh,
        ringMesh: echoRing,
        lockGroup,
        pos: new THREE.Vector3(x, y, z),
      });
    });

    // 6. Raycasting for Click / Hover Detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        blipObjects.map((b) => b.mesh)
      );

      if (intersects.length > 0) {
        const hit = blipObjects.find((b) => b.mesh === intersects[0].object);
        if (hit) {
          onSelectRef.current(hit.target);
        }
      }
    };

    renderer.domElement.addEventListener("click", handlePointerDown);

    // 7. Parallax Interaction on Mouse Move
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous 360-degree radar sweep rotation
      sweepMesh.rotation.z += 0.024;
      const currentAngle = (sweepMesh.rotation.z + sweepAngle) % (Math.PI * 2);

      // Smooth parallax tilt response
      radarGroup.rotation.y = THREE.MathUtils.lerp(
        radarGroup.rotation.y,
        mouseX * 0.12,
        0.05
      );
      radarGroup.rotation.x = THREE.MathUtils.lerp(
        radarGroup.rotation.x,
        -Math.PI / 4.2 + mouseY * 0.08,
        0.05
      );

      // Animate Target Blips
      blipObjects.forEach((bo) => {
        const isSelected = bo.target.id === selectedIdRef.current;

        // Angle diff to sweep
        let normalizedTargetAngle = bo.target.angle % (Math.PI * 2);
        if (normalizedTargetAngle < 0) normalizedTargetAngle += Math.PI * 2;
        let diff = Math.abs(currentAngle - normalizedTargetAngle);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;

        // Pulse echo when sweep passes
        const isHitBySweep = diff < 0.25;
        const scaleVal = isHitBySweep ? 1.6 : 1.0;
        bo.mesh.scale.set(scaleVal, scaleVal, scaleVal);

        // Echo ring expands
        const ringScale = 1 + ((elapsed * 1.5 + bo.target.distance) % 1) * 2.2;
        bo.ringMesh.scale.set(ringScale, ringScale, ringScale);
        const ringMat = bo.ringMesh.material as THREE.MeshBasicMaterial;
        ringMat.opacity = Math.max(0, 0.6 - (ringScale - 1) * 0.28);

        // Lock group visibility and spin
        bo.lockGroup.visible = isSelected;
        if (isSelected) {
          bo.lockGroup.rotation.z += 0.015;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", handlePointerDown);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[260px] cursor-crosshair select-none ${className}`}
    />
  );
}
