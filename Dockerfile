FROM node:5

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --loglevel warn

COPY ./ /app

# TODO add this key to secrets
RUN mkdir keys
RUN npm run keygen

EXPOSE 3000

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:3000/api/v2/status || exit 1

ENV NODE_ENV=production
CMD /app/entrypoint.sh
