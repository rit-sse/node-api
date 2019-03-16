FROM node:carbon

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --loglevel warn

COPY ./ /app

# TODO add this key to secrets
RUN rm -rf keys
RUN mkdir keys
ADD ./keys/google.json keys/
RUN npm run keygen

EXPOSE 3000

ENV NODE_ENV=production
CMD /app/entrypoint.sh
