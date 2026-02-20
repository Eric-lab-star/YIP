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
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SaveDialog({className, editor}: {className?: string; editor: Editor}) {
	const [title, setTitle] = useState<string>("")
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const ICON_SIZE = 20;

	const [open, setOpen] = useState(false)
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(!title) return;
		const formdata = new FormData()
		const contentJSON = editor.getJSON()
		const content = JSON.stringify(contentJSON)

		formdata.append("content", content)
		formdata.append("title", title)
		const response = await fetch("/api/tiptab/post", {
			method: "POST",
			body: formdata,
		})

		if(!response.ok) {
			toast.error("저장 할 수 없습니다.")
		}
		setOpen(false)
	}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
				<Button className="h-10">
					<Save className="" size={ICON_SIZE} strokeWidth={2}/>
					<div>저장하기</div>
				</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
			<form className="space-y-3"  onSubmit={(e)=> handleSubmit(e)}>
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
								onChange={(e)=> handleChange(e)}
								value={title}
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
