import HorizontalLine from "@/components/commons/HorizontalLine";
import NextAndPrev from "@/components/commons/NextAndPrev";
import { DataTable } from "@/components/commons/table/data-table";
import { pycharmData, vscodeData } from "@/components/commons/table/FeatureTable";
import { editorColumns } from "@/components/commons/table/FeatureTable";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import Image from "next/image";

const baseURL = "https://r2.kimkyungsub.com"
export default function Page() {
	return (
		<div className="container mx-auto space-y-2 pb-30">
			<Title weight="bold" my="m">파이썬 Editor 소개</Title>
			<Text my="m">그림을 그린다고 하면 어디에다가 그리고 싶은가요? 모든 준비물과 시설이 잘 갖추어진 미술실에서 그리고 싶은가요? 아니면 아무것도 없는 땅바닥에서 그림을 그리고 싶은가요? 아마 대부분의 사람들은 여러가지로 편리하고 쾌적한 미술실에서 그림을 그리고 싶다고 생각했을거예요. IDE도 마찬가지에요. IDE란 코딩을 위한 미술실이에요. 코딩을 위한 각종 편의 기능을 지원하고 개발자들은 이런 편의 기능 덕분에 더 빠르게 작업을 할 수 있어요. </Text>
			<Title size="h2"> IDE를 사용하면 좋은 점들</Title>
			<Text>1. 자동완성</Text>
			<Text>2. 오류표시</Text>
			<Text>3. 색깔구분</Text>
			<Text>4. 바로실행</Text>

			<Title size="h2">대표적인 IDE</Title>
			<Title  size="h3">1. vscode</Title>

			<Image alt="vscode homepage" src={`${baseURL}/vscodeHome.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<div className={"my-10"}>
				<DataTable options={{btn: false, height: "h-fit"}} columns={editorColumns} data={vscodeData}/>
			</div>
			<Title size="h2">2. pycharm</Title>
			<Image alt="vscode homepage" src={`${baseURL}/pycharmHome.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<div className={"my-10"}>
				<DataTable options={{btn: false, height: "h-fit"}} columns={editorColumns} data={pycharmData}/>
			</div>

			<Title>VSCode으로 파이썬 코드 실행하기</Title>
			<Text> 먼저 vscode가 설치되었는지 확이 후 진행하세요 </Text>
			<Title size="h3" my="l">새폴더 만들기</Title>
			<Image alt="vscode run python code1" src={`${baseURL}/vscode/vscode_howto1.png`} width={500} height={500} className="rounded-lg w-8/12 mx-auto"/>
			<Text my="l">1. 바탕화면에서 마우스 우클릭을 하면  새로만들기에서 폴더를 클릭해서 새 폴더를 만들 수 있어요.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code2" src={`${baseURL}/vscode/vscode_howto2.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">2. 폴더 이름은 본인의 이름으로 바꾸세요.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code3" src={`${baseURL}/vscode/vscode_howto3.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">3. 본인 이름의 폴더 안에서 helloworld라는 폴더를 만드세요.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code4" src={`${baseURL}/vscode/vscode_howto4.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">4. helloworld 폴더에 마우스 커서를 두고 우클릭을 하면 보이는 "Code로 열기"를 클릭하세요. </Text>
			<HorizontalLine/>
			<Image alt="vscode run python code5" src={`${baseURL}/vscode/vscode_howto5.png`} width={500} height={500} className="w-8/12 mx-auto  rounded-lg"/>
			<Text my="l">5. 위의 그림과 같은 창이 나오면 파란색 버튼을 누르세요. </Text>
			<HorizontalLine/>
			<Image alt="vscode run python code6" src={`${baseURL}/vscode/vscode_howto6.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">6. vscode가 실행되면 왼쪽 사이드 바에서 파일 아이콘을 클릭해서 새로운 파일을 만드세요.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code7" src={`${baseURL}/vscode/vscode_howto7.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">7. 파일 이름을 main.py로 합니다.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code8" src={`${baseURL}/vscode/vscode_howto8.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">8. 파일을 클릭하면  이곳에 코드를 작성할 수 있어요.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code9" src={`${baseURL}/vscode/vscode_howto9.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">9. 오른쪽에 보이는 세모 모양의 재생버튼을 클릭하면 코드가 실행되요.</Text>
			<HorizontalLine/>
			<Image alt="vscode run python code9" src={`${baseURL}/vscode/vscode_howto10.png`} width={500} height={500} className="w-8/12 mx-auto rounded-lg"/>
			<Text my="l">10. 하단에 보면 이렇게 실행되는 창이 나와요.</Text>
			<HorizontalLine/>

			<NextAndPrev
			prev={"/tourOfPython/day_1"}
			prevPage="변수와 함수"
			next={"/tourOfPython/variable_string_boolean"}
			nextPage="변수, 문자열, 불리안"
			/>
		</div>
	)
}

