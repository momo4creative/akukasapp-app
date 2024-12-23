<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="grid justify-center p-6">
	<div class="mx-auto flex gap-1">
		<span style="--delay:0ms" class="animate-bounce text-4xl">.</span>
		<span style="--delay:200ms" class="animate-bounce text-4xl">.</span>
		<span style="--delay:400ms" class="animate-bounce text-4xl">.</span>
	</div>
	<div class="italic">Memuat..</div>
</div>

<style lang="postcss">
	span {
		animation-delay: var(--delay);
	}
</style>
