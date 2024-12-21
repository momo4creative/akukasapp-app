<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import ErrorMessage from './error-message.svelte';

	interface Props extends HTMLInputAttributes {
		label: string;
		errors?: string[];
	}
	let { label, errors, value = $bindable(), ...props }: Props = $props();

	function onkeyup() {
		errors = undefined;
	}
</script>

<label class="grid gap-1">
	<span class="font-medium">{label}</span>
	<div>
		<input
			type="text"
			bind:value
			{onkeyup}
			spellcheck="false"
			{...props}
			class={cn('w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring', {
				'border-red-500 focus:ring-red-300': !!errors
			})}
		/>
	</div>
	<ErrorMessage {errors} />
</label>
