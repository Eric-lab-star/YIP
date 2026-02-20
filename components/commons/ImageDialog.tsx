"use client";
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
import { Editor } from "@tiptap/core";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useUser from "../SWR/auth/user";

export default function ImageUploadDialog({className, editor}: {className: string; editor: Editor}) {

	const ICON_SIZE = 20;
	const [preview, setPreview] = useState<string | ArrayBuffer | null>()
	const [file, setFile] = useState<File|null>()
	const [open, setOpen] = useState(false)
	const {user} = useUser()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!user?.success) return;
		if (!file) return;
		e.preventDefault()
		const formdata = new FormData(e.currentTarget)
		formdata.append("userId", user.id)
		try {
			const res = await fetch("/api/tiptab/image", {
				method: "POST",
				body: formdata
			})
			const data = await res.json()
			if(data.file.url) {
				editor.chain().focus().setImage({src: data.file.url}).run()
			}
			setOpen(false)
		} catch(e) {
			console.log(e)
		}
	}


	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (!selected) return;
		if (!selected.type.startsWith('image/')) {

			return toast.error("이미지 파일을 선택하세요.", {
				position: "top-center",
				action: {
					label: "x",
					onClick: () => {}
			}})
		};
		if (selected.size > 4 * 1024 * 1024) {
			return toast.error("4MB 이하의 파일만 업로드 가능해요", {
				position: "top-center",
				action: {
					label: "x",
					onClick: () => {}
			}})
		}
		setFile(selected)

		const reader = new FileReader()
		reader.onloadend = () => setPreview(reader.result)
		reader.readAsDataURL(selected)
	}


	useEffect(() => {
		if(!open) {
			setPreview(null)
			setFile(null)
		}
	},[open])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={className}>
					<Image strokeWidth={"2"} size={ICON_SIZE}/>
				</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
			<form encType="multipart/form-data"  className="space-y-3"  onSubmit={(e)=> handleSubmit(e)}>
        <DialogHeader>
          <DialogTitle>이미지 파일 올리기</DialogTitle>
          <DialogDescription>
						이미지 파일을 업로드할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
					<div className="flex items-center gap-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="link" className="w-full h-20 flex justify-center items-center outline-dashed outline-offset-2 outline-2  bg-zinc-200">
									사진 선택하기
							</Label>
							{preview && <img src={preview as string} alt="preview"/>
							}
							<Input
								onChange={(e) => handleFileChange(e)}
								name="image"
								accept="image/*"
								id="link"
								type="file"
								className="hidden"
							/>
						</div>
					</div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">취소</Button>
          </DialogClose>
					<Button type="submit">확인</Button>
        </DialogFooter>
				
			</form>
      </DialogContent>
    </Dialog>
  )
}
