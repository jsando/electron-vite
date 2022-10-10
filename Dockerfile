FROM node:18.10.0-bullseye

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Manually download the linux-x64 electron (chromium) binaries so its cached in this layer, for faster iterative builds (else it downloads each time in npm run build:linux)
# RUN mkdir -p ~/.cache/electron && \
#         cd ~/.cache/electron && \
#         curl -LOJ https://github.com/electron/electron/releases/download/v21.1.0/electron-v21.1.0-linux-x64.zip

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

RUN npm run coverage
RUN npm run build:linux