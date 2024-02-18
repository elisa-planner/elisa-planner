<script lang="ts">
	import type { PageData } from './$types';

	import DraggableCard from '$components/draggable_card.svelte';
	import DropCell from '$components/drop_cell.svelte';
	import { dropzone, draggable } from '$lib/dnd';
	import type {Task, TaskForm} from '$lib/types/task.interface';

	import './global.css';
	import './../../app.css';
	import DayHeader from '$components/day_header.svelte';
	import { onMount } from 'svelte';
	import AddTask from '$components/add_task.svelte';
	import FormTask from '$components/form_task.svelte';

	export let data: PageData;

	const days: { day: string; img: string }[] = [
		{
			day: 'Monday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182268762529843/lunedi.png?ex=65e25a6b&is=65cfe56b&hm=537dd11968c0a8991166a313410c29d4a75cd47cd9f245799f1c375b8f1f83b7&'
		},
		{
			day: 'Tuesday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182268963717190/martedi.png?ex=65e25a6b&is=65cfe56b&hm=1c1b1d0e309a0e8b047341922872dd8183614c154fd13ef36a2e78b9d342dec3&'
		},
		{
			day: 'Wednesday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269198471198/mercoledi.png?ex=65e25a6b&is=65cfe56b&hm=30046c73352b0738c233864d19ed6e569bc6a1fbae9b684e2d512e36ecda6203&'
		},
		{
			day: 'Thursday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182268514803712/giovedi.png?ex=65e25a6b&is=65cfe56b&hm=1dd76f9ceff9587968d532c74a5967cd8d69197a2f087925a2ae4c7030564a4c&'
		},
		{
			day: 'Friday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269760503828/venerdi.png?ex=65e25a6c&is=65cfe56c&hm=32c2d6cdd1835372d54b09f7e1d838405768999939b6ed44903d651399e38b98&'
		},
		{
			day: 'Saturday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269488013382/sabato.png?ex=65e25a6b&is=65cfe56b&hm=64d0a29fead9a6009e41e375e70b1b2c5bc46b423a673ca64ea9c652d7978b97&'
		},
		{
			day: 'Sunday',
			img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269999714374/domenica.png?ex=65e25a6c&is=65cfe56c&hm=7bfb91e16e1e9deb3086b1631e2462a98e7d06a690c56589a6a3351f761bb226&'
		}
	];

	const MAGIC: number = 0.16666666667;

	let minuteStep: number = 30.0;
	let step: number = (minuteStep * MAGIC) / 10.0;

	$: time = new Date();
	$: timePercentage = getTimePercentage();

	let addTaskOpen: boolean = false;

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
			timePercentage = getTimePercentage();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	// function: format a number composed of "hour.minute" to a string "hour:minute"
	const formatHour = (hour: number, am?: boolean) => {
		let _hour: number = Math.floor(hour);
		let _minute: number = Math.round((hour - _hour) * 60);

		let sHour: string = String(am ? (_hour > 12 ? _hour - 12 : _hour) : _hour);
		let sMinute: string = (_minute < 10 ? '0' : '') + _minute;
		return `${sHour}:${sMinute} ${am ? (_hour > 12 ? 'pm' : 'am') : ''}`;
	};

	const arrayRange = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

	function on_dropzone(column: number, row: number) {
		return function ([task_id, source]: [number, string]) {
			let task: Task;
			if (source === 'grid') {
				task = data.activeTasks.find((c: Task) => c.id === task_id)!;
			}
			if (source === 'tasks') {
				task = { ...data.tasks.find((c: Task) => c.id === task_id)! };
				task.id = Math.floor(Math.random() * 10000);
				data.activeTasks = [...data.activeTasks, task];
			}
			let p_task: Task | undefined = data.activeTasks.find(
				(c: Task) => c.pos?.row === row && c.pos?.col === column
			);
			if (p_task !== undefined) {
				data.activeTasks = data.activeTasks.filter((c: Task) => c.id !== p_task?.id);
			}
			task.pos = { col: column, row: row };
			task.isPreview = false;
			data = data;
			return task;
		};
	}

	function getTimePercentage() : number {
		return (time.getHours() * 100 / 24) + (time.getMinutes() * 100 / 24 / 60) + (time.getSeconds() * 100 / 24 / 60 / 60);
	}

	function addTask(event: CustomEvent<TaskForm>) {
		console.log(event);
		addTaskOpen = false;

		data.tasks.push({
			id: data.tasks.length + 1,
			text: event.detail.task,
			backgroundColor: event.detail.backgroundColor,
			borderColor: event.detail.borderColor,
		});
		data = data;
	}
</script>

{#if addTaskOpen}
	<FormTask on:add_task={addTask}/>
{/if}

<div class="flex flex-col bg-[#fafafa] h-[100vh]">
	<div class="flex flex-row justify-end py-1 bg-[#adc7c7]">
		<h1 class="text-xs font-bold text-black px-2">{time}</h1>
	</div>
	<div class="flex overflow-y-auto">
		<div class="bg-[#929292] min-h-full h-fit min-w-[10rem] py-2">
			<div class="h-[3.5rem]"/>
			<ul class="relative flex-col gap-y-[0.4rem]">
				<hr class="absolute w-full border-dashed border-2 border-[red]" style="top: {timePercentage}%;"/>
				{#each arrayRange(0.0, 24.0, step) as hour, row}
					<div
						class="h-[3rem] flex flex-col items-end px-3"
					>
						<h2 class="font-bold text-black z-2">{formatHour(hour, true)}</h2>
					</div>
				{/each}
			</ul>
			<div class="h-[1rem]"/>
		</div>

		<div class="flex m-3">
			{#each days as day, column}
				<div class="flex flex-col flex-1 items-center">
					<DayHeader {day} />
					<ul class="flex-col gap-y-[0.4rem]">
						{#each arrayRange(0.0, 24.0, step) as hour, row}
							{@const dailyTasks = data.activeTasks.filter(
								(task) => task.pos?.col === column && task.pos?.row === row
							)}
							<DropCell {column} {row} on_dropzone={() => on_dropzone(column, row)}>
								{#if dailyTasks.length > 0}
									<ul class="column-cards">
										{#each dailyTasks as task}
											{#if task.isPreview}
												<li class="card-preview">
													{task.text}
												</li>
											{:else}
												<DraggableCard card={task} source="grid" />
											{/if}
										{/each}
									</ul>
								{:else}{/if}
							</DropCell>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-row flex-wrap gap-2 p-2">
		<AddTask on:add_task={() => addTaskOpen = true}/>
		{#each data.tasks as task}
			<DraggableCard card={task} source="tasks" />
		{/each}
		
	</div>
</div>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	h2 {
		margin-block-start: 0;
		margin-block-end: 0.5rem;
	}

	.card-preview {
		opacity: 0.5;
	}
</style>
