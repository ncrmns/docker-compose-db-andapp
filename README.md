# Auction house
## Container 1:
#### Auction house app
#### (base: node:10, PORT:1234)

## Container 2:
#### Database
#### (MariaDB, PORT:3306)
## Usage:
#### Install docker compose:
https://docs.docker.com/compose/install/
#### Start the containers with:
        docker-compose up
#### Stop the running containers with:
        docker-compose down
#### You can customise the database input file with custom SQL querries:
        ./app/dump.sql