<script lang="ts">
	import Form from '@pages/transaksi/form.svelte';
	import type { PageData } from './$types';
	import List from '@pages/transaksi/list.svelte';
	import Pagination from '@pages/layout/pagination.svelte';
	import Memuat from '@ui/loading/memuat.svelte';
	import type { ResultHandleFail } from '$lib/utils/handle-action';
	import FlashMessage from '@ui/flash/flash-message.svelte';
	import { transaksi } from '$lib/stores';

	let { data }: { data: PageData } = $props();
	transaksi.setContext(data.promiseListTransaksi);
	const store = transaksi.getContext();
</script>

<h1 class="m-3 text-4xl">Transaksi</h1>

{#if $store.loading}
	<Memuat />
{/if}

{#if $store.data}
	<List values={$store.data} />
	<!-- <Pagination values={$store} /> -->
{/if}

{#if $store.error}
	<FlashMessage message={$store.message} statusTxt="error" />
{/if}

<!-- {#await data.promiseListTransaksi}
	<Memuat />
{:then res}
	<List values={res.data} />
	<Pagination values={res} />
{:catch err: ResultHandleFail}
	<FlashMessage message={err.message} status={err.status} />
{/await} -->

<!-- <div class="m-3 rounded bg-white p-3">
	<Form />
</div> -->
