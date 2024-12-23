<script lang="ts" generics="Values extends DbReadResult<Record<string,any>>">
	interface Props {
		values: Values;
	}
	let { values }: Props = $props();
</script>

<div class="my-2 text-center text-sm">
	<span>{values.page}</span>
	<span>-</span>
	<span>{values.limit > values.count ? values.count : values.limit}</span>
	<span>of</span>
	<span>{values.count}</span>
</div>
