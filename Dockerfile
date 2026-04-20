# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .

ARG PUBLIC_STORE_DOMAIN
ARG PUBLIC_STOREFRONT_API_TOKEN
ARG PUBLIC_STOREFRONT_ID
ARG PUBLIC_CHECKOUT_DOMAIN

ENV PUBLIC_STORE_DOMAIN=$PUBLIC_STORE_DOMAIN
ENV PUBLIC_STOREFRONT_API_TOKEN=$PUBLIC_STOREFRONT_API_TOKEN
ENV PUBLIC_STOREFRONT_ID=$PUBLIC_STOREFRONT_ID
ENV PUBLIC_CHECKOUT_DOMAIN=$PUBLIC_CHECKOUT_DOMAIN

RUN bun run build

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM oven/bun:1-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist   ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.ts    ./server.ts

EXPOSE 3000

CMD ["bun", "run", "dist/server/index.ts"]
