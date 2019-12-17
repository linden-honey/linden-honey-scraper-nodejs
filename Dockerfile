FROM node:12-alpine

LABEL name="linden-honey-scraper" \
      maintainer="aliaksandr.babai@gmail.com"

ARG WORK_DIR=/linden-honey
WORKDIR $WORK_DIR

ENV PORT=80

COPY package.json package-lock.json $WORK_DIR
RUN npm run i

COPY src ./src

EXPOSE $PORT
CMD [ "npm", "start" ]
