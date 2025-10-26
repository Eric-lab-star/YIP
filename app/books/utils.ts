export interface IbookPath {
	path: string;
	label: string;
	tags?: string;
}

export const tinyUrl = "data:image/*;base64,UklGRowAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSBQAAAABD9D/iAiQCVhs9M/skyGi/7lyAFZQOCBSAAAA0AEAnQEqCgAGAAFAJiWwAnQBDwxiagAA/v5FD+bff4ijtDyIlH0n2FV8KG74/hkn13bNdE91NLbzbe5+K8+Yarj++nloP2AcqDZX/sE8CwAAAA=="


export const books: IbookPath[] = [
	{
		path: "/books/wireGame",
		label: "와이어 게임",
		tags: "basic",
	},
	{
		path: "/books/circuit",
		label: "회로 기초",
		tags: "basic",
	},
	{
		path:"/books/arduino",
		label:"아두이노",
		tags: "basic",
	},
	{
		path: "/books/arduboy",
	  label: "아두보이",
		tags: "intermediate",
	},
	{
		path: "/books/layzer",
		label: "레이저 터렛",
		tags: "intermediate",
	},
	{
		path: "/books/moodLight",
		label: "무드등",
		tags: "intermediate",
	},
	{
		path: "/books/smartFactory",
		label: "스마트 팩토리",
		tags: "advanced"
	}, 
	{
		path: "/books/waterPollution",
	  label: "수질 오염",
		tags: "intermediate"
	},
]

const smartFactoryBasePath = "/books/smartFactory"
export const smartFactoryPath: IbookPath[] = [
	{
		path: smartFactoryBasePath,
		label: "오늘의 주제",
	},
	{
		path: `${smartFactoryBasePath}/issue`,
		label: "이슈 알아보기",
	},
	{
		path: `${smartFactoryBasePath}/theories`,
		label: "이론적 배경 활동",
	},
	{
		path: `${smartFactoryBasePath}/solution`,
		label: "해결방안",
	},
	{
		path: `${smartFactoryBasePath}/bottomFrame`,
		label: "하판 조립하기",
	},
	{
		path: `${smartFactoryBasePath}/basicCircuit`,
		label: "기본 회로 구성",
	},
	{
		path: `${smartFactoryBasePath}/solderingMotorDrive`,
		label: "모터 드라이브 납땜하기",
	},
	{
		path: `${smartFactoryBasePath}/solderingMotor`,
		label: "모터 남땜하기",
	},
	{
		path: `${smartFactoryBasePath}/motorCircuit`,
		label: "모터 회로 구성",
	},
	{
		path: `${smartFactoryBasePath}/makeConveyorBelt`,
		label: "컨베이어벨트 만들기",
	},
	{
		path: `${smartFactoryBasePath}/assembleMotor`,
		label: "모터 조립하기",
	},
	{
		path: `${smartFactoryBasePath}/assembleMotor2`,
		label: "모터 장착하기"
	},
	{
		path: `${smartFactoryBasePath}/assembleSlide`,
		label: "부착물 장착하기"
	},
	{
		path: `${smartFactoryBasePath}/assembleServoMotorBase`,
		label: "부착물 장착하기 2"
	},
	{
		path: `${smartFactoryBasePath}/assembleBeltCog`,
		label: "벨트 회전 축 만들기 1"
	},
	{
		path: `${smartFactoryBasePath}/assembleMainMotorCog`,
		label: "메인 모터 축 만들기"
	},
	{
		path: `${smartFactoryBasePath}/assembleServoMotor`,
		label: "서보모터 조립하기"
	},
	{
		path: `${smartFactoryBasePath}/assembleServoMotor2`,
		label: "서보모터 본체 부착"
	},
	{
		path: `${smartFactoryBasePath}/webcam`,
		label: "웹캠 지지대 장착"
	},
	{
		path: `${smartFactoryBasePath}/webcam2`,
		label: "웹캠 지지대에 웹캠 장착"
	},
	{
		path: `${smartFactoryBasePath}/webcam3`,
		label: "웹캠 지지대를 본체에 조립"
	},
	{
		path: `${smartFactoryBasePath}/connectBelt`,
		label: "컨베이어 벨트 연결하기"
	},
	{
		path: `${smartFactoryBasePath}/tighten`,
		label: "부착물 고정하기"
	},
	{
		path: `${smartFactoryBasePath}/tighten2`,
		label: "장치 고정대 연결"
	},
	{
		path: `${smartFactoryBasePath}/assembleLed`,
		label: "표시 LED 제작"
	},
	{
		path: `${smartFactoryBasePath}/finalCircuit`,
		label: "회로 구성하기"
	},
	{
		path: `${smartFactoryBasePath}/servoMotorArm`,
		label: "서보모터 팔 만들기"
	},
	{
		path: `${smartFactoryBasePath}/assemebleServoMotorArm`,
		label: "서보모터 팔 장착하기"
	},
]
