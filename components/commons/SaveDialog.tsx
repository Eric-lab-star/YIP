import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUnusedKeys } from "@/lib/tiptap-utils";
import { Editor } from "@tiptap/core";
import { Save } from "lucide-react";
import { redirect } from "next/navigation";
import { RefObject, useState } from "react";
import { toast } from "sonner";
import useUser from "../SWR/auth/user";

interface SaveDialogInterface {
	uploadedImageKeys: RefObject<string[]>;
	className?: string;
	editor: Editor;
	postId?: string;
	title: string;
	setTitle: (v: string) => void;
}

export default function SaveDialog({ title, setTitle, postId, uploadedImageKeys, editor }: SaveDialogInterface) {
	const { user } = useUser()
	const userId = user?.success ? user.id : null
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const ICON_SIZE = 20;

	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		// 제목이 비어 있으면 저장하지 않는다. (이전엔 loading을 true로 둔 채
		// return해 저장 버튼이 "저장중..."에서 영구히 멈추는 버그가 있었다.)
		if (!title.trim()) {
			toast.error("제목을 입력하세요.", { position: "top-center" })
			return
		}
		setLoading(true)

		const formdata = new FormData()
		const contentJSON = editor.getJSON()

		const keys = contentJSON.content.filter(v => v.type === "image").map(v => {
			const key = new URL(v.attrs?.src).pathname.slice(1)
			return key
		})

		const unusedKeys = getUnusedKeys(uploadedImageKeys.current, keys)

		const content = JSON.stringify(contentJSON)

		formdata.append("content", content)
		formdata.append("title", title)
		if (postId) {
			formdata.append("postId", postId)
		}


		const deleteResult = await fetch("/api/r2", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				keys: unusedKeys,
			})
		})

		if (!deleteResult.ok) {
			console.log("r2 image clean up failed")
		}

		const response = await fetch("/api/tiptab/post", {
			method: "POST",
			body: formdata,
		})

		if (!response.ok) {
			toast.error("저장 할 수 없습니다.", { position: "top-center" })
		}

		if (response.ok) {
			toast.success("저장되었습니다.", { position: "top-center" })
		}

		uploadedImageKeys.current = []
		setLoading(false)
		redirect(`/students/${userId}`)

	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="h-10">
					<Save className="" size={ICON_SIZE} strokeWidth={2} />
					<div>저장하기</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<form className="space-y-3" onSubmit={(e) => handleSubmit(e)}>
					<DialogHeader>
						<DialogTitle>저장하기</DialogTitle>
						<DialogDescription>
							제목을 입력하세요.
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center gap-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="title" className="sr-only">
								제목
							</Label>
							<Input
								name="title"
								id="title"
								onChange={(e) => handleChange(e)}
								value={title}
							/>
						</div>
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button disabled={loading} type="button">취소</Button>
						</DialogClose>
						<Button disabled={loading} type="submit">{loading ? "저장중..." : "확인"}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
