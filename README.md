# FMS

## Requirements

- [Docker](https://www.docker.com/)

## Database

To run postgres:

`docker-compose up --renew-anon-volumes`

To get into postgres:

1. `docker exec -it fms_db /bin/bash`
2. psql fms -U fms_user

If you haven't used postgres before it's tad different than MySQL, here are [some commands](https://www.postgresqltutorial.com/psql-commands/)

When you're done using the API or postgres just run:

`docker-compose down`