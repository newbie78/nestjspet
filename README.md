## Start with docker
- download all files in ./server folder
- create project.yml for docker-compose
```
version: '3'

services:
  nestjs_server:
    image: newbie39/project-nestjs
    user: "${UID}:${GID}"
    command: yarn start:dev
    volumes:
      - ./server:/home/node/app
    working_dir: /home/node/app
    networks:
      - proxy_network
```
- use nestjs_server service in any webserver
## Start with host system
- use node 14.18.2 or similar
- download all files in ./server folder
- to install type in terminal: yarn install
- to start prj type in terminal: yarn start:dev

## Example .env
- to start we need .env file
```
API_PREFIX=api
API_PORT=3000
```
- for yarn start:dev file name is development.env
- for yarn start file name is production.env

## Documentation

all docs founded on \<your-domain\>/api/docs url
