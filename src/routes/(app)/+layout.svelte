<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { setAkuns, setPromiseLastTransaksi } from '$lib/utils/context';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	setAkuns(data.promiseSummaryAkun);
	setPromiseLastTransaksi(data.promiseLastTransaksi);
</script>

<div class="container mx-auto px-3 text-right">
	<span>{data.user?.username}</span>
	<a
		href="/auth/logout"
		class="inline-block rounded border border-red-600 px-1.5 text-sm text-red-600 hover:bg-red-600 hover:text-white"
		>Logout</a
	>
</div>

<header class="bg-white">
	<div class="container mx-auto flex px-3">
		<a href="/" class="font-bold">AKUNKAS-APP</a>
		<nav class="px-3">
			<a href="/akun">Akun</a>
			<a href="/transaksi">Transaksi</a>
		</nav>
	</div>
</header>

<div class="container mx-auto">
	{@render children()}
</div>
