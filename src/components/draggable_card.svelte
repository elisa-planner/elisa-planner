<script lang="ts">
	import { dropzone, draggable } from '$lib/dnd';	
    import type Task from '$lib/types/task.interface';

    export let card: Task;
</script>

<div 
	class="truncate text-black font-medium p-2 border-2 border-solid rounded-md border-sk-back-5 w-[9rem] text-center 
	hover:outline-sk-theme-3 hover:outline-offset-0.25rem hover:z-10" 
	style="background-color: {card.backgroundColor ?? '#ffffff'}; border-color: {card.borderColor ?? card.backgroundColor ?? '#ffffff'};"
	use:draggable={[card.id]}>
    {card.text} 
</div>	

