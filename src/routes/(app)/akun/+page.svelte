<script lang="ts">
	import Form from '@pages/akun/form.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="my-3 text-4xl">Akun</h1>

{#await data.akun}
	<p>Memuat..</p>
{:then res}
	<ul class="my-3 divide-y">
		{#each res.data as v}
			<li class="bg-white px-3 py-1">{v.kode} - {v.uraian}</li>
		{/each}
	</ul>
{/await}

<div class="m-3 max-w-md border bg-white p-3">
	<Form />
</div>
