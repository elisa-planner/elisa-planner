<script lang="ts">
    import { dropzone, draggable } from '$lib/dnd';
    import type {Task} from '$lib/types/task.interface';
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<li
	class="border-2 border-black border-dashed rounded text-black w-[9rem] h-[3rem] flex items-center justify-center bg-[#fafafa] hover:bg-[#f0f0f0] transition-all duration-200 ease-in-out"
	on:click={() => dispatch('add_task')}
>
	+
</li>
