<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade, scale } from 'svelte/transition';

	interface Props extends HTMLBaseAttributes {
		open?: boolean;
		close?: () => void;
	}
	let { open = $bindable(), close, children }: Props = $props();

	function handleClose() {
		close && close();
		open = false;
	}

	const clickOutside: Action = (node) => {
		function handleClick(e: any) {
			if (node && !node.contains(e.target)) {
				console.log('close');
				handleClose();
			}
		}
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};
</script>

{#if open}
	<section transition:fade class="fixed inset-0 z-40 flex bg-black/30 px-6 py-12">
		<div use:clickOutside in:scale out:fade class="mx-auto">
			{@render children?.()}
		</div>
	</section>
{/if}
