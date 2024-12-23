<script lang="ts">
	import Button from '@ui/button/button.svelte';

	interface Props {
		onedit: () => void;
		ondelete: () => void;
	}
	let { onedit, ondelete }: Props = $props();
</script>

<div class="flex gap-1">
	<Button onclick={onedit} icon="pencil"></Button>
	<Button onclick={ondelete} icon="trash"></Button>
</div>
