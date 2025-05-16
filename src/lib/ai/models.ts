export const DEFAULT_CHAT_MODEL: string = 'gemma3:12b';

interface ChatModel {
	id: string;
	name: string;
	description: string;
}

export const chatModels: Array<ChatModel> = [
	{
		id: 'gemma3:12b',
		name: 'gemma3:12b',
		description:
			'Gemma is a lightweight, family of models from Google built on Gemini technology. The Gemma 3 models are multimodal—processing text and images—and feature a 128K context window with support for over 140 languages'
	},
	{
		id: 'deepseek-r1:14b',
		name: 'deepseek-r1:14b',
		description:
			'DeepSeek’s first-generation reasoning models, achieving performance comparable to OpenAI-o1 across math, code, and reasoning tasks.'
	}
];
