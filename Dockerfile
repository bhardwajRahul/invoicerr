FROM node:22-bullseye AS backend-builder

WORKDIR /app

COPY backend/ .

RUN rm -rf node_modules package-lock.json

RUN npm install

RUN npx prisma generate
RUN npm run build

FROM node:22-bullseye AS frontend-builder

WORKDIR /app

COPY frontend/ .

RUN rm -rf node_modules package-lock.json

RUN npm install

RUN npm run build

FROM nginx:bookworm

ENV NODE_VERSION=22.13.1

RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    xz-utils \
    --no-install-recommends

RUN curl -fsSLO https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz \
    && tar -xf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local --strip-components=1 \
    && rm node-v$NODE_VERSION-linux-x64.tar.xz

RUN apt-get install -y \
    chromium \
    libnss3 \
    libfreetype6 \
    libharfbuzz0b \
    fonts-freefont-ttf \
    chromium-driver \
    bash \
    netcat-traditional \
    dumb-init

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PLUGIN_DIR=/usr/share/nginx/plugins

COPY --from=frontend-builder /app/dist /usr/share/nginx/html

COPY --from=backend-builder /app/dist /usr/share/nginx/backend
COPY --from=backend-builder /app/node_modules /usr/share/nginx/backend/node_modules
COPY --from=backend-builder /app/package*.json /usr/share/nginx/backend/

COPY --from=backend-builder /app/node_modules/.prisma /usr/share/nginx/.prisma
COPY --from=backend-builder /app/prisma /usr/share/nginx/prisma
COPY --from=backend-builder /app/package.json /usr/share/nginx/

COPY entrypoint.sh /usr/share/nginx/entrypoint.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


CMD ["/bin/sh", "-c", "chmod +x /usr/share/nginx/entrypoint.sh && /usr/share/nginx/entrypoint.sh"]
