FROM node:10

ARG HOST=0.0.0.0

ENV PORT 3000

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE $PORT

RUN npm ci --only=production
RUN npm run build-prod

CMD npm run start-prod
