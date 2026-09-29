# Local dev image. bookworm-slim (glibc) instead of alpine so native deps (oxc-parser, sharp) use prebuilt binaries.
FROM node:22-bookworm-slim
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc* ./
RUN pnpm install
COPY . .
EXPOSE 3600
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3600"]
