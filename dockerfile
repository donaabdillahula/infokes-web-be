FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Production image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# Jika butuh env file di production, copy juga:
COPY --from=builder /app/.env ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/app.js"]