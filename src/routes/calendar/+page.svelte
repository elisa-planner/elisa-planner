<script lang="ts">
	import type { PageData } from './$types';

	import DraggableCard from '$components/draggable_card.svelte';
	import DropCell from '$components/drop_cell.svelte';
	import { dropzone, draggable } from '$lib/dnd';
	import type Task from '$lib/types/task.interface';


	import './global.css';
	import './../../app.css';

	export let data: PageData;

	const days: {day: string, img: string}[] = [
		{day: 'Monday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182268762529843/lunedi.png?ex=65e25a6b&is=65cfe56b&hm=537dd11968c0a8991166a313410c29d4a75cd47cd9f245799f1c375b8f1f83b7&'},
		{day: 'Tuesday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182268963717190/martedi.png?ex=65e25a6b&is=65cfe56b&hm=1c1b1d0e309a0e8b047341922872dd8183614c154fd13ef36a2e78b9d342dec3&'},
		{day: 'Wednesday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269198471198/mercoledi.png?ex=65e25a6b&is=65cfe56b&hm=30046c73352b0738c233864d19ed6e569bc6a1fbae9b684e2d512e36ecda6203&'},
		{day: 'Thursday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182268514803712/giovedi.png?ex=65e25a6b&is=65cfe56b&hm=1dd76f9ceff9587968d532c74a5967cd8d69197a2f087925a2ae4c7030564a4c&'},
		{day: 'Friday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269760503828/venerdi.png?ex=65e25a6c&is=65cfe56c&hm=32c2d6cdd1835372d54b09f7e1d838405768999939b6ed44903d651399e38b98&'},
		{day: 'Saturday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269488013382/sabato.png?ex=65e25a6b&is=65cfe56b&hm=64d0a29fead9a6009e41e375e70b1b2c5bc46b423a673ca64ea9c652d7978b97&'},
		{day: 'Sunday', img: 'https://cdn.discordapp.com/attachments/1185978476566696007/1208182269999714374/domenica.png?ex=65e25a6c&is=65cfe56c&hm=7bfb91e16e1e9deb3086b1631e2462a98e7d06a690c56589a6a3351f761bb226&'},
	];

	const MAGIC: number = 0.16666666667;

	let minuteStep: number = 30.0;

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
</script>

<div class="page bg-[#fafafa]">
	<div class="grid">
		<div class="mx-2">
			<div class="w-[10rem]">
			</div>
			{#each arrayRange(0.0, 24.0, (minuteStep * MAGIC) / 10.0) as hour, row}
			<div class="bg-[darkgray]">
				<div class="flex flex-col flex-1 items-center h-[3rem] gap-y-0.4">
					<h2>{formatHour(hour, true)}</h2>
				</div>
			</div>
			{/each}
		</div>

		{#each days as day, column}
			<div class="flex flex-col flex-1 items-center">
				<div class="mb-2 w-[10rem] h-[4rem] flex flex-col items-center p-2 border-2 border-black border-solid rounded bg-[#fafafa] text-black">
					<img src={day.img} alt={day.day} class="" />
				</div>
				<ul class="column-cards">
					{#each arrayRange(0.0, 24.0, (minuteStep * MAGIC) / 10.0) as hour, row}
						{@const dailyTasks = data.activeTasks.filter((task) => task.pos?.col === column && task.pos?.row === row)}
						<DropCell column={column} row={row} data={data}
							on:droppable={() => data = data} on:dropzone={() => data = data}
						>
							{#if dailyTasks.length > 0}
								<ul class="column-cards">
									{#each dailyTasks as task}
										{#if task.isPreview}
											<li class="card-preview">
												{task.text}
											</li>
										{:else}
											<DraggableCard card={task} />
										{/if}
									{/each}
								</ul>
							{:else}
							{/if}
						</DropCell>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="flex flex-row flex-wrap">
		{#each data.tasks as task}
			<DraggableCard card={task} />
		{/each}
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 95vh;
		padding: 1rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	.card-list {
		flex: 1;
		padding: 0.1rem;
	}

	.cards {
		flex-direction: row;
		column-gap: 0.4rem;
	}

	.column-cards {
		flex-direction: column;
		row-gap: 0.4rem;
	}

	.grid {
		flex: 5;
		max-height: 100vh; /* Set a max height for the grid */
		overflow-y: auto; /* Enable vertical scrolling if needed */
		display: flex;
		flex-direction: row;
		padding: 0.1rem;
		z-index: 5;
	}

	.row {
		display: flex;
		flex-direction: row;
		flex: 1; /* Each row takes equal vertical space */
	}

	.day {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}

	h2 {
		margin-block-start: 0;
		margin-block-end: 0.5rem;
	}

	.card-preview {
		opacity: 0.5;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;

		padding: 0.8rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: var(--sk-back-5);
		min-width: 7rem;

		width: -webkit-fill-available;
		height: 100%;
	}

	.column:global(.droppable) {
		outline: 0.1rem solid var(--sk-theme-1);
		z-index: 2;
	}

	.column:global(.droppable) * {
		pointer-events: none;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: var(--sk-back-5);
		cursor: pointer;
	}

	button:hover {
		background-color: var(--sk-back-2);
	}

	button:active {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	.controls {
		margin-bottom: 1rem;
		display: flex;
		gap: 1rem;
	}
</style>
