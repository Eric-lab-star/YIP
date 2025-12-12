import { Day } from "@/types";
import { create } from "zustand";
import { ClassDayEntriesType, DayType } from "../lib/zod/studentSchema";

export type DaySelectable = Day 
type State = {
	selectables: ClassDayEntriesType[];
}

type Action = {
	addSelect: () => void;
	deleteSelect: (target: string) => void;
	initSelect: (p:Day[]) => void;
}

export const useDaySelect = create<State & Action>()((set) => ({
	selectables: [["mon",  {start: {h: 0, m: 0}, end: {h: 0, m:0}}]],

	addSelect:() => (set(addSelectAction)),
	deleteSelect: (target) => set((state) => ({selectables: state.selectables.filter(d => d != target)})),
	initSelect:(p) => (set(() => ({selectables: p})),true),
}))

// (state) => ({selectables: [["mon", {start: {h:0, m:0}, end: {h:0, m:0} }]]})
const addSelectAction = (state: State & Action): State => {
	return {selectables: [["mon", {start: {h: 0, m:0}, end: {h:0, m:0}}]]}
}



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
