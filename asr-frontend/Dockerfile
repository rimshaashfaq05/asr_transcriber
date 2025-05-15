# asr-frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Install dependencies with fallback option
COPY package.json package-lock.json ./
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
