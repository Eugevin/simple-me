FROM oven/bun:1.1.29
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build
CMD ["bun", ".output/server/index.mjs"]