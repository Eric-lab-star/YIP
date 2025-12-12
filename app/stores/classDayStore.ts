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
}

export const useDaySelect = create<State & Action>()((set,get) => ({
	selectables: [{id: uuidv4(), day: "mon", start: {h:0, m:0}, end: {h:0, m:0}}],
	addSelect:(id: string) => (set((state) => addSelectAction(id, state)),false),
	deleteSelect: (target) => set((state) => deletAction(target, state)),
	updateSelect: (target) => set((state) => updateAction(target, state),false),
	initSelect:(p) => (set(() => initAction(p)),true),
	findSelect: (id) => (get().selectables.find(v => v.id === id)),
}))


// (state) => ({selectables: [["mon", {start: {h:0, m:0}, end: {h:0, m:0} }]]})
const addSelectAction = (id: string, state: State & Action): State => {
	const uuid = z.uuidv4()
	try {
		uuid.parse(id)
		return {selectables: [{id, day: "mon", start: {h: 0, m:0}, end: {h:0, m:0} }, ...state.selectables]}
	}catch(e) {
		return state
	}
}

const deletAction = (target: string, state: State & Action): State => {
	try {
		const uuid4 = z.uuidv4({message: "invalid id"})
		const id = uuid4.parse(target)
		const filetered = state.selectables.filter(v => v.id != id)
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
		day.day = target.day
	}
	return {selectables: [day as ClassDayItemsType,...state.selectables.filter(f => f.id === target.id)]}
}

