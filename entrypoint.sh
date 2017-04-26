#!/bin/bash

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	  local var="$1"
	  local fileVar="${var}_FILE"
	  local def="${2:-}"
	  if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		    echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		    exit 1
	  fi
	  local val="$def"
	  if [ "${!var:-}" ]; then
		    val="${!var}"
	  elif [ "${!fileVar:-}" ]; then
		    val="$(< "${!fileVar}")"
	  fi
	  export "$var"="$val"
	  unset "$fileVar"
}

# File envs
file_env 'GOOGLE_CLIENT_ID'
file_env 'GOOGLE_CLIENT_SECRET'
file_env 'SLACK_SECRET'
file_env 'PG_ENV_POSTGRES_PASSWORD'

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

