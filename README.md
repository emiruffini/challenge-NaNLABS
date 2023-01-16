# Runnig NaNLABS challenge in a Docker Container

## Installation

```bash
$ npm install
```
Ensure also that [Docker is installed](https://docs.docker.com/engine/install) and [Nigix is installed](https://nginx.org/en/docs/install.html) on your work station.

## Running the app using node server (the normal way)

```bash
# development
$ npm start

# production
$ npm run build:prod
$ npm start
```

## Using Docker Compose for development
```sh
# Build the docker image
$ docker-compose -f docker-compose.dev.yml build

# Start and login to the container
$ docker-compose -f docker-compose.dev.yml up -d
```

## Using Docker Compose for production
```sh
# To avoid errors create a file .env.production containing
$ DISABLE_ESLINT_PLUGIN=true

# Build the docker image
$ docker-compose -f docker-compose.prod.yml build

# Start and login to the container
$ docker run -p 80:80 --name react-app nanlabs-challenge-prod
```

## Other useful Docker commands
```sh
# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh
```

## Testing

```bash
# unit tests
UNDER CONSTRUCTION
```

## License
[MIT licensed](LICENSE)


