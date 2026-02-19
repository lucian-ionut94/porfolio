"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface LightPillarProps {
  colorA?: string;
  colorB?: string;
  pillarCount?: number;
  speed?: number;
  className?: string;
}

export default function LightPillar({
  colorA = "#06B6D4",
  colorB = "#3B82F6",
  pillarCount = 8,
  speed = 0.3,
  className = "",
}: LightPillarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const cA = new THREE.Color(colorA);
    const cB = new THREE.Color(colorB);

    const pillars: THREE.Mesh[] = [];
    for (let i = 0; i < pillarCount; i++) {
      const height = 6 + Math.random() * 6;
      const width = 0.02 + Math.random() * 0.08;
      const geometry = new THREE.PlaneGeometry(width, height);
      const t = i / pillarCount;
      const color = cA.clone().lerp(cB, t);

      const material = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uColor: { value: color },
          uTime: { value: 0 },
          uOffset: { value: Math.random() * Math.PI * 2 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uOffset;
          varying vec2 vUv;
          void main() {
            float fade = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
            float pulse = 0.4 + 0.6 * sin(uTime * 0.5 + uOffset);
            float edgeFade = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
            float alpha = fade * edgeFade * pulse * 0.35;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        height / 2 - 1,
        (Math.random() - 0.5) * 4
      );
      mesh.rotation.y = Math.random() * Math.PI;
      scene.add(mesh);
      pillars.push(mesh);
    }

    // Add ambient particles
    const particleCount = 50;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: cA,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    const clock = new THREE.Clock();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime() * speed;

      pillars.forEach((pillar) => {
        const mat = pillar.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = elapsed;
      });

      particles.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      pillars.forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.ShaderMaterial).dispose();
      });
      pGeometry.dispose();
      pMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, [colorA, colorB, pillarCount, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
