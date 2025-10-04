// 웹 사이트 첫 화면 
// 
// 로그인 / 회원 가입 
// 프로젝트 사진 
// 교육과정 
// 수업 사진 
// 우수 학생 
// 만족도 
// 대회 실적 
//
// 질의 / 상담 안내 
// 이메일 / 전화번호 

import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
//
export default async function Home() {
  return (
		<div className="space-y-3">
			<Header/>
			<Body />
			<Footer />
		</div>
  );
}
