## Start with docker
- download all files in ./server folder
- create project.yml for docker-compose
```
version: '3'

networks:
  proxy_network:
    external: true
  mongo_network:
    external: true

services:
  nestjs_server:
    image: newbie39/project-nestjs
    user: "${UID}:${GID}"
    command: yarn start:dev
    # command: pm2-runtime pm2.json
    volumes:
      - ./server:/home/node/app
    working_dir: /home/node/app
    networks:
      - proxy_network
      - mongo_network
      - default
  nestjs_redis:
    image: redis:6.0.16-alpine
    ports:
      - 6379:6379
    networks:
      - default
```
- use nestjs_server service in any webserver
## Start with host system
- use node 14.18.2
- use redis 6.0.16
- use mongo 4.2-bionic
- download all files in ./server folder
- to install type in terminal: yarn install
- to start prj type in terminal: yarn start:dev

## Example .env
- to start we need .env file
```
API_PREFIX=api
API_PORT=3000

MONGO_URI=mongodb://root:changeme@mongo:27017/nestjs?authSource=admin

SESSION_SECRET=sup3rs3cr3t

REDIS_PORT=6379
REDIS_HOST=nestjs_redis
```
- for yarn start:dev file name is development.env
- for yarn start file name is production.env

## Documentation

all docs founded on \<your-domain\>/api/docs url
