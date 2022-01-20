# FMS

## Requirements

- [Docker](https://www.docker.com/)

## The App

### To run the Database:

`docker-compose up --renew-anon-volumes --force-recreate`

### To run the app:

`cd ./app`

`npm run dev`

### App Urls:
- [Front-end](http://localhost:3000)
- [Backend](http://localhost:3000/api/)

## Environment

Make sure you copy `api/.env.example` to `.env` and update the values!

## Database

To get into postgres:

1. `docker exec -it fms_db /bin/bash`
2. `psql fms -U fms_user`

If you haven't used postgres before it's tad different than MySQL, here are [some commands](https://www.postgresqltutorial.com/psql-commands/)


## Shutdown

When you're done using the database run:

`docker-compose down`
