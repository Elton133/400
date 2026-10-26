"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { Project } from "@/content/projects";
import { SCREEN_H, SCREEN_W, brandOf, drawScreen } from "./screen";

// The only 3D on the site. Matte, not glossy. Tilts toward the pointer,
// drags with momentum, settles back to face you.

const W = 0.76;
const H = 1.6;
const D = 0.085;

// Only one phone exists at a time, so its drag state lives outside React.
const drag = { active: false, x: 0, vel: 0, offset: 0 };

function PhoneMesh({ project }: { project: Project }) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.MeshStandardMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useMemo(() => new THREE.Color(), []);
  const geometry = useMemo(() => new RoundedBoxGeometry(W, H, D, 6, 0.09), []);

  const [canvas] = useState(() => {
    const c = document.createElement("canvas");
    c.width = SCREEN_W;
    c.height = SCREEN_H;
    return c;
  });
  const texture = useRef<THREE.CanvasTexture>(null);

  useEffect(() => {
    const ctx = canvas.getContext("2d")!;
    const src = project.screens?.[0];
    const refresh = () => {
      if (texture.current) texture.current.needsUpdate = true;
    };
    drawScreen(ctx, project, null);
    refresh();
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      drawScreen(ctx, project, img);
      refresh();
    };
    img.src = src;
  }, [project, canvas]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    const d = drag;
    if (!g) return;
    if (!d.active) {
      d.vel *= Math.pow(0.9, dt * 60);
      d.offset += d.vel;
      const home = Math.round(d.offset / (Math.PI * 2)) * Math.PI * 2;
      d.offset += (home - d.offset) * Math.min(1, dt * 2.2);
    }
    const tiltY = pointer.current.x * 0.32;
    const tiltX = pointer.current.y * 0.18;
    g.rotation.y += (d.offset + tiltY - 0.18 - g.rotation.y) * Math.min(1, dt * 8);
    g.rotation.x += (tiltX - g.rotation.x) * Math.min(1, dt * 5);
    if (body.current) body.current.color.lerp(target.set(brandOf(project)), Math.min(1, dt * 4));
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshStandardMaterial ref={body} color="#121212" roughness={0.62} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0, D / 2 + 0.001]}>
        <planeGeometry args={[W - 0.08, H - 0.08]} />
        <meshBasicMaterial toneMapped={false}>
          <canvasTexture ref={texture} attach="map" args={[canvas]} colorSpace={THREE.SRGBColorSpace} anisotropy={4} />
        </meshBasicMaterial>
      </mesh>
      <mesh position={[0, 0, -D / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshBasicMaterial color="#121212" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function Phone3D({ project }: { project: Project }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pause rendering whenever the phone is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  const onDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.active = true;
    drag.x = e.clientX;
    drag.vel = 0;
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag;
    if (!d.active) return;
    const delta = (e.clientX - d.x) * 0.012;
    d.x = e.clientX;
    d.offset += delta;
    d.vel = delta;
  };
  const onUp = () => {
    drag.active = false;
  };

  return (
    <div
      ref={wrap}
      className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="img"
      aria-label={`Phone showing ${project.name}. Drag to rotate.`}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 3.3], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} />
        <directionalLight position={[-3, -1, -2]} intensity={0.5} />
        <PhoneMesh project={project} />
      </Canvas>
    </div>
  );
}
