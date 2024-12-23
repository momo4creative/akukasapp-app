<script lang="ts">
	import Form from '@pages/transaksi/form.svelte';
	import type { PageData } from './$types';
	import List from '@pages/transaksi/list.svelte';
	import Pagination from '@pages/layout/pagination.svelte';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="m-3 text-4xl">Transaksi</h1>

{#await data.promiseListTransaksi}
	<p class="italic">Memuat..</p>
{:then res}
	<List values={res.data} />
	<Pagination values={res} />
{:catch err}
	<p>{err.message}</p>
{/await}

<div class="m-3 rounded bg-white p-3">
	<Form />
</div>
