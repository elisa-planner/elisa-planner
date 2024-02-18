<script lang="ts">
    import { dropzone, draggable } from '$lib/dnd';
    import type Task from '$lib/types/task.interface';
	import { createEventDispatcher } from 'svelte';

    export let column: number;
    export let row: number;
    export let data;

    const dispatch = createEventDispatcher();

    function on_droppable(task_id: number, column: number, row: number) {
		console.log('On droppable');
		let _task: Task = data.tasks.find((c: Task) => c.id === task_id)!;
		let task: Task = { ..._task };
        task.id = Math.floor(Math.random() * 10000);
		task.pos = { col: column, row: row };
		task.isPreview = true;
		data.activeTasks = [...data.activeTasks, task];
		data = data;
        dispatch('droppable');
	}

	function on_dropzone(column: number, row: number) {
		return function (task_id: number) {
			let _task: Task = data.tasks.find((c: Task) => c.id === task_id)!;
			let task: Task = { ..._task };
            task.id = Math.floor(Math.random() * 10000);
			task.pos = { col: column, row: row };
			data.activeTasks = [...data.activeTasks, task];
			data = data;
            dispatch('dropzone');
		};
	}
</script>

<li
	class="border-2 border-black-100 border-dashed rounded text-black w-[9rem] h-[3rem] flex items-center justify-center bg-[#fafafa] hover:bg-[#f0f0f0] transition-all duration-200 ease-in-out"
	use:dropzone={{
		on_dropzone: on_dropzone(column, row),
		on_droppable
	}}
>
	<slot />
</li>
