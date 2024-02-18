# ---- Base Node ----
FROM node:20-alpine AS base


RUN apk update && \
    apk upgrade && \
    apk add --no-cache dumb-init

RUN corepack enable

USER node:node
WORKDIR /home/node

FROM base AS dependencies
# copy project file
COPY --chown=node:node package*.json .npmrc* pnpm* yarn* ./
 
# install node packages, just production
# RUN yarn install --production=true --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --chown=node:node --from=dependencies /home/node/node_modules ./node_modules
COPY --chown=node:node . .
RUN pnpm run build

# ---- Production Deployment ----
FROM base AS web
COPY --chown=node:node --from=dependencies /home/node/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/dist ./dist
EXPOSE 3000
ENV NODE_ENV production
CMD ["dumb-init", "node", "dist/index.js"]

# ---- Development Dependencies ----
FROM dependencies AS dev
# install ALL node_modules, including 'devDependencies'
# Clear cache so the image is smaller
# RUN yarn install --production=false --frozen-lockfile && yarn cache clean
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --chown=node:node . .
