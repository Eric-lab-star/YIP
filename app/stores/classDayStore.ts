import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
type State = {
	days: number[];
}

type Action = {
	addDay: () => void;
	deleteDay: (t: number) => void;
}

export const useClassDays = create<State & Action>()(
	immer((set) => ({
		days: [Date.now()],
		addDay: () => set((state) => {state.days.push(Date.now())}),
		deleteDay: (t:number) => set((state)=> {state.days = state.days.filter(d => d != t)}),
	}))
)
