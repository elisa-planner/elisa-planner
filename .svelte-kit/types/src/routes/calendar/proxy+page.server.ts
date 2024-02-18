// @ts-nocheck
import type {PageServerLoad} from './$types'
import type {Task} from '$lib/types/task.interface';


export const load = async () => {
	return {
		activeTasks: [
		],
		tasks: [
			{
				id: 0,
				text: 'skin care / doccia',
				backgroundColor: '#adc7c7',
				clonable: true
			},
			{
				id: 1,
				text: 'lettiera meggy',
				backgroundColor: '#b3b3b3',
				clonable: true
			},
			{
				id: 2,
				text: '🍪',
				borderColor: "#a3827f",
				clonable: true
			},
			{
				id: 3,
				text: 'cercare lavoro',
				backgroundColor: "#a3827f",
				clonable: true
			},
			{
				id: 4,
				text: '✍️',
				clonable: true
			},
			{
				id: 5,
				text: '🥪',
				clonable: true
			},
			{
				id: 6,
				text: 'riposino',
				clonable: true
			},
			{
				id: 7,
				text: '🍕',
				clonable: true
			},
			{
				id: 8,
				text: 'skin care',
				clonable: true
			},
		]
	} as { activeTasks: Task[], tasks: Task[] }
};
;null as any as PageServerLoad;