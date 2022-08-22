# Not Your Average Astronauts (NYAA)

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
