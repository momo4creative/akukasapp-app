<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { setAkuns, setPromiseLastTransaksi } from '$lib/utils/context';
	import { assets } from '$app/paths';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	setAkuns(data.promiseSummaryAkun);
	setPromiseLastTransaksi(data.promiseLastTransaksi);
</script>

<div class="container mx-auto my-1 px-3 text-center">
	<span>{data.user?.username}</span>
	<a
		href="/auth/logout"
		class="inline-block rounded border border-red-300 px-1.5 text-sm text-red-600 hover:bg-red-600 hover:text-white"
		>Logout</a
	>
</div>

<header class="bg-white">
	<div class="container mx-auto flex items-center px-3">
		<img src="{assets}/icons/cash.png" alt="logo" class="me-2 h-6" />
		<a href="/" class="py-1.5 font-bold">AKUNKAS-APP</a>
		<nav class="px-3">
			<a href="/akun">Akun</a>
			<a href="/transaksi">Transaksi</a>
		</nav>
	</div>
</header>

<div class="container mx-auto">
	{@render children()}
</div>
