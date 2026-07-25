import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "아파트 분석 결과 시각화하기 실습 슬라이드",
	description: "아파트 분석 결과 시각화하기 실습 슬라이드",
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
