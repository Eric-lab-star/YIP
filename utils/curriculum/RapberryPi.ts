export interface Lesson {
  /** Sidebar display name */
  name: string;
  slug: string;
  description: string;
}

export const RaspberryPiCurriculum: Lesson[] = [
  {
    name: "라스베리파이의 구성요소",
    slug: "what_is_raspberryPi",
    description: "what is raspberrypi ",
  },
  {
    name: "환경설정하기",
    slug: "How_to_setup",
    description: "How to setup",
  },
  {
    name: "주변기기 연결하기",
    slug: "connecting_components",
    description: "connecting components",
  },
  {
    name: "파이썬 설정하기",
    slug: "python_setup",
    description: "python setup",
  },
  {
    name: "브레드 보드란 무엇인가",
    slug: "what_is_breadboard",
    description: "what is breadboard",
  },
  {
    name: "LED 제어하기",
    slug: "LED_controll",
    description: "LED controll",
  },
  {
    name: "LED 여러개 제어하기",
    slug: "more_LEDS",
    description: "more LEDS",
  },
  {
    name: "기초 택트 스위치",
    slug: "basic_tact_switch",
    description: "basic tact switch",
  },
  {
    name: "고급 택트 스위치 ",
    slug: "advanced_tact_switch",
    description: "advanced tact switch",
  },
  {
    name: "CDS 센서",
    slug: "what_is_CDS",
    description: "what is CDS",
  },
  {
    name: "MQ-2가스감지센서",
    slug: "MQ-2_sensor",
    description: "MQ-2 sensor",
  },
  {
    name: "초음파센서",
    slug: "ultra_sonic_sensor",
    description: "ultra sonic sensor",
  },
  {
    name: "MPU6050 센서",
    slug: "MPU6050_sensor",
    description: "MPU6050 sensor",
  },
  {
    name: "DS18B02 온도센서",
    slug: "DS18B02_sensor",
    description: "DS18B02 sensor",
  },
  {
    name: "데이터 저장하기",
    slug: "save_data",
    description: "save data",
  },
  {
    name: "블루투스LE  스마트 조명제어",
    slug: "BLE",
    description: "BLE",
  },
  {
    name: "웹서버 만들기",
    slug: "web_server",
    description: "web server",
  },
  {
    name: "웹으로 LED 제어하기",
    slug: "led_controll_over_web",
    description: "led controll over web",
  },
  {
    name: "카메라 연결하기",
    slug: "camera_controll",
    description: "camera controll",
  },
  {
    name: "사물인식",
    slug: "object_detection",
    description: "object detection",
  },
  {
    name: "녹음기",
    slug: "audio_recorder",
    description: "audio recorder",
  },
  {
    name: "최종프로젝트",
    slug: "final_project",
    description: "final project",
  },
];

/** Look up a lesson by slug. Useful in MDX metadata. */
export function getLesson(slug: string): Lesson | undefined {
  return RaspberryPiCurriculum.find((l) => l.slug === slug);
}
