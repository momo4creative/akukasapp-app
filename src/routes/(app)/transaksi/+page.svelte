<script lang="ts">
	import Form from '@pages/transaksi/form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="m-3 text-4xl">Transaksi</h1>

<div class="m-3">
	<Form />
</div>
