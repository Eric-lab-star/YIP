import { boardViews, type PartId } from "./board";
import styles from "./RaspberryPiLesson.module.css";

/** A local, accessible illustration also used while WebGL loads or is unavailable. */
export default function BoardDiagram({ active }: { active: PartId }) {
  const color = boardViews[active].color;
  const outline = (part: PartId) => (active === part ? color : "#23392e");
  const width = (part: PartId) => (active === part ? 5 : 1.5);
  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 480 330"
      role="img"
      aria-label={`라즈베리파이 4 부품 배치도: ${boardViews[active].label}`}
    >
      <rect
        x="44"
        y="38"
        width="378"
        height="248"
        rx="16"
        fill="#318657"
        stroke="#225c3e"
        strokeWidth="3"
      />
      {[
        [61, 55],
        [315, 55],
        [61, 269],
        [315, 269],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="7"
          fill="#fffdf7"
          stroke="#d5b967"
          strokeWidth="4"
        />
      ))}
      <rect
        x="77"
        y="55"
        width="227"
        height="20"
        rx="2"
        fill="#253129"
        stroke={outline("gpio")}
        strokeWidth={width("gpio")}
      />
      {Array.from({ length: 40 }, (_, i) => (
        <rect
          key={i}
          x={83 + Math.floor(i / 2) * 11}
          y={58 + (i % 2) * 10}
          width="4"
          height="4"
          fill="#edcf86"
        />
      ))}
      <rect
        x="155"
        y="128"
        width="72"
        height="70"
        rx="4"
        fill="#cbd1cb"
        stroke={outline("processor")}
        strokeWidth={width("processor")}
      />
      <text x="191" y="167" textAnchor="middle" fontSize="15" fill="#263d5b">
        CPU
      </text>
      <rect
        x="246"
        y="138"
        width="51"
        height="66"
        rx="2"
        fill="#25312d"
        stroke={outline("memory")}
        strokeWidth={width("memory")}
      />
      <text x="271" y="175" textAnchor="middle" fontSize="14" fill="white">
        RAM
      </text>
      <g stroke={outline("ports")} strokeWidth={width("ports")}>
        <rect x="356" y="57" width="75" height="64" rx="3" fill="#bdc9c5" />
        <rect x="356" y="138" width="75" height="57" rx="3" fill="#91c8e3" />
        <rect x="356" y="211" width="75" height="57" rx="3" fill="#b5bfb8" />
      </g>
      <text x="392" y="95" textAnchor="middle" fontSize="14" fill="#263d5b">
        LAN
      </text>
      <text x="392" y="173" textAnchor="middle" fontSize="14" fill="#263d5b">
        USB 3
      </text>
      <text x="392" y="246" textAnchor="middle" fontSize="14" fill="#263d5b">
        USB 2
      </text>
      <rect
        x="73"
        y="266"
        width="42"
        height="23"
        rx="7"
        fill="#ccd3ce"
        stroke={outline("power")}
        strokeWidth={width("power")}
      />
      <g fill="#ccd3ce" stroke={outline("hdmi")} strokeWidth={width("hdmi")}>
        <rect x="146" y="268" width="34" height="21" rx="3" />
        <rect x="208" y="268" width="34" height="21" rx="3" />
      </g>
      <text x="94" y="312" textAnchor="middle" fontSize="14" fill="#263d5b">
        USB-C
      </text>
      <text x="195" y="312" textAnchor="middle" fontSize="14" fill="#263d5b">
        micro-HDMI
      </text>
    </svg>
  );
}
