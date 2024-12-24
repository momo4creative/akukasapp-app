<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from '@iconify/svelte';
	import cn from '$lib/utils/cn';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	interface Props extends HTMLButtonAttributes {
		message?: string | null;
		statusTxt?: 'error' | 'success' | 'warning' | string | null;
		status?: 400 | 401 | 404 | number;
	}
	let { message, statusTxt = 'error', status }: Props = $props();

	$effect(() => {
		const msg = page.url.searchParams.get('msg');
		const sts = page.url.searchParams.get('statusTxt');
		if (msg) message = msg;
		if (sts) statusTxt = sts;
	});

	if (status == 401) {
		console.log('need auth');
		goto('/auth/login?msg=Silakan login terlebih dahulu !&statusTxt=warning');
	}

	function getIcon(statusTxt: Props['statusTxt']) {
		switch (statusTxt) {
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
			'bg-red-500': statusTxt == 'error',
			'bg-green-500': statusTxt == 'success',
			'bg-yellow-400 text-inherit': statusTxt == 'warning'
		})}
	>
		<Icon icon="mdi:{getIcon(statusTxt)}" width="24" height="24" />
		<p class="px-1">{message}</p>
	</div>
{/if}
