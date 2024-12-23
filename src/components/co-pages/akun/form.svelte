<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { handleSubmit } from '$lib/utils/handle-action';
	import Button from '@ui/button/button.svelte';
	import Input from '@ui/input/input.svelte';
	import Rupiah from '@ui/input/rupiah.svelte';

	interface Props {
		value?: Akun;
		loading?: boolean;
		oncancel?: () => void;
	}
	let { value, loading, oncancel }: Props = $props();

	let kodeAkun = $state(value?.kode);

	function submit() {
		return handleSubmit({
			onSubmit: () => (loading = true),
			onSuccess: async () => {
				oncancel && oncancel();
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
		<h1 class="text-2xl font-bold">{value ? 'Ubah Akun' : 'Input Akun Baru'}</h1>
	</header>

	<div class="grid gap-1.5">
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

	<footer class="flex items-center gap-1">
		<Button onclick={oncancel} icon="close-circle">Batal</Button>
		<Button {loading} icon="send" type="submit">Simpan</Button>
	</footer>
</form>
