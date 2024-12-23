<script lang="ts" generics="Values extends SummaryTransaksi">
	import { formatDateIndo, formatNumberToRupiah } from '$lib/utils/format';

	interface Props {
		values: Values[];
	}
	let { values }: Props = $props();
</script>

<ul class="divide-y">
	{#each values as v}
		<li class="bg-white px-3 py-1.5">
			<small>{v.akun.uraian}</small>
			<div class="grid grid-cols-3">
				<span>{formatDateIndo(v.tanggal)}</span>
				<h2 class="font-medium">{v.uraian}</h2>
				<span class="text-right">{formatNumberToRupiah(v.nilai)}</span>
			</div>
		</li>
	{/each}
</ul>
