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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Editor } from "@tiptap/core";
import { Youtube } from "lucide-react";
import { useState } from "react";

export default function YoutubeURLDialog({className, editor}: {className: string; editor: Editor}) {

const ICON_SIZE = 20;
	const [open, setOpen] = useState(false)
	const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formdata = new FormData(e.currentTarget)
		const data = Object.fromEntries(formdata)
		editor.chain().focus().setYoutubeVideo({
			src: data.url as string,
		}).run()
		setOpen(false)
	}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <button type="button" aria-label="유튜브" className={className}>
					<Youtube strokeWidth={"2"} size={ICON_SIZE}/>
				</button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>유튜브</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-md">
			<form className="space-y-3"  onSubmit={(e)=> handleSubmit(e)}>
        <DialogHeader>
          <DialogTitle>링크 올리기</DialogTitle>
          <DialogDescription>
						유튜브 링크를 입력하세요.
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
								placeholder="https://www.youtube.com/watch?v=..."
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
