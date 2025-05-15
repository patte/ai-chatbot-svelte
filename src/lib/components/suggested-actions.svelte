<script lang="ts">
	import type { Chat } from '@ai-sdk/svelte';
	import { Button } from './ui/button';
	import { fly } from 'svelte/transition';
	import { replaceState } from '$app/navigation';
	import type { User } from '$lib/server/db/schema';

	let { user, chatClient }: { user: User | undefined; chatClient: Chat } = $props();

	const suggestedActions = [
		{
			title: 'Schreibe 3 Absätze...',
			label: 'welche alle Menschen lesen werden!',
			action: 'Schreibe 3 Absätze welche alle Menschen lesen werden.'
		},
		{
			title: 'Should I...',
			label: 'tell you a secret?',
			action: 'Should I tell you a secret?'
		}
	];
</script>

<div class="grid w-full gap-2 sm:grid-cols-2">
	{#each suggestedActions as suggestedAction, i (suggestedAction.title)}
		<div
			in:fly|global={{ opacity: 0, y: 20, delay: 50 * i, duration: 400 }}
			class={i > 1 ? 'hidden sm:block' : 'block'}
		>
			<Button
				variant="ghost"
				onclick={async () => {
					if (user) {
						replaceState(`/chat/${chatClient.id}`, {});
					}
					await chatClient.append({
						role: 'user',
						content: suggestedAction.action
					});
				}}
				class="h-auto w-full flex-1 items-start justify-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm sm:flex-col"
			>
				<span class="font-medium">{suggestedAction.title}</span>
				<span class="text-muted-foreground">
					{suggestedAction.label}
				</span>
			</Button>
		</div>
	{/each}
</div>
