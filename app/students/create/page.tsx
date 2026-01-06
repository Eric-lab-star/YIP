"use client";
import Title from "@/components/commons/Title";
import { layout } from "../../lib/tv/forms/FormStyles";
import StudentPersonalForm from "@/components/forms/student/studentPersonalForm";

export default function Page() {
	return (
		<div	className={layout()} >
			<Title children="신규 등록" />
			<StudentPersonalForm type="등록하기" />
		</div>
	)
}


