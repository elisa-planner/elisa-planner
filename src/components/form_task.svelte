<script lang="ts">
	import type { TaskForm } from "$lib/types/task.interface";
	import { createEventDispatcher } from "svelte";

    let formData: TaskForm = {
      task: '',
      backgroundColor: '',
      borderColor: '',
    };
  
    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        dispatch('add_task', formData);
    };
  </script>
  
  <div class="p-4 absolute z-10 flex justify-center align-center bg-[#000000db] w-full h-full">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-4">
        <label for="task" class="block text-sm font-medium">task:</label>
        <input type="text" id="task" bind:value={formData.task} class="mt-1 p-2 w-full border rounded-md">
      </div>
  
        <div class="mb-4">
            <label for="backgroundColor" class="block text-sm font-medium">Background color:</label>
            <input type="color" id="backgroundColor" bind:value={formData.backgroundColor} class="w-full border rounded-md">
        </div>

        <div class="mb-4">
            <label for="borderColor" class="block text-sm font-medium">Border color:</label>
            <input type="color" id="borderColor" bind:value={formData.borderColor} class="w-full border rounded-md">
        </div>
  
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Add</button>
    </form>
  </div>
  