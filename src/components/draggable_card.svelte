<script lang="ts">
	import { dropzone, draggable } from '$lib/dnd';	
    import type {Task} from '$lib/types/task.interface';

    export let card: Task;
	export let source: string;
</script>

<div 
	class="truncate text-black font-medium p-2 border-4 border-solid rounded-md border-sk-back-5 w-[9rem] text-center hover:z-10" 
	style="background-color: {card.backgroundColor ?? '#ffffff'}; border-color: {card.borderColor ?? card.backgroundColor ?? '#ffffff'};"
	use:draggable={[card.id, source]}>
    {card.text} 
</div>