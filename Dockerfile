############################################################################################
####  UI BUILD
############################################################################################

FROM node:21-slim AS ui
WORKDIR /app

ENV CI=true
RUN npm install -g pnpm

COPY ./ui ./
RUN rm -rf node_modules pnpm-lock.yaml && pnpm install

ENV VITE_API_BASE /api
RUN pnpm run build

############################################################################################
####  RUST SERVER BUILD (Debian-based for better compatibility)
############################################################################################

FROM rust:1.75-slim-bookworm AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

# Copy and build
COPY ./pentaract ./
RUN cargo build --release

############################################################################################
####  RUNTIME
############################################################################################

FROM debian:bookworm-slim AS runtime

# Install runtime dependencies
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/storagewave /usr/local/bin/
COPY --from=ui /app/dist /ui

ENTRYPOINT ["storagewave"]
