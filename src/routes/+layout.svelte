<script lang="ts">
	import Memuat from '@ui/loading/memuat.svelte';
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/state';
	let { children } = $props();
</script>

<svelte:head>
	<title>AKUKASAPP</title>
</svelte:head>

{@render children()}

{#if navigating.from}
	<div
		transition:fade
		class="fixed inset-0 flex items-center justify-center bg-black/30 text-white"
	>
		<Memuat />
	</div>
{/if}
