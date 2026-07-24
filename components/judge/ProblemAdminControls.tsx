"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DoodleButton } from "@/components/ui/doodle-button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProblemAction } from "@/app/actions/problemAction";

export default function ProblemAdminControls({ slug }: { slug: string }) {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);

	const onDelete = async () => {
		if (deleting) return;
		if (!window.confirm("이 문제를 삭제할까요? 되돌릴 수 없습니다.")) return;
		setDeleting(true);
		const res = await deleteProblemAction(slug);
		if (res.success) {
			toast.success("문제를 삭제했습니다.");
			router.push("/problems");
		} else {
			toast.error(res.error);
			setDeleting(false);
		}
	};

	return (
		<div className="flex items-center gap-2">
			<DoodleButton asChild size="sm">
				<Link href={`/problems/${slug}/edit`}>
					<Pencil className="size-4" />
					수정
				</Link>
			</DoodleButton>
			<DoodleButton
				tone="danger"
				size="sm"
				onClick={onDelete}
				disabled={deleting}
			>
				<Trash2 className="size-4" />
				삭제
			</DoodleButton>
		</div>
	);
}
