#!/bin/bash

set -e

. .env

docker-compose -p ${COMPOSE_PROJECT_NAME} build

docker run --rm -i -v ${PWD}/../../backend/src:/mnt ${COMPOSE_PROJECT_NAME}_backend bash <<EOF
set -ex
EOF

docker-compose run backend yarn install
docker-compose run frontend yarn install

docker-compose -p ${COMPOSE_PROJECT_NAME} up -d
