<script lang="ts">
	import ListAkun from '@pages/beranda/list-akun.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#await data.promiseSummaryAkun}
	<p class="italic">Memuat..</p>
{:then res}
	<h1 class="m-3 text-4xl">Anggaran</h1>
	<ListAkun values={res.data.filter((d) => d.kode.toString().startsWith('5'))} />

	<hr class="my-6" />
	<h1 class="m-3 text-4xl">Kas</h1>
	<ListAkun values={res.data.filter((d) => d.kode.toString().startsWith('1'))} />

	<hr class="my-6" />
	<h1 class="m-3 text-4xl">Lain</h1>
	<ListAkun
		values={res.data.filter(
			(d) => !d.kode.toString().startsWith('1') && !d.kode.toString().startsWith('5')
		)}
	/>
{/await}
