# LSP bridge: exposes language servers over WebSocket (JSON-RPC) so the browser
# editor can get type-aware completions. Currently ships pyright (Python).
FROM node:20-bookworm-slim

# pyright provides `pyright-langserver` (type-aware Python language server).
RUN npm install -g pyright

WORKDIR /app
COPY package.json .
RUN npm install
COPY server.mjs .

EXPOSE 2200
CMD ["node", "server.mjs"]
