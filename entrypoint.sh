#!/bin/bash

function genConfig() {
   echo -e """ {\"dialect\": \"postgres\",\"database\":\"postgres\", \"user\": \"$PG_ENV_POSTGRES_USER\", \
    \"password\": \"$PG_ENV_POSTGRES_PASSWORD\",\"host\": \"PG\", \
    \"pool\": { \"minConnections\": 2, \"maxConnections\": 10 }, \
    \"logging\": false } \
    """ > config/database/configs/production.json ;
};

echo $@;
if [ "$#" -ne 0 ]
then
  exec $@;
  exit $?;
fi

# Check and make sure we have keys, if not make them
if [[ ! -e keys/public.key && ! -e keys/public.key ]];
then
  echo """
Hey!
  Keys were not mounted into the container, this is ok for development but when
  running in production we don't want to blow away these keys everytime.
  Consider mounting in <your/path/to/keys>:/app/keys
  """
  mkdir keys
  npm run keygen
fi;

# Production vs dev requirements
if [[ "$NODE_ENV" = "production" ]];
then
  echo """
  Running in production, just checking a few things
  """
  if [[ -e config/database/configs/production.json ]];
  then
  echo """
    Using mounted configs is depricated
  """
  else
    echo "    Generating prod config from env";
    genConfig;
  fi;
fi;

echo "NODE_ENV set to $NODE_ENV";

if [[ "$NODE_ENV" = "development" ]];
then
	echo "Starting development mode";
	echo -e "In another pane run:\n\tdocker exec -it $HOSTNAME bash";
	while true; do sleep 100000000; done;
	exit 0;
else
  echo "Starting...";
	npm run bootstrap
	npm start
fi;

