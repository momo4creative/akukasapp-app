<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { handleSubmit } from '$lib/utils/handle-action';
	import Button from '@ui/button/button.svelte';
	import Input from '@ui/input/input.svelte';
	import Rupiah from '@ui/input/rupiah.svelte';

	interface Props {
		value?: Akun;
		loading?: boolean;
	}
	let { value, loading }: Props = $props();

	let kodeAkun = $state(value?.kode);

	function submit() {
		return handleSubmit({
			onSubmit: () => (loading = true),
			onSuccess: async () => {
				loading = false;
				await invalidateAll();
			},
			onError: () => {
				loading = false;
			}
		});
	}
</script>

<form
	action="/akun?/{value ? 'update' : 'create'}"
	method="post"
	use:enhance={submit}
	class="space-y-6"
>
	<header>
		<h1 class="text-2xl">Input Akun Baru</h1>
	</header>

	<div class="grid gap-3">
		{#if value?.id}
			<input type="hidden" name="id" value={value.id} />
		{/if}
		<Input
			bind:value={kodeAkun}
			name="kode"
			label="Kode Akun"
			type="number"
			min="1000"
			max="9999"
		/>
		<Input value={value?.uraian} name="uraian" label="Uraian" />
		{#if kodeAkun?.toString().startsWith('5')}
			<Rupiah value={value?.batas} name="batas" label="Batas Anggaran" />
		{/if}
	</div>

	<footer class="">
		<Button {loading} icon="send" type="submit">Simpan</Button>
	</footer>
</form>
