<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="flex justify-center">
	<div class="w-full max-w-md">
		<div class="my-6 text-center">
			<h1 class="text-2xl font-bold tracking-widest text-gray-400">WELCOME</h1>
			<div class="text-4xl">AKUKAS-APP</div>
		</div>
		{@render children()}
	</div>
</div>
