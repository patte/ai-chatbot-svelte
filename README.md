# SvelteKit AI Chatbot

An opinionated fork of [vercel/ai-chatbot-svelte](https://github.com/vercel/ai-chatbot-svelte).

Changes
- local ollama models via [sgomez/ollama-ai-provider](https://github.com/sgomez/ollama-ai-provider)
- `docker-compose.yml` to run postgres
- Beauty changes 💅

## Running locally

- `cp .env.example .env` to create a local environment file
- `docker-compose up` to start postgres
- `pnpm db:generate` to create the database
- `pnpm dev` to start the app

Separately:
- `ollama serve`


