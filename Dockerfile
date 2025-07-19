FROM oven/bun:1.1.29
WORKDIR /app

COPY . .

RUN bun install && \
    bun run build
CMD bun .output/server/index.mjs