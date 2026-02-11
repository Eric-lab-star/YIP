
import z from "zod";

import type { OutputData } from "@editorjs/editorjs";

export const BodySchema = z.object({
	content: z.custom<OutputData>()
})

export type BodySchemaType = z.infer<typeof BodySchema>
