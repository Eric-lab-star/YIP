"use client";
import Title from "@/components/commons/Title";
import { layout } from "../../lib/tv/forms/FormStyles";
import StudentPersonalForm from "@/components/forms/student/studentPersonalForm";

// 수업일정 검증안되는 오류가 있음
export default function Page() {
	return (
		<div	className={layout()} >
			<Title children="신규 등록" />
			<StudentPersonalForm type="등록하기" />
		</div>
	)
}


