import { testFormSchema } from "@/app/lib/zod/testFormSchema";
import * as z from "zod";

export type testFormType = z.infer<typeof testFormSchema>
