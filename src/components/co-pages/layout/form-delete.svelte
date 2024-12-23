<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { handleSubmit } from '$lib/utils/handle-action';
	import Button from '@ui/button/button.svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface Props extends HTMLFormAttributes {
		id?: string;
		loading?: boolean;
		oncancel?: () => void;
	}
	let { id, loading, oncancel, ...props }: Props = $props();

	function submit() {
		return handleSubmit({
			onSubmit: () => (loading = true),
			onSuccess: async () => {
				oncancel && oncancel();
				loading = false;
				await invalidateAll();
			},
			onError: () => {
				loading = false;
			}
		});
	}
</script>

<form method="post" {...props} use:enhance={submit} class="">
	<input type="hidden" name="id" value={id} />
	<h1 class="my-6 text-center text-3xl font-bold">Apakah yakin menghapus ?</h1>
	<footer class="my-3 flex items-center justify-center gap-3">
		<Button {loading} type="submit">Ya, yakin</Button>
		<Button onclick={oncancel}>Tidak</Button>
	</footer>
</form>
