FROM node:slim AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:slim
WORKDIR /app
COPY --from=build /app/dist/* ./
ENTRYPOINT node index.js
CMD node index.js
