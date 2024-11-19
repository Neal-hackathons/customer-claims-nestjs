# syntax=docker/dockerfile:1

# ARG NODE_VERSION=23.2.0
ARG NODE_VERSION=23.1.0

FROM node:${NODE_VERSION}-alpine as base


WORKDIR /usr/src/app


FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci


COPY . .
COPY prisma ./prisma/
RUN npx prisma generate
RUN npm run build


FROM base as final


ENV NODE_ENV production
ENV DATABASE_URL postgresql://postgres:postgres@db:5432/postgres


COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist


EXPOSE 8080

CMD npx prisma migrate deploy && node dist/main.js