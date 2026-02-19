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
import { Link } from "lucide-react";
import { useCallback, useState } from "react";

export default function LinkDialog({className, editor}: {className: string; editor: Editor}) {
	const setLink = useCallback((url: string) => {
			// cancelled
			if (url === null) {
				return
			}

			// empty
			if (url === '') {
				editor.chain().focus().extendMarkRange('link').unsetLink().run()

				return
			}

			// update link
			try {
				editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
			} catch (e) {
				console.log(e)
			}
		}, [editor])

	const [open, setOpen] = useState(false)
	const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formdata = new FormData(e.currentTarget)
		const data = Object.fromEntries(formdata)
		setLink(data.url as string)
		setOpen(false)
	}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={className}>
					<Link strokeWidth={"2"} size={"16"} />
				</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
			<form className="space-y-3"  onSubmit={(e)=> handleSubmit(e)}>
        <DialogHeader>
          <DialogTitle>링크 만들기</DialogTitle>
          <DialogDescription>
						링크를 입력하세요.
          </DialogDescription>
        </DialogHeader>
					<div className="flex items-center gap-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="link" className="sr-only">
								URL
							</Label>
							<Input
								name="url"
								id="link"
								defaultValue={editor.getAttributes('link').href || ""}
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
