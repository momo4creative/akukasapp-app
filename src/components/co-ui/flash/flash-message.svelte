<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from '@iconify/svelte';
	import cn from '$lib/utils/cn';
	import { fade } from 'svelte/transition';

	interface Props extends HTMLButtonAttributes {
		message?: string;
		status?: 'error' | 'success' | 'warning';
	}
	let { message, status = 'error' }: Props = $props();

	function getIcon(status: Props['status']) {
		switch (status) {
			case 'error':
				return 'alert-circle-outline';
			case 'success':
				return 'check-circle-outline';
			case 'warning':
				return 'information-slab-circle-outline';
			default:
				return '';
		}
	}
</script>

{#if message}
	<div
		transition:fade
		class={cn('flex gap-1.5 rounded p-1 text-white', {
			'bg-red-500': status == 'error',
			'bg-green-500': status == 'success',
			'bg-yellow-400 text-inherit': status == 'warning'
		})}
	>
		<Icon icon="mdi:{getIcon(status)}" width="24" height="24" />
		<p class="px-1">{message}</p>
	</div>
{/if}
