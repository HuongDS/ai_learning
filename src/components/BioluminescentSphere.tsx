"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface BioluminescentSphereProps {
  className?: string;
  theme?: "dark" | "light";
}

export default function BioluminescentSphere({
  className = "",
  theme = "dark",
}: BioluminescentSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Sphere Geometry
    const particleCount = 2200;
    const radius = 72;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const isLight = theme === "light";

    // Palette according to Theme
    const colorTeal = isLight ? new THREE.Color(0x00827c) : new THREE.Color(0x00b4aa);
    const colorAqua = isLight ? new THREE.Color(0x0284c7) : new THREE.Color(0xcbfffc);
    const colorWhite = isLight ? new THREE.Color(0x0f766e) : new THREE.Color(0xffffff);
    const colorLavender = isLight ? new THREE.Color(0x9333ea) : new THREE.Color(0xfad1ff);

    for (let i = 0; i < particleCount; i++) {
      // Golden Spiral distribution on sphere surface + minor radial jitter
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const r = radius + (Math.random() - 0.5) * 6;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      let particleColor = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.5) {
        particleColor.lerpColors(colorTeal, colorAqua, Math.random());
      } else if (rand < 0.8) {
        particleColor.lerpColors(colorAqua, colorWhite, Math.random());
      } else {
        particleColor.lerpColors(colorAqua, colorLavender, Math.random());
      }

      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Circle texture for smooth round dots
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      if (isLight) {
        grad.addColorStop(0, "rgba(0,130,124,1)");
        grad.addColorStop(0.35, "rgba(2,132,199,0.85)");
        grad.addColorStop(0.7, "rgba(15,118,110,0.45)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.3, "rgba(203,255,252,0.85)");
        grad.addColorStop(0.7, "rgba(0,180,170,0.4)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: isLight ? 3.6 : 3.2,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.85 : 0.9,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Orbital ring
    const ringCount = 360;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(ringCount * 3);
    const ringRadius = radius * 1.35;
    for (let j = 0; j < ringCount; j++) {
      const angle = (j / ringCount) * Math.PI * 2;
      ringPos[j * 3] = Math.cos(angle) * ringRadius;
      ringPos[j * 3 + 1] = (Math.random() - 0.5) * 3;
      ringPos[j * 3 + 2] = Math.sin(angle) * ringRadius;
    }
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3));
    const ringMat = new THREE.PointsMaterial({
      size: 1.8,
      color: isLight ? 0x0f766e : 0xedfffe,
      transparent: true,
      opacity: isLight ? 0.4 : 0.35,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const ringSystem = new THREE.Points(ringGeo, ringMat);
    ringSystem.rotation.x = Math.PI / 4;
    scene.add(ringSystem);

    // Mouse interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 0.4;
      targetY = (y / rect.height) * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particleSystem.rotation.y = elapsedTime * 0.12 + mouseX * 0.6;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 + mouseY * 0.6;

      ringSystem.rotation.z = -elapsedTime * 0.06;
      ringSystem.rotation.y = elapsedTime * 0.04;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i += 4) {
        const factor = 1 + Math.sin(elapsedTime * 2 + i) * 0.02;
        arr[i * 3] = originalPositions[i * 3] * factor;
        arr[i * 3 + 1] = originalPositions[i * 3 + 1] * factor;
        arr[i * 3 + 2] = originalPositions[i * 3 + 2] * factor;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[480px] pointer-events-none select-none ${className}`}
    />
  );
}
