FROM node:8

ARG ENV=prod
ARG HOST=0.0.0.0

ENV PORT 80

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE $PORT

RUN npm ci --only=production
RUN npm run build-$ENV

CMD npm run start-${ENV}
