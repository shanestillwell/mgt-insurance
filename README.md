# Code Challenge

[Challenge Instructions](./CHALLENGE.md)

## Requirements

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (to run locally)
* [Docker Compose](https://docs.docker.com/compose/)
* [PNPM](https://pnpm.io/) if decide to run on bare metal
    * pnpm installs packages dramatically faster than npm and yarn
    * `npm install -g pnpm` or `curl -fsSL https://get.pnpm.io/install.sh | sh -`

## Install

```
git clone git@github.com:shanestillwell/mgt-insurance.git
```

## Run vi Docker Compose
``` 
cd mgt-insurance;
```

```
# Starts all the pieces
docker-compose up -d

# Verify running
docker-compose ps

# See logs of APIs
docker-compose logs -f api mockapi
```

Open a Browser to http://localhost:9000

## Components

### API

* TypeORM for easy database models
* Typescript for better code documenation
* Express for simple web server setup
* Multistage Dockerfile produces production ready artifacts

#### Features

* Caches via a hashkey kept in the DB based on inputs
* Stores each quote
* Returns best three results

#### Environment Variables
> Automatically set in docker-compose.yml, but may need to be set if run on bare metal
- PORT=3000
- DATABASE_URL=postgres://postgres:postgres@db/postgres?currentSchema=postgres
- RATE_SERVICE_URL=http://mockapi:3000/rate

### Mock API

A very basic Express server running in Docker that will take the `name`, `age`, `drivingExpYrs` and calculate a predictable (not static) rate based on the input factors.
```
const factor = Math.max(100 - age, 10)
const quoteRate = (drivingExpYrs * factor) / charInName
```

### DB (PostgreSQL)

* Version 16

### APP - UI

Running on http://localhost:9000

* VueJS
* Vuetify Framework
* Typescript

#### Environment Variables
> Automatically set in docker-compose.yml, but may need to be set if run on bare metal
- API_URL=http://api:3000
