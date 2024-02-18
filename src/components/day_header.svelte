<script lang="ts">
    export let day: {day: string, img: string};
</script>

<div class="mb-2 w-[10rem] h-[4rem] flex flex-col items-center p-2 border-2 rounded border-black border-solid bg-[#fafafa] text-black">
    <img src={day.img} alt={day.day}/>
</div>