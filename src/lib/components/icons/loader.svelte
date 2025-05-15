<script lang="ts">
	import { cn } from '$lib/utils/shadcn';
	import { LoaderPinwheel } from 'lucide-svelte';
	let {
		class: className
	}: {
		class?: string;
	} = $props();
</script>

<div class="animate-spin-slow">
	<LoaderPinwheel class={cn('h-4 w-4', className)} />
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.animate-spin-slow {
		animation: spin 1.2s linear infinite;
	}
</style>
