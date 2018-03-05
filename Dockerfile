FROM node:8.9-alpine
MAINTAINER KU_AGILE_CSI

RUN mkdir /app
WORKDIR /app
COPY ./nodejs /app
VOLUME ["/app"]
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
