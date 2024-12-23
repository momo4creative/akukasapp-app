<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import ErrorMessage from './error-message.svelte';
	import Input from './input.svelte';
	import { fly } from 'svelte/transition';
	import type { Action } from 'svelte/action';
	import { onDestroy } from 'svelte';
	// import { clickOutside } from '$lib/utils/click-outside';

	interface Props extends HTMLInputAttributes {
		label: string;
		errors?: string[];
		options: [string, string][];
	}
	let { label, errors, value = $bindable(), options = [], ...props }: Props = $props();

	let cari: string = $state('');
	let open = $state(false);
	let tempValue = $state(options.filter(([_, v]) => v == value)?.[0]?.[0]);

	const filterOptions = $derived.by(() => {
		const temp = cari.split(' ');
		let res = options;
		temp.forEach((t) => {
			res = res.filter(([v]) => v.toLowerCase().includes(t.toLowerCase()));
		});
		return res;
	});

	function handlePilih([label, val]: Props['options'][0]) {
		tempValue = label;
		value = val;
		open = false;
	}

	const clickOutside: Action = (node) => {
		function handleClick(e: any) {
			if (node && !node.contains(e.target) && !e.defaultPrevented) {
				open = false;
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

{#snippet dropdown()}
	<ul
		use:clickOutside
		transition:fly={{ y: -20, opacity: 0 }}
		class="absolute z-10 w-full max-w-md divide-y overflow-y-auto rounded-md border bg-white shadow-md"
	>
		<li class="p-1.5">
			<Input bind:value={cari} type="search" name={'search_' + props.name} placeholder="Cari" />
		</li>
		{#each filterOptions as [label, val]}
			<li class="">
				<button
					type="button"
					onclick={() => handlePilih([label, val])}
					class="block w-full px-3 py-1.5 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					>{label}</button
				>
			</li>
		{/each}
	</ul>
{/snippet}

<label class="grid gap-1">
	<span class="font-medium">{label}</span>
	<div class="relative">
		<input
			type="text"
			{...props}
			value={tempValue ?? 'Pilih !'}
			onclick={(e) => (e.preventDefault(), (open = !open), (errors = undefined))}
			readonly
			spellcheck="false"
			class={cn('w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring', {
				'border-red-500 focus:ring-red-300': !!errors
			})}
		/>
		{#if open}
			<div class="fixed inset-0 z-10 flex justify-center bg-black/20 px-6 py-12">
				{@render dropdown()}
			</div>
		{/if}
	</div>
	<ErrorMessage {errors} />
</label>

<input type="text" name={props.name} {value} hidden />
