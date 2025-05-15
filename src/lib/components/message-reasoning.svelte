<script lang="ts">
	import LoaderIcon from './icons/loader.svelte';
	import ChevronDownIcon from './icons/chevron-down.svelte';
	import { Markdown } from './markdown';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { getLock } from '$lib/hooks/lock';
	import { tick } from 'svelte';
	let { loading, reasoning }: { loading: boolean; reasoning: string } = $props();
	let expanded = $state(false);
	const scrollLock = getLock('messages-scroll');

	function lockScrolling() {
		scrollLock.locked = true;
	}

	function unlockScrolling() {
		tick().then(() => {
			scrollLock.locked = false;
		});
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row items-center gap-2">
		<div class="font-medium">
			{#if loading}
				Reasoning...
			{:else}
				Reasoned for some time
			{/if}
		</div>
		<button
			class="cursor-pointer"
			onclick={() => {
				expanded = !expanded;
			}}
			aria-label="Expand reasoning"
			aria-expanded={expanded}
			aria-controls="reasoning"
		>
			{#if loading}
				<LoaderIcon />
			{:else}
				<ChevronDownIcon />
			{/if}
		</button>
	</div>

	{#if expanded}
		<div
			transition:slide={{ duration: 200, easing: cubicInOut }}
			onintrostart={lockScrolling}
			onintroend={unlockScrolling}
			onoutrostart={lockScrolling}
			onoutroend={unlockScrolling}
			class="mb-2 mt-4 flex flex-col gap-4 border-l pl-4 text-zinc-600 dark:text-zinc-400"
		>
			<Markdown md={reasoning} />
		</div>
	{/if}
</div>
