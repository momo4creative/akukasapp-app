<script lang="ts" generics="Values extends SummaryAkun">
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';

	interface Props {
		values: Values[];
	}
	let { values }: Props = $props();
</script>

{#snippet akun(v: Values)}
	<div class="flex justify-between px-3 py-1.5">
		<h1 class="font-medium">
			<span>{v.kode}</span>
			<span>-</span>
			<span>{v.uraian}</span>
		</h1>
		<div>
			<span>{formatNumberToRupiah(v.nilai)}</span>
			{#if v.batas}
				<span>/</span>
				<span>{formatNumberToRupiah(v.batas)}</span>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet transaksi(t: Values['transaksi'][0])}
	<div class="flex gap-3 px-3 py-1.5">
		<span>{formatDateIndo(t.tanggal)}</span>
		<span>{t.uraian}</span>
		<span class="ms-auto">{formatNumberToRupiah(t.nilai)}</span>
	</div>
{/snippet}

<ul class="divide-y">
	{#each values as v}
		<li class="bg-white">
			{@render akun(v)}
			{#if v.transaksi.length != 0}
				<div class="mb-3 divide-y divide-white bg-gray-200">
					{#each v.transaksi as t}
						{@render transaksi(t)}
					{/each}
				</div>
			{/if}
		</li>
	{/each}
</ul>
