import { Day } from "@/types";
import { create } from "zustand";

export type DaySelectable = Day 
type State = {
	selectables: DaySelectable[];
}

type Action = {
	addSelect: () => void;
	deleteSelect: (target: string) => void;
	initSelect: (p:Day[]) => void;
}

export const useDaySelect = create<State & Action>()((set) => ({
	selectables: [],
	addSelect:() => set((state) => ({selectables: [...state.selectables, "mon"]})),
	deleteSelect: (target) => set((state) => ({selectables: state.selectables.filter(d => d != target)})),
	initSelect:(p) => set(() => ({selectables: p})),
}))





// export const useDaySelect = create<State & Action>()(
// 	immer((set) => ({
// 		selectables: [undefined, "fri"],
// 		addSelect: () => set((state) => {state.selectables.push(undefined)}),
// 		deleteSelect: (target:string) => set((state)=> {state.selectables= state.selectables.filter(d => d != target)}),
// 		initSelect: (p: Day[]) => set((state) => ({selectables: p})),
// 	}))
// )

/**
[
	["mon", {start: {h: 000, m:00}, end: {h:00, m:00}}]
	["tue", {start: {h: 000, m:00}, end: {h:00, m:00}}]
	["fri", {start: {h: 000, m:00}, end: {h:00, m:00}}]
]
	*/
