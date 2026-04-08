import DownloadBtn from "@/components/commons/DownloadBtn";
import Title from "@/components/commons/Title";

export default function PlayerSurf(){
	return ( 
		<div className="p-5">
			<Title my="l" size="h1">우주선 이미지 다운로드 받기</Title>
			<DownloadBtn label={"우주선 사진 받기"} fileKey={"spaceShooter/player.png"}/>
		</div>

	)
}
