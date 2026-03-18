"use client";

import { useEffect, useRef, useState } from "react";

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
	const ref = useRef(null);
	const visible = useInView(ref);
	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0)" : "translateY(32px)",
				transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
			}}
		>
			{children}
		</div>
	);
}


function useInView(ref: React.RefObject<HTMLDivElement | null>, threshold = 0.15) {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (!ref.current) return;
		const obs = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
			{ threshold }
		);
		obs.observe(ref.current);
		return () => obs.disconnect();
	}, [ref, threshold]);
	return visible;
}
