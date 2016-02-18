FROM node

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install

COPY ./ /app

EXPOSE 3000

ENTRYPOINT /app/entrypoint.sh
