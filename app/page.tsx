import { FadeIn } from "@/components/commons/FadeIn";
import { aiReasons, careers, universities, whyCards } from "./landingDB";


export default function LandingPage() {
	return (
		<div style={{ fontFamily: "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif" }} className="bg-white text-slate-900 overflow-x-hidden">
			<Hero />
			<WhyLearn />
			<AI />
			<Career />
			<Footer />
		</div>
	);
}


function Footer() {
	return (
		<footer className="bg-slate-900 text-slate-400 py-12">
			<div className="max-w-6xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-2">
						<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
							<span className="text-white font-bold text-xs">&lt;/&gt;</span>
						</div>
						<span className="font-bold text-white text-sm">YIP 코딩 컴퓨터학원</span>
					</div>
					<div className="text-center md:text-right text-sm space-y-1">
						<p>세종특별자치시 아름동 1360 해피라움 3차 5층 507호</p>
						<p>Tel. 044 862 8201 </p>
					</div>
				</div>
				<div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
					© 2026 YIP 코딩 컴퓨터학원 . All rights reserved.
				</div>
			</div>
		</footer>
	)
}


function Career() {
	return (
		<section id="careers" className="py-24 md:py-32 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<FadeIn>
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-4">FUTURE CAREERS</span>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">파이썬과 아두이노가 여는 진로</h2>
						<p className="text-slate-500 text-lg max-w-2xl mx-auto">코딩을 배우면 다양한 고소득 전문직으로 나아갈 수 있습니다.</p>
					</div>
				</FadeIn>

				<div className="grid md:grid-cols-2 gap-8 mb-16">
					{careers.map((cat, ci) => (
						<FadeIn key={ci} delay={ci * 0.15}>
							<div className="rounded-2xl border border-slate-100 overflow-hidden">
								<div className="px-6 py-4 flex items-center gap-3" style={{ background: cat.bg }}>
									<div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
									<h3 className="font-bold" style={{ color: cat.color }}>{cat.category}</h3>
								</div>
								<div className="divide-y divide-slate-50">
									{cat.items.map((item, ii) => (
										<div key={ii} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
											<div>
												<p className="font-semibold text-slate-900 text-sm">{item.job}</p>
												<p className="text-xs text-slate-400 mt-0.5">연봉 {item.salary}</p>
											</div>
											<span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.growth === "매우 높음" ? "bg-emerald-50 text-emerald-600" : "bg-sky-50 text-sky-600"}`}>
												성장성 {item.growth}
											</span>
										</div>
									))}
								</div>
							</div>
						</FadeIn>
					))}
				</div>

				<FadeIn>
					<div className="mb-6">
						<h3 className="text-xl font-bold text-slate-900 text-center mb-2">관련 대학교 및 학과</h3>
						<p className="text-center text-slate-400 text-sm mb-8">파이썬과 아두이노를 배운 학생들이 진학하는 주요 대학교입니다.</p>
					</div>
				</FadeIn>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{universities.map((u, i) => (
						<FadeIn key={i} delay={i * 0.05}>
							<div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group">
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-bold text-slate-900 text-sm">{u.name}</h4>
									<span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.tag === "최상위" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}>
										{u.tag}
									</span>
								</div>
								<p className="text-xs text-slate-400">{u.dept}</p>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	)
}

function AI() {
	return (
		<section id="ai-era" className="py-24 md:py-32" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef5ff 100%)" }}>
			<div className="max-w-6xl mx-auto px-6">
				<FadeIn>
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4">AI + CODING</span>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
							"AI가 다 해주는데<br className="md:hidden" /> 코딩이 왜 필요하죠?"
						</h2>
						<p className="text-slate-500 text-lg max-w-2xl mx-auto">많은 분들이 궁금해하시는 질문입니다. 결론부터 말씀드리면, AI 시대이기 때문에 오히려 더 필요합니다.</p>
					</div>
				</FadeIn>

				<div className="space-y-6 max-w-3xl mx-auto">
					{aiReasons.map((r, i) => (
						<FadeIn key={i} delay={i * 0.1}>
							<div className="group flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all duration-300">
								<div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white" style={{ background: r.accent }}>
									{r.num}
								</div>
								<div>
									<h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
									<p className="text-slate-500 leading-relaxed text-sm">{r.desc}</p>
								</div>
							</div>
						</FadeIn>
					))}
				</div>

				<FadeIn delay={0.4}>
					<div className="mt-16 max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-center">
						<p className="text-xl md:text-2xl font-bold mb-3">
							AI를 가장 잘 활용하는 사람은<br />코딩을 아는 사람입니다.
						</p>
						<p className="text-indigo-100 text-sm">영어를 알면 해외 정보를 직접 찾을 수 있듯, 코딩을 알면 AI를 직접 다룰 수 있습니다.</p>
					</div>
				</FadeIn>
			</div>
		</section>
	)
}

function WhyLearn() {
	return (
		<section id="why-learn" className="py-24 md:py-32 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<FadeIn>
					<div className="text-center mb-16">
						<span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-semibold mb-4">WHY CODE?</span>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">왜 파이썬과 아두이노를 배워야 할까요?</h2>
						<p className="text-slate-500 text-lg max-w-2xl mx-auto">단순한 기술 습득이 아닙니다. 세상을 이해하고 변화시키는 힘을 기르는 과정입니다.</p>
					</div>
				</FadeIn>
				<div className="grid md:grid-cols-2 gap-6">
					{whyCards.map((c, i) => (
						<FadeIn key={i} delay={i * 0.1}>
							<div className="group p-6 rounded-2xl border border-slate-100 hover:border-sky-200 bg-white hover:shadow-lg hover:shadow-sky-50 transition-all duration-300">
								<div className="flex gap-4">
									<div className="shrink-0">{c.icon}</div>
									<div>
										<h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
										<p className="text-slate-500 leading-relaxed text-sm">{c.desc}</p>
									</div>
								</div>
							</div>
						</FadeIn>
					))}
				</div>

				<FadeIn delay={0.3}>
					<div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
						{[
							{ num: "2,847+", label: "전 세계 파이썬 사용 기업" },
							{ num: "1위", label: "프로그래밍 언어 인기 순위" },
							{ num: "73%", label: "IT 직군 파이썬 활용률" },
						].map((stat, i) => (
							<div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/30">
								<div className="text-3xl font-extrabold text-sky-600 mb-1">{stat.num}</div>
								<div className="text-sm text-slate-500">{stat.label}</div>
							</div>
						))}
					</div>
				</FadeIn>
			</div>
		</section>

	)
}

function Hero() {
	return (
		<section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}>

			<div className="relative max-w-6xl mx-auto px-6 py-32">
				<div className="max-w-3xl">
					<h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
						코드 한 줄이
						<br />
						<span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
							미래를 바꿉니다
						</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
						파이썬과 아두이노를 통해 소프트웨어와 하드웨어를 동시에 배우는 실전 코딩 교육. 생각하는 힘을 기르고, 만드는 즐거움을 경험하세요.
					</p>
				</div>

				<div className="hidden lg:block  w-96">
					<div className="relative">
						<div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-5 font-mono text-sm shadow-2xl">
							<div className="flex gap-2 mb-4">
								<span className="w-3 h-3 rounded-full bg-red-500/80" />
								<span className="w-3 h-3 rounded-full bg-yellow-500/80" />
								<span className="w-3 h-3 rounded-full bg-green-500/80" />
							</div>
							<div className="space-y-1">
								<p className="text-white"><span className="text-sky-400">from</span> <span className="text-emerald-400">machine</span> <span className="text-sky-400">import</span> Pin</p>
								<p className="text-white "><span className="text-amber-400">Pin</span>(<span className="text-emerald-400">0</span>, <span className="text-amber-400">Pin.OUT</span>) </p>
								<p> <span className=" text-white">p.</span><span className=" text-purple-500">on()</span></p>
								<p> <span className=" text-white">p.</span><span className=" text-purple-500">off()</span> <span className="animate-pulse text-sky-400">▌</span></p>

							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
		</section>
	)
}
