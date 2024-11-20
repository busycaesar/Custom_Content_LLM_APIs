FROM node:lts AS dependencies

WORKDIR /application

COPY ../package*.json ./

RUN npm install --only=production

FROM node:lts AS development

WORKDIR /application

COPY --from=dependencies /application /application

COPY ../src ./src

FROM node:lts

WORKDIR /server

COPY --from=development /application /server

CMD ["node", "src/server.js"]

EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
 CMD curl --fail localhost:${PORT} || exit 1