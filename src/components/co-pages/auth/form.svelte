<script lang="ts">
	import { enhance } from '$app/forms';
	import type { registerSchema } from '$lib/schema/auth';
	import { handleSubmit, type ResultHandleFail } from '$lib/utils/handle-action';
	import Input from '@ui/input/input.svelte';
	import Button from '@ui/button/button.svelte';
	import FlashMessage from '@ui/flash/flash-message.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	let error: ResultHandleFail<typeof registerSchema> | undefined = $state();

	interface Props extends HTMLBaseAttributes {
		register?: boolean;
		snippetField: Snippet<[error?: typeof error]>;
	}
	let { register, snippetField }: Props = $props();

	let loading = $state(false);

	function submit() {
		return handleSubmit<User, typeof registerSchema>({
			onSubmit: () => (loading = true),
			onError: (value) => {
				error = value;
				loading = false;
			},
			redirectTo: register ? '/auth/login' : '/'
		});
	}
</script>

<div
	in:fly={{ y: 20, delay: 500, duration: 500, opacity: 0 }}
	out:fly={{ y: 20, duration: 500, opacity: 0 }}
	class="absolute w-full max-w-sm px-6 py-12"
>
	<form
		action="/auth?/{register ? 'register' : 'login'}"
		method="post"
		use:enhance={submit}
		class="grid gap-6 rounded-md border bg-white p-3 shadow-md"
	>
		<h1 class="text-4xl">{register ? 'Register' : 'Login'}</h1>

		<FlashMessage message={error?.message} status="error" />

		<div class="grid gap-3">
			{@render snippetField(error)}
		</div>

		<Button {loading} icon="send" type="submit">{register ? 'Register' : 'Login'}</Button>
	</form>

	<div class="my-3 text-center">
		or
		<a
			href="/auth/{register ? 'login' : 'register'}"
			class="text-gray-400 underline hover:text-inherit hover:no-underline"
		>
			{register ? 'Login' : 'Register'}
		</a>
		?
	</div>
</div>
