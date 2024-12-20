<script lang="ts">
	import Input from '@ui/input/input.svelte';
	import type { PageData } from './$types';
	import Form from '@pages/auth/form.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Form>
	{#snippet snippetField(error)}
		<Input errors={error?.errors?.username} name="username" label="Username" />
		<Input errors={error?.errors?.password} name="password" label="Password" type="password" />
	{/snippet}
</Form>
