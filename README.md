# Code Challenge

[Challenge Instructions](./CHALLENGE.md)

## Install

```
git clone FIXME
```

## Run vi Docker Compose
``` 
cd FIXME
```

```
# Starts the 
docker-comopose up -d
```

## Components

### API

* TypeORM
* Typescript
* Express

#### Features

* Caches via a hashkey kept in the DB based on inputs
* Stores each quote
* Returns best three results

### Mock API

A very basic Express server running in Docker that will take the `name`, `age`, `drivingExpYrs` and calculate a predictable (not static) rate based on the input factors.
```
const factor = Math.max(100 - age, 10)
const quoteRate = (drivingExpYrs * factor) / charInName
```

### DB (PostgreSQL)

### APP - UI

* VueJS
* Vuetify Framework
* Typescript
