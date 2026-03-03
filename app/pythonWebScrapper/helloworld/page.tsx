import { DataTable } from "@/components/commons/table/data-table";
import { vscodeData } from "@/components/commons/table/FeatureTable";
import { vscodeColumns } from "@/components/commons/table/FeatureTable";
import Text from "@/components/commons/Text";
import Title from "@/components/commons/Title";
import { ColumnDef } from "@tanstack/react-table";
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
			<Title size="h3">1. vscode</Title>
			<Image alt="vscode homepage" src={`${baseURL}/vscodeHome.png`} width={500} height={500} className="w-8/12 mx-auto"/>
			<div className={"my-10"}>
				<DataTable options={{btn: false, height: "h-fit"}} columns={vscodeColumns} data={vscodeData}/>
			</div>
			<Text>2. pycharm</Text>
			<Image alt="vscode homepage" src={`${baseURL}/pycharmHome.png`} width={500} height={500} className="w-8/12 mx-auto"/>
			<Title size="h3">특징</Title>
		</div>
	)
}

