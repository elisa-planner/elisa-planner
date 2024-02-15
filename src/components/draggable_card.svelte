<script lang="ts">
    import { draggable } from 'svelte-dnd-action';
    import { DraggableCard } from '$lib/types/draggable_card';
    
    export let card: DraggableCard;
    export let source: string;
</script>

<li class="card" use:draggable={[card.id, source]}>
    {card.title}
</li>	