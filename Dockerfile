FROM oven/bun:1.1.29
WORKDIR /app

COPY . .

RUN bun install
CMD bun run build ; bun .output/server/index.mjs