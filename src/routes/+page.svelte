<script>
	import DraggableCard from './../components/draggable_card.svelte';
	import { dropzone, draggable } from '$lib/dnd';
	import './global.css';

	export let data;
	
	// Add a column
	const add_column = () => {
		data.columns += 1;
		data = data;
	};

	// Add a row
	const add_row = () => {
		data.rows += 1;
		data = data;
	};
</script>



<div class="page">
	<div class="card-list">
		<div class="controls">
			<button on:click={add_column}>➕ Add Column</button>
			<button on:click={add_row}>➕ Add Row</button>
		</div>

		<ul class="cards">
			{#each data.possibleCards as card}
				<DraggableCard card={card}/>
			{/each}
		</ul>
	</div>

	<div class="grid">
		{#each Array(data.rows) as _, row}
			<ul class="row">
				{#each Array(data.columns) as _, column}
					{@const cards = data.cards.filter((c) => c.column === column && c.row === row)}
					<li
						class="column"
						use:dropzone={{
							on_droppable(card_id, type) {
								if (type === 'source') {
									let card = {...data.possibleCards.find((c) => c.id === card_id)};
									card.column = column;
									card.row = row;
									card.preview = true;
									data.cards = [...data.cards, card];
								} else {
									let card = {...data.cards.find((c) => c.id === card_id)};
									card.column = column;
									card.row = row;
									card.preview = true;
									data.cards = [...data.cards, card];
								}
								data = data;
							},
							on_dropzone(card_id, type) {
								if (type === 'source') {
									let card = {...data.possibleCards.find((c) => c.id === card_id)};
									card.column = column;
									card.row = row;
									card.id = Math.random().toString(36).substring(7);
									data.cards = [...data.cards, card];
								} else {
									let card = data.cards.find((c) => c.id === card_id);
									card.column = column;
									card.row = row;
								}
								data = data;
							}
						}}
					>
						{#if cards.length > 0}
							<ul class="cards">
								{#each cards as card}
									{#if card.preview}
										<li class="card-preview">
											{card.title}
										</li>
									{:else}
										<li class="card" use:draggable={[card.id, 'grid']}>
											{card.title}
										</li>	
									{/if}
									
								{/each}
							</ul>
						{:else}
							<p>No Cards...</p>
						{/if}
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style>
	
	.page {
		display: flex;
		flex-direction: row;
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

	li {
		padding: 1rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: var(--sk-back-5);
	}

	.grid {
		flex: 5;
		max-height: 100vh; /* Set a max height for the grid */
		overflow-y: auto; /* Enable vertical scrolling if needed */
		display: flex;
		flex-direction: column;
		padding: 0.1rem;
		z-index: 5;
	}

	.row {
		display: flex;
		flex: 1; /* Each row takes equal vertical space */
	}

	.card-list {
		flex: 1;
		padding: 0.1rem;
	}

	h2 {
		margin-block-start: 0;
		margin-block-end: 0.5rem;
	}

	.card-preview {
		opacity: 0.5;
	}

	.cards {
		flex-direction: column;
		row-gap: 0.4rem;
	}

	.card:hover {
		outline: 0.1rem solid var(--sk-theme-3);
		outline-offset: 0.25rem;
		z-index: 1;
	}

	
	.column {
		width: 100%;
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
