<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Props {
		errors?: string[];
	}
	let { errors }: Props = $props();
</script>

{#if errors}
	<div transition:fly={{ y: -10 }} class="text-sm text-red-600">
		{#each errors as v}
			<p>{v}</p>
		{/each}
	</div>
{/if}
