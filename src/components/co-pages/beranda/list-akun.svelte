<script lang="ts" generics="Values extends SummaryAkun">
	import cn from '$lib/utils/cn';
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		values: Values[];
	}
	let { values }: Props = $props();

	const totalNilai = $derived(values.reduce((sum, val) => sum + val.nilai, 0));
	const totalBatas = $derived(values.reduce((sum, val) => sum + (val?.batas ?? 0), 0));

	let open: string | null = $state(null);
</script>

{#snippet akun(v: Values)}
	<div class="relative flex items-center px-3 py-1.5 hover:bg-blue-100">
		<span class={cn('-ms-2', { 'opacity-50': v.transaksi.length == 0 })}
			><Icon icon="mdi:chevron-right" rotate={open ? 45 : 0} width="18" /></span
		>
		<h1 class="font-medium">
			<span>{v.kode}</span>
			<span>-</span>
			<span>{v.uraian}</span>
		</h1>
		<div class="ms-auto">
			<span>{formatNumberToRupiah(v.nilai)}</span>
			{#if v.batas}
				<span>/</span>
				<span>{formatNumberToRupiah(v.batas)}</span>
			{/if}
		</div>
		<button
			onclick={() => (open = open ? null : v.id)}
			type="button"
			aria-label="-"
			class={cn('absolute inset-0 bg-transparent', {
				'pointer-events-none': v.transaksi.length == 0
			})}
		></button>
	</div>
{/snippet}

{#snippet transaksi(t: Values['transaksi'][0])}
	<div class="flex gap-3 px-3 py-1.5 text-sm">
		<span>{formatDateIndo(t.tanggal)}</span>
		<span>{t.uraian}</span>
		<span class="ms-auto">{formatNumberToRupiah(t.nilai)}</span>
	</div>
{/snippet}

<ul class="divide-y">
	{#each values as v}
		<li class="bg-white">
			{@render akun(v)}
			{#if v.transaksi.length != 0 && open == v.id}
				<div transition:fly={{ y: -10, opacity: 0 }} class="mb-3 divide-y divide-white bg-gray-200">
					{#each v.transaksi as t}
						{@render transaksi(t)}
					{/each}
				</div>
			{/if}
		</li>
	{/each}
</ul>
<div class="my-1 px-3 text-right text-sm font-bold text-gray-400">
	<span>{formatNumberToRupiah(totalNilai)}</span>
	<span>/</span>
	<span>{formatNumberToRupiah(totalBatas)}</span>
</div>
