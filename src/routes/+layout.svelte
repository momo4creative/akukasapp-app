<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>AKUKASAPP</title>
</svelte:head>

{@render children()}
