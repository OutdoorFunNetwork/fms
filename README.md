# FMS

## Requirements

- [Docker](https://www.docker.com/)

## Environment

There is a `.env.example` file. Copy that, rename it to `.env` and update it. If you're not using the docker psql then you'll have to update the database username and password. If you are using docker then those values can be left alone.

## Database

Before running the docker command just make sure the directory `./postgres-data` doesn't exist. If it does just delete it. I haven't figured out how to clear that but that holds on to the database and data. Sometimes when I update the schema it just needs to be removed.

To run postgres:

`docker-compose up`

To get into postgres:

1. `docker exec -it fms_db /bin/bash`
2. `psql fms -U fms_user`

If you haven't used postgres before it's tad different than MySQL, here are [some commands](https://www.postgresqltutorial.com/psql-commands/)

When you're done using the API or postgres just run:

`docker-compose down`