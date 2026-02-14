
import LazyEditorClient from "@/components/editor/EditorClient.lazy";
import { redirect } from "next/navigation";

export default function Page() {
	redirect("/login")
	return (
		<div>
			<LazyEditorClient/>
		</div>
	)
}
