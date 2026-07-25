import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "편집기 실습 슬라이드",
	description: "VSCode로 폴더를 만들고 첫 코드를 실행해보는 실습 슬라이드",
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
