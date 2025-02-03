FROM node:18-alpine AS builder

WORKDIR /doodle-dungeon-danger

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY . .

FROM node:18-alpine

WORKDIR /doodle-dungeon-danger

COPY --from=builder /doodle-dungeon-danger/node_modules ./node_modules

COPY --from=builder /doodle-dungeon-danger .

EXPOSE 5000

CMD ["node", "index.js"]