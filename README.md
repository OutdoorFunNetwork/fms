# FMS

## Requirements

- [Docker](https://www.docker.com/)

## The App

To run the CMS / API:

I haven't found a better way to install the dependencies yet so for now you must cd into `ui` and `api` and `npm install` manually before running the docker command.

`docker-compose up --renew-anon-volumes --force-recreate`

### App Urls:
- [Front-end](http://localhost:3000)
- [Backend](http://localhost:8181)

## Database

To get into postgres:

1. `docker exec -it fms_db /bin/bash`
2. `psql fms -U fms_user`

If you haven't used postgres before it's tad different than MySQL, here are [some commands](https://www.postgresqltutorial.com/psql-commands/)


## Shutdown

When you're done using the API or postgres just run:

`docker-compose down`


## Tutorials used to get going:

- https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Model-Data-with-TypeScript-Interfaces
- https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/