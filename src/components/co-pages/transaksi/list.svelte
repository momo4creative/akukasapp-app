<script lang="ts" generics="Values extends SummaryTransaksi">
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';

	interface Props {
		values: Values[];
	}
	let { values }: Props = $props();
</script>

<ul class="divide-y">
	{#each values as v}
		<li class="grid grid-cols-3 bg-white px-3 py-1.5">
			<span>{formatDateIndo(v.tanggal)}</span>
			<div>
				<span>{v.uraian}</span>
				<small>{v.akun.uraian}</small>
			</div>
			<span class="text-right">{formatNumberToRupiah(v.nilai)}</span>
		</li>
	{/each}
</ul>
