<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div>
	<span>{data.user?.username}</span>
	<a href="/auth/logout">Logout</a>
</div>

{@render children()}
