<script lang="ts">
	import Form from '@pages/akun/form.svelte';
	import type { PageData } from './$types';
	import Memuat from '@ui/loading/memuat.svelte';
	import Action from '@pages/layout/action.svelte';
	import { actionStore } from '$lib/stores/action-store';
	import Button from '@ui/button/button.svelte';
	import Modal from '@ui/modal/modal.svelte';
	import FormDelete from '@pages/layout/form-delete.svelte';

	let { data }: { data: PageData } = $props();
</script>

<header class="m-3 flex items-end">
	<h1 class="me-auto text-4xl">Akun</h1>
	<Button onclick={() => actionStore.create()} icon="plus">Akun Baru</Button>
</header>

{#await data.promiseSummaryAkun}
	<Memuat />
{:then res}
	<ul class="my-3 divide-y">
		{#each res.data as v}
			<li class="flex bg-white px-3 py-1">
				<h1 class="me-auto">{v.kode} - {v.uraian}</h1>
				<Action onedit={() => actionStore.update(v)} ondelete={() => actionStore.delete(v.id)} />
			</li>
		{/each}
	</ul>
{/await}

<Modal open={$actionStore.isCreate} close={actionStore.close}>
	<div class="max-w-md rounded-md border bg-white p-3">
		<Form oncancel={actionStore.close} />
	</div>
</Modal>

<Modal open={$actionStore.isUpdate} close={actionStore.close}>
	<div class="max-w-md rounded-md border bg-white p-3">
		<Form value={$actionStore.data as Akun} oncancel={actionStore.close} />
	</div>
</Modal>

<Modal open={$actionStore.isDelete} close={actionStore.close}>
	<div class="max-w-md rounded-md border bg-white p-3">
		<FormDelete action="/akun?/delete" id={$actionStore.id} oncancel={actionStore.close} />
	</div>
</Modal>
