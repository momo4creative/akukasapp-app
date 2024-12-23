<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { createTransaksiSchema } from '$lib/schema/transaksi';
	import { getAkuns, getPromiseLastTransaksi } from '$lib/utils/context';
	import { formatDateInput, formatOptionsSelect } from '$lib/utils/format';
	import { handleSubmit, type ResultHandleFail } from '$lib/utils/handle-action';
	import Button from '@ui/button/button.svelte';
	import Input from '@ui/input/input.svelte';
	import Rupiah from '@ui/input/rupiah.svelte';
	import Select from '@ui/input/select.svelte';
	import Memuat from '@ui/loading/memuat.svelte';
	import { number } from 'zod';

	interface Props {
		value?: Transaksi[];
		loading?: boolean;
	}
	let { value, loading }: Props = $props();

	// const kodeTransaksi = (function async() {
	// 	let newNumber = 1;
	// 	const d = new Date();
	// 	const dt = new Intl.DateTimeFormat('fr-CA').format(d);
	// 	const val = dt.replace('-', '').substring(0, 6);
	// 	return 'T' + Number(val) * 10000 + newNumber;
	// })();

	let error: ResultHandleFail<typeof createTransaksiSchema> | undefined = $state();

	function submit() {
		return handleSubmit<{ result: Transaksi[] }, typeof createTransaksiSchema>({
			onSubmit: () => (loading = true),
			onSuccess: async () => {
				loading = false;
				await invalidateAll();
			},
			onError: (val) => {
				error = val;
				loading = false;
			}
		});
	}

	function getKodeTransaksi(transaksi: Transaksi | undefined) {
		let newNumber = 1;
		if (transaksi) {
			newNumber = Number(transaksi.kode.substring(7)) + 1;
		}
		const d = new Date();
		const dt = new Intl.DateTimeFormat('fr-CA').format(d);
		const val = dt.replace('-', '').substring(0, 6);
		return 'T' + Number(val) * 10000 + newNumber;
	}
</script>

<form action="/transaksi?/create" method="post" use:enhance={submit} class="max-w-sm space-y-3">
	<h1 class="text-2xl font-bold">Input Transaksi Baru</h1>

	<div class="grid gap-1.5">
		{#await getPromiseLastTransaksi()}
			<Memuat />
		{:then res}
			<Input value={getKodeTransaksi(res.data[0])} name="kode" label="Kode" readonly />
		{/await}

		<Input
			value={formatDateInput(new Date())}
			errors={error?.errors?.tanggal}
			name="tanggal"
			label="Tanggal"
			type="date"
		/>

		{#await getAkuns()}
			<Memuat />
		{:then res}
			<Select
				errors={error?.errors?.kredit_id}
				name="kredit_id"
				label="Sumber Dana"
				options={formatOptionsSelect(res.data)}
			/>
			<Select
				errors={error?.errors?.debit_id}
				name="debit_id"
				label="Akun"
				options={formatOptionsSelect(res.data)}
			/>
		{/await}

		<Input errors={error?.errors?.uraian} name="uraian" label="Uraian" />
		<Rupiah errors={error?.errors?.nilai} name="nilai" label="Nilai" />
	</div>

	<footer class="">
		<Button {loading} icon="send" type="submit">Simpan</Button>
	</footer>
</form>
