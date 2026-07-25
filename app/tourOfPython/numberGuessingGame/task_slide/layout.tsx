import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "숫자 맞히기 게임 실습 슬라이드",
	description:
		"타이틀 만들기부터 정답 판정 함수까지, 게임을 단계별로 완성하는 실습 슬라이드",
};

export default function TaskSlideLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="fixed inset-0 z-50 bg-white overflow-hidden">
			{children}
		</div>
	);
}
