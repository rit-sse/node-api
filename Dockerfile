FROM node:5

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install

COPY ./ /app

EXPOSE 3000

ENTRYPOINT /app/entrypoint.sh
