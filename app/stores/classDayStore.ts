import { Day } from "@/types";
import { create } from "zustand";
import { ClassDayItemsType, ClassDaysType, DayType } from "../lib/zod/studentSchema";
import {v4 as uuidv4} from "uuid";
import * as z from "zod";

export type DaySelectable = Day 
type State = {
	selectables: ClassDaysType;
}

type Action = {
	addSelect: (id: string) => void;
	deleteSelect: (target: string ) => void;
	initSelect: (p:ClassDaysType) => void;
	updateSelect: (target: {id:string, day: DayType}) => void;
	findSelect: (id: string) => ClassDayItemsType|undefined;
	getIndexof: (item: ClassDayItemsType) => number;
}

export const useDaySelect = create<State & Action>()((set,get) => ({
	selectables: [{id: uuidv4(), day: "mon", start: {h:0, m:0}, end: {h:0, m:0}}],
	addSelect:(id: string) => (set((state) => addSelectAction(id, state)),false),
	deleteSelect: (target) => set((state) => deletAction(target, state)),
	updateSelect: (target) => set((state) => updateAction(target, state),false),
	initSelect:(p) => (set(() => initAction(p)),true),
	findSelect: (id) => (get().selectables.find(v => v.id === id)),
	getIndexof: (item) => (get().selectables.indexOf(item))
}))


// (state) => ({selectables: [["mon", {start: {h:0, m:0}, end: {h:0, m:0} }]]})
const addSelectAction = (id: string, state: State & Action): State => {
	const uuid = z.uuidv4()
	try {
		uuid.parse(id)
		const d = {id, day: "mon" as DayType, start: {h: 0, m:0}, end: {h:0, m:0} };
		state.selectables.push(d)
		return {selectables: [...state.selectables]}
	}catch(e) {
		return state
	}
}

const deletAction = (target: string, state: State & Action): State => {
	try {
		const uuid4 = z.uuidv4({message: "invalid id"})
		const id = uuid4.parse(target)
		const filetered = state.selectables.filter(v => v.id != id).reverse()
		return {selectables: filetered}
	} catch(e) {
		return state
	}
}

const initAction = (p: ClassDaysType): State => {
	return {selectables: p}
}

const updateAction = (target: {id:string, day: DayType} , state: State) : State => {
	const day = state.selectables.find(s => s.id === target.id);
	if (day) {
		const index = state.selectables.indexOf(day)
		day.day = target.day
		const ns = [...state.selectables.slice(0,index), day, ...state.selectables.slice(index+1)]
		return {selectables: ns}
	}
	return {selectables: state.selectables}
}

