import { IbookPath } from "../utils";
import SmartFactoryIntro001Youtube from "./components/SmartFactoryIntro001Youtube";
import SmartFactoryIntro002Youtube from "./components/SmartFactoryIntro002Youtube";
import SmartFactoryIntro010Youtube from "./components/SmartFactoryIntro010Youtube";

const smartFactoryBasePath = "/books/smartFactory"
const smartFactoryIntroImage = "/smartFactoryIntro/smartFactoryIntro_"
const smartFactoryImage = "/smartFactory/smartFactory_"

const getImages = (sn: number, en: number, base: string) => {
	const images = [];
	for (let i = sn; i <= en; i++) {
		images.push({
			src: base + (i).toString().padStart(3, "0") + ".webp",
			alt: base + (i).toString()
		})
	}
	return images
}

const theoriesImage = () => {
	const images = [];
	const f = getImages(4, 9, smartFactoryIntroImage);
	const ten = {
		src: "/smartFactoryIntro/smartFactoryIntro_010.webp",
		alt: "video on automation",
		video: SmartFactoryIntro010Youtube
	};
	const e = getImages(11, 14, smartFactoryIntroImage)

	images.push(...f)
	images.push(ten)
	images.push(...e)
	return images
}

const solutionImage = () => {
	return  getImages(15, 23, smartFactoryIntroImage);
}

const bottomFrameImage = () => {
	return getImages(0, 3, smartFactoryImage)
}

const basicCircuit = () => {
	return getImages(4, 8, smartFactoryImage)
}

const solderingMotorDrive = () => {
	return getImages(9, 13, smartFactoryImage)
}

const solderingMotor = () => {
	return getImages(14, 17, smartFactoryImage)
}

const motorCircuit = () => {
	return getImages(18, 23, smartFactoryImage)
}

const makeConveyorBelt = () => {
	return getImages(24, 33, smartFactoryImage)
}

const assembleMotor = () => {
	return getImages(34, 41, smartFactoryImage)
}

const assembleMotor2 = () => {
	return getImages(42, 48, smartFactoryImage)
}

const assembleSlide = () =>{
	return getImages(49, 51, smartFactoryImage)
}

const assembleServoMotorBase = () => {
	return getImages(52, 53, smartFactoryImage)
}

const assembleBeltCog = () => getImages(54, 57, smartFactoryImage)

const assembleMainMotorCog = () => getImages(58, 69, smartFactoryImage)

const assembleServoMotor = () => getImages(70, 75, smartFactoryImage)

const assembleServoMotor2 = () => getImages(76, 80, smartFactoryImage)

const webcam = () => getImages(81, 85, smartFactoryImage)

const webcam2 = () => getImages(86, 89, smartFactoryImage)

const webcam3 = () => getImages(90, 93, smartFactoryImage)

const connectBelt = () => getImages(94, 101, smartFactoryImage)

const tighten = () => getImages(102, 105, smartFactoryImage)

const tighten2 = () => getImages(106, 108, smartFactoryImage)

const assembleLed = () => getImages(109, 119, smartFactoryImage)

const finalCircuit = () => getImages(120, 121, smartFactoryImage)

const  servoMotorArm = () => getImages(122, 126, smartFactoryImage)

const assemebleServoMotorArm = () => getImages(127, 132, smartFactoryImage)

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

export interface smartFactoryBook {
	doc: string;
	description?: string;
	title?: string;
	images: {src: string; video?: ({className}: {className?: string})=> React.JSX.Element; alt: string, message?: string;}[];
}

export const smartFactoryBook: smartFactoryBook[] = [
	{
		doc: "issue",
		title: "이슈 알아보기",
		images: [
			{
				src: smartFactoryIntroImage + "001.webp",
				alt: "스마트 팩토리 속 AI 모음",
				video: SmartFactoryIntro001Youtube
			},
			{
				src: smartFactoryIntroImage + "002.webp",
				alt: "현대 싱가포르 공장",
				video: SmartFactoryIntro002Youtube
			}
		],
	},
	{
		doc: "theories",
		title: "이론적 배경 활동",
		images: theoriesImage(),
	},
	{
		doc: "solution",
		title: "해결	방안",
		images: solutionImage(),
	},
	{
		doc: "bottomFrame",
		title: "하판 조립하기",
		images: bottomFrameImage(),
	},
	{
		doc: "basicCircuit",
		title: "기본 회로 구성",
		images: basicCircuit()
	},
	{
		doc: "solderingMotorDrive",
		images: solderingMotorDrive(),
	},
	{
		doc: "solderingMotor",
		images: solderingMotor()
	},
	{
		doc: "motorCircuit",
		images: motorCircuit(),
	},
	{
		doc: "makeConveyorBelt",
		images: makeConveyorBelt()
	},
	{
		doc: "assembleMotor",
		images: assembleMotor()
	},
	{
		doc: "assembleMotor2",
		images: assembleMotor2()
	},
	{
		doc: "assembleSlide",
		images: assembleSlide()
	},
	{
		doc: "assembleServoMotorBase",
		images: assembleServoMotorBase()
	},
	{
		doc: "assembleBeltCog",
		images: assembleBeltCog()
	},
	{
		doc: "assembleMainMotorCog",
		images: assembleMainMotorCog(),
	},
	{
		doc: "assembleServoMotor",
		images: assembleServoMotor()
	},
	{
		doc: "assembleServoMotor2",
		images:assembleServoMotor2()
	},
	{
		doc: "webcam",
		images:webcam(),
	},
	{
		doc: "webcam2",
		images: webcam2(),
	},
	{
		doc: "webcam3",
		images:webcam3(),
	},
	{
		doc: "connectBelt",
		images: connectBelt(),
	},
	{
		doc: "tighten",
		images: tighten()
	},
	{
		doc: "tighten2",
		images:tighten2()
	},
	{
		doc: "assembleLed",
		images: assembleLed()
	},
	{
		doc: "finalCircuit",
		images: finalCircuit()
	},
	{
		doc: "servoMotorArm",
		images: servoMotorArm()
	},
	{
		doc: "assemebleServoMotorArm",
		images: assemebleServoMotorArm()
	},
]
