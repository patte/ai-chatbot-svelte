# base image
FROM node:24-slim AS base
RUN npm install -g pnpm

# install dependencies
FROM base AS install
WORKDIR /temp/dev
COPY package.json pnpm-lock.yaml /temp/dev/
RUN pnpm install --frozen-lockfile

# build
FROM base AS build
WORKDIR /temp/dev
COPY --from=install /temp/dev/node_modules /temp/dev/node_modules
COPY . /temp/dev
# generate .svelte-kit/tsconfig.json
RUN pnpm svelte-kit sync
# build
RUN pnpm run build

# copy dependencies into dev image
FROM base AS prod
RUN useradd -ms /bin/sh -u 1001 app
USER app
WORKDIR /app

ENV NODE_ENV=production
ENV MIGRATE_ON_START=true

COPY --from=install --chown=app:app /temp/dev/node_modules /app/node_modules
COPY --from=build --chown=app:app /temp/dev/build /app/
COPY --from=build --chown=app:app /temp/dev/src/lib/server/db/migrations /app/migrations
COPY --from=build --chown=app:app /temp/dev/src/lib/server/db/migrate.ts /app/migrate.ts

CMD ["node", "index.js"]

