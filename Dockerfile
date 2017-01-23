FROM node:5

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --loglevel warn

COPY ./ /app

EXPOSE 3000

ENV NODE_ENV=production
CMD /app/entrypoint.sh
