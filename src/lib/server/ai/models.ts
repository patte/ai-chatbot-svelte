// import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from 'ai';
import { customProvider } from 'ai';

import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama({
	baseURL: 'http://localhost:11434/api'
});

export const myProvider = customProvider({
	languageModels: {
		'chat-model': ollama('gemma3:12b'),
		// 'chat-model-reasoning': wrapLanguageModel({
		// 	model: groq('deepseek-r1-distill-llama-70b'),
		// 	middleware: extractReasoningMiddleware({ tagName: 'think' })
		// }),
		'title-model': ollama('gemma3:12b')
		// 'title-model': xai('grok-2-1212'),
		// 'artifact-model': xai('grok-2-1212')
	}
	// imageModels: {
	// 	'small-model': xai.image('grok-2-image')
	// }
});
