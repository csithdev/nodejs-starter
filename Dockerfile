FROM node:8.9-alpine
MAINTAINER KU_AGILE_CSI

RUN mkdir /app
WORKDIR /app
COPY ./ku_backend/package*.json /app/
RUN npm install

COPY ./ku_backend /app
VOLUME ["/app"]

EXPOSE 3000
CMD ["npm", "start"]
