FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev || npm ci --omit=dev
COPY server.js ./
USER nodejs
EXPOSE 3000
CMD [ "npm", "start" ]