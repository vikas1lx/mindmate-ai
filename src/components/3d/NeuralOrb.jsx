/**
 * NeuralOrb.jsx
 * Three.js 3D slowly rotating navy neural-orb in the hero.
 * Features:
 * - Glowing navy/cyan neural node mesh with icosahedron geometry
 * - Pulsing inner core sphere with deep blue/cyan gradient
 * - Constellation particles with depth
 * - Mouse parallax (smooth dampening / lerp)
 * - IntersectionObserver lazy-loading for 60fps performance
 * - prefers-reduced-motion fallback
 */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function NeuralOrb({ className = '' }) {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // ─── Three.js Scene Setup ──────────────────────────────────
    let animationFrameId;
    let isVisible = true;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ─── Neural Orb Group ──────────────────────────────────────
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // 1. Inner glowing nucleus sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0a1d47,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    orbGroup.add(innerSphere);

    // 2. Neural Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icoMesh = new THREE.Mesh(icoGeo, wireframeMat);
    orbGroup.add(icoMesh);

    // 3. Neural Nodes (Points on vertices)
    const pointsMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.075,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(icoGeo, pointsMat);
    orbGroup.add(nodePoints);

    // 4. Secondary Outer Neural Shell
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    orbGroup.add(outerMesh);

    // 5. Surrounding floating particle cloud
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleCloudMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleCloudMat);
    orbGroup.add(particleCloud);

    // ─── Mouse Parallax ────────────────────────────────────────
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      targetX = (x / rect.width) * 0.8;
      targetY = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ─── Resize Observer ───────────────────────────────────────
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w && h) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // ─── Intersection Observer (Lazy-rendering for 60fps) ──────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ─── Animation Loop ────────────────────────────────────────
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!reducedMotion) {
        // Slow majestic rotations
        orbGroup.rotation.y += 0.25 * delta;
        orbGroup.rotation.x = mouseY * 0.6;
        orbGroup.rotation.z = mouseX * 0.4;

        outerMesh.rotation.y -= 0.15 * delta;
        outerMesh.rotation.x += 0.1 * delta;

        particleCloud.rotation.y += 0.08 * delta;

        // Subtle pulsing respiration
        const scalePulse = 1 + Math.sin(elapsedTime * 1.5) * 0.035;
        icoMesh.scale.set(scalePulse, scalePulse, scalePulse);
        nodePoints.scale.set(scalePulse, scalePulse, scalePulse);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      resizeObserver.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js resources
      innerGeo.dispose();
      innerMat.dispose();
      icoGeo.dispose();
      wireframeMat.dispose();
      pointsMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      particleGeo.dispose();
      particleCloudMat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  if (!hasWebGL) {
    // Elegant CSS/SVG 3D fallback
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-700/30 via-cyan-500/20 to-indigo-600/30 blur-2xl animate-pulse" />
        <div className="absolute w-44 h-44 rounded-full border border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-blue-500/50" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[320px] sm:min-h-[380px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-label="3D Interactive Neural Orb Visualization"
    />
  );
}
