"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CanvasTexture, Path, Shape, Vector3 } from "three";
import { boardViews, type PartId, type Point3 } from "./board";

type Props = {
  active: PartId;
  reducedMotion: boolean;
  onContextLost: () => void;
  fallback: ReactNode;
};

function Box({
  at,
  size,
  color,
  metal = false,
  active = false,
}: {
  at: Point3;
  size: Point3;
  color: string;
  metal?: boolean;
  active?: boolean;
}) {
  return (
    <mesh position={at}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={metal ? 0.65 : 0.08}
        roughness={metal ? 0.32 : 0.75}
        emissive={active ? color : "#000000"}
        emissiveIntensity={active ? 0.25 : 0}
      />
    </mesh>
  );
}

function FocusFrame({
  at,
  size,
  color,
}: {
  at: Point3;
  size: [number, number];
  color: string;
}) {
  const [w, d] = size;
  return (
    <group position={at}>
      <Box at={[0, 0, -d / 2]} size={[w, 0.04, 0.045]} color={color} active />
      <Box at={[0, 0, d / 2]} size={[w, 0.04, 0.045]} color={color} active />
      <Box at={[-w / 2, 0, 0]} size={[0.045, 0.04, d]} color={color} active />
      <Box at={[w / 2, 0, 0]} size={[0.045, 0.04, d]} color={color} active />
    </group>
  );
}

function Silkscreen() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1536;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    const x = (v: number) => ((v + 4.25) / 8.5) * canvas.width;
    const z = (v: number) => ((v + 2.8) / 5.6) * canvas.height;
    ctx.strokeStyle = "#aadca344";
    ctx.lineWidth = 2;
    // Stylised PCB routing, deliberately deterministic and not an electrical schematic.
    for (let i = 0; i < 22; i++) {
      ctx.beginPath();
      ctx.moveTo(x(-1.8 + i * 0.085), z(0.6));
      ctx.lineTo(x(-1.8 + i * 0.085), z(0.85 + i * 0.035));
      ctx.lineTo(x(-2.8 + i * 0.08), z(1.45 + i * 0.025));
      ctx.lineTo(x(-2.8 + i * 0.08), z(2.3));
      ctx.stroke();
    }
    ctx.fillStyle = "#eff5dc";
    ctx.font = "bold 38px sans-serif";
    ctx.fillText("Raspberry Pi 4 Model B", x(-1.6), z(-1.9));
    ctx.font = "25px sans-serif";
    ctx.fillText("GPIO", x(-3.05), z(-2.02));
    ctx.fillText("POWER", x(-3.75), z(1.85));
    ctx.fillText("HDMI0", x(-2.03), z(2.02));
    ctx.fillText("HDMI1", x(-0.58), z(2.02));
    ctx.fillText("DISPLAY", x(-4.06), z(0.42));
    ctx.fillText("CAMERA", x(0.5), z(0.93));
    ctx.fillText("USB 2", x(3.18), z(2.75));
    ctx.font = "30px sans-serif";
    ctx.fillText("1GB RAM", x(0.28), z(-1.17));
    const result = new CanvasTexture(canvas);
    return result;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8.5, 5.6]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </mesh>
  );
}

function Connector({
  x,
  z,
  kind,
  highlight,
}: {
  x: number;
  z: number;
  kind: "usb2" | "usb3" | "ethernet";
  highlight: boolean;
}) {
  const ethernet = kind === "ethernet";
  const height = ethernet ? 1.35 : 1.55;
  const depth = ethernet ? 1.55 : 1.4;
  const shell = highlight ? "#9ac9d2" : "#becac6";
  return (
    <group>
      <Box
        at={[x, 0.2 + height / 2, z]}
        size={[1.8, height, depth]}
        color={shell}
        metal
        active={highlight}
      />
      {/* The opening faces out of the right edge, not upward. */}
      {(ethernet ? [0.83] : [0.62, 1.34]).map((y) => (
        <group key={y}>
          <Box
            at={[x + 0.906, y, z]}
            size={[0.022, ethernet ? 0.95 : 0.52, depth - 0.2]}
            color="#182927"
          />
          {!ethernet && (
            <Box
              at={[x + 0.924, y - 0.1, z]}
              size={[0.025, 0.12, depth - 0.34]}
              color={kind === "usb3" ? "#168bd0" : "#303b35"}
            />
          )}
          {Array.from({ length: ethernet ? 8 : 4 }, (_, i) => (
            <Box
              key={i}
              at={[
                x + 0.945,
                y - 0.16,
                z - 0.42 + i * (ethernet ? 0.12 : 0.27),
              ]}
              size={[0.025, 0.04, 0.045]}
              color="#cfb66a"
              metal
            />
          ))}
        </group>
      ))}
      {ethernet && (
        <>
          <Box
            at={[x + 0.93, 0.33, z - 0.55]}
            size={[0.025, 0.13, 0.19]}
            color="#81b947"
          />
          <Box
            at={[x + 0.93, 0.33, z + 0.55]}
            size={[0.025, 0.13, 0.19]}
            color="#e1b439"
          />
        </>
      )}
    </group>
  );
}

function Board({ active }: { active: PartId }) {
  const shape = useMemo(() => {
    const s = new Shape();
    const w = 4.25,
      d = 2.8,
      r = 0.2;
    s.moveTo(-w + r, -d);
    s.lineTo(w - r, -d);
    s.quadraticCurveTo(w, -d, w, -d + r);
    s.lineTo(w, d - r);
    s.quadraticCurveTo(w, d, w - r, d);
    s.lineTo(-w + r, d);
    s.quadraticCurveTo(-w, d, -w, d - r);
    s.lineTo(-w, -d + r);
    s.quadraticCurveTo(-w, -d, -w + r, -d);
    for (const x of [-3.9, 1.9])
      for (const z of [-2.45, 2.45]) {
        const hole = new Path();
        hole.absarc(x, z, 0.14, 0, Math.PI * 2, true);
        s.holes.push(hole);
      }
    return s;
  }, []);
  const accent = boardViews[active].color;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry
          args={[
            shape,
            { depth: 0.16, bevelEnabled: false, curveSegments: 12 },
          ]}
        />
        <meshStandardMaterial
          color="#318856"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>
      <Silkscreen />
      {[-3.9, 1.9].flatMap((x) =>
        [-2.45, 2.45].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.167, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.14, 0.27, 24]} />
            <meshStandardMaterial
              color="#cbb866"
              metalness={0.65}
              roughness={0.4}
            />
          </mesh>
        )),
      )}
      <Box
        at={[-1.15, 0.24, -0.35]}
        size={[1.65, 0.16, 1.65]}
        color="#445049"
      />
      <Box
        at={[-1.15, 0.36, -0.35]}
        size={[1.45, 0.15, 1.45]}
        color={active === "processor" ? "#e6b267" : "#c7ceca"}
        metal
        active={active === "processor"}
      />
      <Box
        at={[0.85, 0.26, -0.15]}
        size={[1.18, 0.19, 1.55]}
        color={active === "memory" ? "#756091" : "#28312e"}
        active={active === "memory"}
      />
      <Box
        at={[-3.03, 0.29, -1.44]}
        size={[1.25, 0.26, 1.34]}
        color="#b6c6bc"
        metal
      />
      <Box at={[2.12, 0.24, 1.05]} size={[0.8, 0.18, 0.8]} color="#25332a" />
      <Box at={[2.14, 0.24, -0.85]} size={[0.7, 0.18, 0.7]} color="#25332a" />

      <Box at={[-0.8, 0.31, -2.43]} size={[5.1, 0.3, 0.51]} color="#23322a" />
      {Array.from({ length: 40 }, (_, i) => (
        <Box
          key={i}
          at={[
            -3.21 + Math.floor(i / 2) * 0.254,
            0.76,
            -2.56 + (i % 2) * 0.254,
          ]}
          size={[0.064, 0.72, 0.064]}
          color={active === "gpio" ? "#f5c75f" : "#d5c38a"}
          metal
          active={active === "gpio"}
        />
      ))}
      <Connector
        x={3.56}
        z={-1.85}
        kind="ethernet"
        highlight={active === "ports"}
      />
      <Connector x={3.56} z={0.06} kind="usb3" highlight={active === "ports"} />
      <Connector x={3.56} z={1.86} kind="usb2" highlight={active === "ports"} />

      {[-1.8, -0.35].map((x) => (
        <group key={x}>
          <Box
            at={[x, 0.36, 2.52]}
            size={[0.8, 0.38, 0.63]}
            color={active === "hdmi" ? "#83c3d3" : "#bcc8c4"}
            metal
            active={active === "hdmi"}
          />
          <Box
            at={[x, 0.35, 2.847]}
            size={[0.65, 0.22, 0.025]}
            color="#23312c"
          />
          <Box
            at={[x, 0.32, 2.865]}
            size={[0.46, 0.06, 0.025]}
            color="#b89d60"
            metal
          />
        </group>
      ))}
      <Box
        at={[-3.2, 0.36, 2.5]}
        size={[0.91, 0.38, 0.76]}
        color={active === "power" ? "#df9fa6" : "#becbc5"}
        metal
        active={active === "power"}
      />
      <mesh
        position={[-3.2, 0.36, 2.893]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.37, 1, 1]}
      >
        <capsuleGeometry args={[0.14, 0.48, 4, 12]} />
        <meshStandardMaterial color="#20312b" />
      </mesh>
      <Box at={[-3.2, 0.36, 2.914]} size={[0.55, 0.04, 0.02]} color="#b9bdb1" />
      {/* Ribbon sockets: display on the left; camera beside the audio jack. */}
      <Box at={[-3.9, 0.34, -0.1]} size={[0.28, 0.34, 1.6]} color="#e6dfc8" />
      <Box at={[-4.04, 0.48, -0.1]} size={[0.1, 0.12, 1.7]} color="#26372d" />
      <Box at={[0.78, 0.34, 1.72]} size={[0.29, 0.34, 1.62]} color="#e6dfc8" />
      <Box at={[0.64, 0.48, 1.72]} size={[0.1, 0.12, 1.72]} color="#26372d" />
      <Box at={[1.49, 0.45, 2.25]} size={[0.7, 0.56, 1]} color="#24342b" />
      <mesh position={[1.49, 0.47, 2.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.24, 24]} />
        <meshStandardMaterial color="#283630" />
      </mesh>
      <mesh position={[1.49, 0.47, 2.932]}>
        <ringGeometry args={[0.13, 0.19, 24]} />
        <meshStandardMaterial color="#aebeb6" metalness={0.7} />
      </mesh>
      <Box
        at={[-3.68, -0.12, 0.25]}
        size={[1.28, 0.22, 1.25]}
        color="#a8b9b0"
        metal
      />
      {Array.from({ length: 18 }, (_, i) => (
        <Box
          key={i}
          at={[-3.45 + (i % 6) * 0.36, 0.24, 0.8 + Math.floor(i / 6) * 0.32]}
          size={[0.18, 0.15, 0.12]}
          color={i % 3 === 0 ? "#c6b991" : "#3e4e3e"}
          metal={i % 3 === 0}
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <Box
          key={i}
          at={[0.1 + (i % 5) * 0.37, 0.24, -1.36 - Math.floor(i / 5) * 0.28]}
          size={[0.17, 0.14, 0.1]}
          color="#bdb58f"
        />
      ))}
      {active === "processor" && (
        <FocusFrame
          at={[-1.15, 0.46, -0.35]}
          size={[1.85, 1.85]}
          color={accent}
        />
      )}
      {active === "memory" && (
        <FocusFrame
          at={[0.85, 0.39, -0.15]}
          size={[1.4, 1.76]}
          color={accent}
        />
      )}
      {active === "gpio" && (
        <FocusFrame
          at={[-0.8, 0.5, -2.43]}
          size={[5.35, 0.75]}
          color={accent}
        />
      )}
      {active === "hdmi" && (
        <FocusFrame
          at={[-1.075, 0.61, 2.52]}
          size={[2.45, 0.85]}
          color={accent}
        />
      )}
      {active === "power" && (
        <FocusFrame at={[-3.2, 0.61, 2.5]} size={[1.12, 1]} color={accent} />
      )}
    </group>
  );
}

function CameraRig({
  active,
  reducedMotion,
}: Pick<Props, "active" | "reducedMotion">) {
  const { camera, invalidate, size } = useThree();
  const target = useRef(new Vector3(0, 0, 0));
  const desired = useMemo(() => {
    const view = boardViews[active];
    const lookAt = new Vector3(...view.target);
    // Portrait panes need more distance to fit the same board width.
    const fit = Math.max(1, size.height / Math.max(size.width, 1));
    const position = new Vector3(...view.offset)
      .multiplyScalar(fit)
      .add(lookAt);
    return { lookAt, position };
  }, [active, size.width, size.height]);

  useEffect(() => {
    invalidate();
  }, [desired, reducedMotion, invalidate]);
  useFrame((_, delta) => {
    const speed = reducedMotion ? 1 : 1 - Math.exp(-5 * Math.min(delta, 0.1));
    camera.position.lerp(desired.position, speed);
    target.current.lerp(desired.lookAt, speed);
    camera.lookAt(target.current);
    const moving =
      camera.position.distanceToSquared(desired.position) > 0.00001 ||
      target.current.distanceToSquared(desired.lookAt) > 0.00001;
    if (moving) invalidate();
  });
  return null;
}

function ContextEvents({ onContextLost }: Pick<Props, "onContextLost">) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const element = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };
    element.addEventListener("webglcontextlost", lost);
    return () => element.removeEventListener("webglcontextlost", lost);
  }, [gl, onContextLost]);
  return null;
}

export default function BoardCanvas({
  active,
  reducedMotion,
  onContextLost,
  fallback,
}: Props) {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    // Canvas's fallback only covers browsers without <canvas>. Check WebGL2
    // first: R3F creates its renderer asynchronously, outside React boundaries.
    const probe = document.createElement("canvas");
    let available = false;
    try {
      const context = probe.getContext("webgl2", {
        powerPreference: "low-power",
      });
      available = context !== null;
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      available = false;
    }
    setSupported(available);
  }, []);
  if (supported === null) return null;
  if (!supported) return <>{fallback}</>;
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [8, 10, 12], fov: 36, near: 0.1, far: 100 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
      fallback={fallback}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      aria-label={`라즈베리파이 3D 모형: ${boardViews[active].label}`}
    >
      <color attach="background" args={["#fffdf7"]} />
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[-3, 10, 5]}
        intensity={2.8}
        color="#fff4db"
      />
      <directionalLight position={[5, 3, -4]} intensity={1.5} color="#d5eeff" />
      <Board active={active} />
      <CameraRig active={active} reducedMotion={reducedMotion} />
      <ContextEvents onContextLost={onContextLost} />
    </Canvas>
  );
}
