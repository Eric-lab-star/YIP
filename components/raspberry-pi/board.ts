export type PartId =
  | "overview"
  | "processor"
  | "memory"
  | "ports"
  | "gpio"
  | "hdmi"
  | "power";
export type Point3 = [number, number, number];

type BoardView = {
  label: string;
  detail: string;
  color: string;
  target: Point3;
  offset: Point3;
};

// Board coordinates: X along the 85 mm edge, Y up, Z toward HDMI.
// Based on the official Pi 4 photograph and mechanical drawing. Geometry is
// intentionally simplified; these are teaching views, not manufacturing CAD.
export const boardViews: Record<PartId, BoardView> = {
  overview: {
    label: "라즈베리파이 전체",
    detail: "Raspberry Pi 4 Model B · 1GB",
    color: "#27734d",
    target: [0, 0, 0],
    offset: [8, 10, 12],
  },
  processor: {
    label: "연산처리장치",
    detail: "BCM2711 · 명령을 실행하는 곳",
    color: "#a95b12",
    target: [-1.15, 0.3, -0.35],
    offset: [1.8, 5.5, 3.2],
  },
  memory: {
    label: "메모리",
    detail: "1GB LPDDR4 · 작업 중인 데이터를 보관",
    color: "#7150a5",
    target: [0.85, 0.25, -0.15],
    offset: [-1.8, 5.6, 3.4],
  },
  ports: {
    label: "포트와 단자",
    detail: "USB와 유선 네트워크 연결",
    color: "#1b789b",
    target: [3.2, 0.6, 0],
    offset: [9, 5, 6],
  },
  gpio: {
    label: "40 GPIO 헤더핀",
    detail: "두 줄로 늘어선 40개의 연결 핀",
    color: "#91620b",
    target: [-0.8, 0.45, -2.45],
    offset: [1.5, 4.8, -7.8],
  },
  hdmi: {
    label: "마이크로 HDMI",
    detail: "HDMI0 / HDMI1 · 화면과 소리 출력",
    color: "#1b789b",
    target: [-1.2, 0.25, 2.55],
    offset: [1.5, 3, 6],
  },
  power: {
    label: "USB-C 전원 단자",
    detail: "5V · 3A급 전원 공급",
    color: "#aa4051",
    target: [-3.2, 0.25, 2.55],
    offset: [-2, 2.5, 5],
  },
};

export const partIds = Object.keys(boardViews) as PartId[];
export function isPartId(value: string): value is PartId {
  return Object.hasOwn(boardViews, value);
}
