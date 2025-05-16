import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from 'ai';
import { env } from '$env/dynamic/private';

import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama({
	baseURL: `http://${env.OLLAMA_HOST || 'localhost:11434'}/api`
});

export const myProvider = customProvider({
	languageModels: {
		'gemma3:12b': ollama('gemma3:12b'),
		'deepseek-r1:14b': wrapLanguageModel({
			model: ollama('deepseek-r1:14b'),
			middleware: extractReasoningMiddleware({ tagName: 'think' })
		}),
		'title-model': ollama('gemma3:12b')
	}
	// imageModels: {
	// 	'small-model': xai.image('grok-2-image')
	// }
});
