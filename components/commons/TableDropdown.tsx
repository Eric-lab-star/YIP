import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/core";
import {
	Columns3,
	Grid3x3,
	Heading,
	Rows3,
	Table as TableIcon,
	Trash2,
} from "lucide-react";

// 표 삽입 및 편집 컨트롤. 표 안에 커서가 있을 때만 행/열 편집 항목이 나타난다.
export default function TableDropdown({
	className,
	editor,
}: {
	className: string;
	editor: Editor;
}) {
	const inTable = editor.isActive("table");

	const insertTable = () =>
		editor
			.chain()
			.focus()
			.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
			.run();

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button type="button" aria-label="표" className={className}>
							<TableIcon strokeWidth={2} size={18} />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent>표</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className="w-52" align="start">
				<DropdownMenuItem onClick={insertTable}>
					<Grid3x3 className="text-zinc-500" />
					표 삽입 (3×3)
				</DropdownMenuItem>

				{inTable && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className="text-zinc-400">행</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => editor.chain().focus().addRowBefore().run()}
						>
							<Rows3 className="text-zinc-500" />위에 행 추가
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => editor.chain().focus().addRowAfter().run()}
						>
							<Rows3 className="text-zinc-500" />
							아래에 행 추가
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={() => editor.chain().focus().deleteRow().run()}
						>
							<Trash2 />행 삭제
						</DropdownMenuItem>

						<DropdownMenuSeparator />
						<DropdownMenuLabel className="text-zinc-400">열</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => editor.chain().focus().addColumnBefore().run()}
						>
							<Columns3 className="text-zinc-500" />
							왼쪽에 열 추가
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => editor.chain().focus().addColumnAfter().run()}
						>
							<Columns3 className="text-zinc-500" />
							오른쪽에 열 추가
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={() => editor.chain().focus().deleteColumn().run()}
						>
							<Trash2 />열 삭제
						</DropdownMenuItem>

						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => editor.chain().focus().toggleHeaderRow().run()}
						>
							<Heading className="text-zinc-500" />
							헤더 행 토글
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={() => editor.chain().focus().deleteTable().run()}
						>
							<Trash2 />표 삭제
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
