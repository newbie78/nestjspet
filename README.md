## Start with docker
- clone project
- start from project folder ./infra && docker-compose -f project.yml -p nestjs_s up -d
- use nestjs_server service for api and mexpress for mongoui in any webserver
## Start with host system
- use node 16.13.x
- use redis 6.2.x
- use mongo 5.0-focal
- clone project
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
