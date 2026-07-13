# Code-formatter microservice: bundles a real formatter per language and exposes
# a tiny HTTP API (POST /format {language, code} -> {formatted}). Used by the
# app's "포맷" button. Runs alongside Piston.
FROM node:20-bookworm-slim

# Language formatters:
#   black         -> Python
#   gofmt         -> Go (ships with golang-go)
#   rustfmt       -> Rust
#   clang-format  -> C / C++
#   default-jre   -> runs google-java-format (jar fetched below) for Java
RUN apt-get update && apt-get install -y --no-install-recommends \
        black \
        golang-go \
        rustfmt \
        clang-format \
        default-jre-headless \
        curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# prettier -> JavaScript / TypeScript
RUN npm install -g prettier@3

# google-java-format (all-deps jar)
RUN curl -fsSL -o /opt/google-java-format.jar \
    https://github.com/google/google-java-format/releases/download/v1.22.0/google-java-format-1.22.0-all-deps.jar

WORKDIR /app
COPY server.mjs .

EXPOSE 2100
CMD ["node", "server.mjs"]
