<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="container mx-auto px-3 text-right">
	<span>{data.user?.username}</span>
	<a href="/auth/logout">Logout</a>
</div>

<header class="bg-white px-3">
	<div class="container mx-auto flex">
		<a href="/" class="font-bold">AKUNKAS-APP</a>
		<nav class="px-3">
			<a href="/akun">Akun</a>
		</nav>
	</div>
</header>

<div class="container mx-auto">
	{@render children()}
</div>
