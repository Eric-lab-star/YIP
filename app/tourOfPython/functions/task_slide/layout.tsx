import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "함수 실습 슬라이드",
	description: "개념 확인부터 매개변수·return 함수 만들기까지 진행하는 실습 슬라이드",
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
