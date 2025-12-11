import { Day } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer"

export type DaySelectable = Day | "unknown" | undefined
type State = {
	selectables: DaySelectable[];
}

type Action = {
	addSelect: () => void;
	deleteSelect: (target: string) => void;
	initSelect: (p:Day[]) => void;
}

export const useDaySelect = create<State & Action>()(
	immer((set) => ({
		selectables: ["unknown"],
		addSelect: () => set((state) => {state.selectables.push("unknown")}),
		deleteSelect: (target:string) => set((state)=> {state.selectables= state.selectables.filter(d => d != target)}),
		initSelect: (p: Day[]) => set((state) => {state.selectables = p}),
	}))
)
