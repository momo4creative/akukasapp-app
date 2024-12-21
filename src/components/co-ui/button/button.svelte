<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	import cn from '$lib/utils/cn';

	interface Props extends HTMLButtonAttributes {
		icon?: string;
		loading?: boolean;
	}
	let { children, icon, loading, ...props }: Props = $props();

	const styles =
		'inline-flex items-center justify-center rounded bg-slate-500 py-1 px-1.5 text-white hover:bg-slate-600 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:opacity-60';
</script>

<button
	type="button"
	{...props}
	class={cn(styles, {
		'pointer-events-none opacity-80': loading
	})}
>
	{#if icon && !loading}
		<span transition:fly={{ x: 10 }}>
			<Icon icon="mdi:{icon}" />
		</span>
	{/if}
	{#if loading}
		<span transition:fly={{ x: 10 }}>
			<Icon icon="mdi:loading" class="h-6 w-6 animate-spin" />
		</span>
	{/if}
	{#if children}
		<span class="px-2 font-medium uppercase tracking-wide">{@render children()}</span>
	{/if}
</button>
