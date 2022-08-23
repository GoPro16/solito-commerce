# Not Your Average Astronauts (NYAA)

[![Watch the video](https://i.imgur.com/dltRfDd.mp4)](https://i.imgur.com/dltRfDd.mp4)

You must have docker-compose for the database to get stood up.

## Installation & Setup

### Dependencies

```bash
yarn install
```

### Generate mongodb prisma models

```bash
yarn generate:prisma
```

### Generate graphql hooks

```bash
yarn generate:graphql
```

### Startup databases (mongo, redis)

```bash
cd docker

docker-compose up -d
```

You may also have to run the mongo init to enable sharding

```bash
sh init-mongo.sh
```

Once you verify mongo is up and running you can seed the database.

### Seed database

```bash
yarn seed
```

## Running

Start up the backend with

```
yarn backend
```

You can run this as a native ios/android app or as a web app.

### Web

```bash
yarn web
```

### Native

```bash
yarn native
```

## Integration Tests

```bash
npx cypress open
```
