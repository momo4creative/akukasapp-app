<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import ErrorMessage from './error-message.svelte';
	import { formatNumberToRupiah } from '$lib/utils/format';

	interface Props extends HTMLInputAttributes {
		label: string;
		errors?: string[];
	}
	let { label, errors, value = $bindable(), ...props }: Props = $props();

	let tempValue: string = $state(value ? formatNumberToRupiah(value) : '');

	function onkeyup(str: string) {
		errors = undefined;
		value = str.replace('Rp', '').replace(/\./g, '');
		value = Number(value);
		tempValue = formatNumberToRupiah(value);
	}
</script>

<label class="grid gap-1">
	<span class="font-medium">{label}</span>
	<div>
		<input
			type="text"
			{...props}
			value={tempValue}
			onkeyup={(e) => onkeyup(e.currentTarget.value)}
			spellcheck="false"
			placeholder="Rp 0"
			class={cn('w-full rounded border border-gray-300 px-3 py-1 focus:outline-none focus:ring', {
				'border-red-500 focus:ring-red-300': !!errors
			})}
		/>
	</div>
	<ErrorMessage {errors} />
</label>

<input type="number" name={props.name} {value} hidden />
