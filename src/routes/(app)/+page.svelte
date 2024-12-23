<script lang="ts">
	import ListAkun from '@pages/beranda/list-akun.svelte';
	import type { PageData } from './$types';
	import Memuat from '@ui/loading/memuat.svelte';
	import FlashMessage from '@ui/flash/flash-message.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#await data.promiseSummaryAkun}
	<Memuat />
{:then res}
	<h1 class="m-3 text-3xl font-bold text-gray-400">Anggaran</h1>
	<ListAkun values={res.data.filter((d) => d.kode.toString().startsWith('5'))} />

	<hr class="my-3" />
	<h1 class="m-3 text-3xl font-bold text-gray-400">Kas</h1>
	<ListAkun values={res.data.filter((d) => d.kode.toString().startsWith('1'))} />

	<hr class="my-3" />
	<h1 class="m-3 text-3xl font-bold text-gray-400">Lain</h1>
	<ListAkun
		values={res.data.filter(
			(d) => !d.kode.toString().startsWith('1') && !d.kode.toString().startsWith('5')
		)}
	/>
{:catch err}
	<FlashMessage message={err.message} status={err.status} />
{/await}
