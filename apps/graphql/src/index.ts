/* eslint-disable react-hooks/rules-of-hooks */
import express from 'express'
import { createServer } from '@graphql-yoga/node'
import Redis from 'ioredis'
import { createRedisCache } from '@envelop/response-cache-redis'
import connectRedis from 'connect-redis'
// import cors from 'cors'
import session from 'express-session'
import { schema } from './schema'
import { useResponseCache } from '@envelop/response-cache'

const RedisStore = connectRedis(session)
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
})

const app = express()

const cache = createRedisCache({ redis })

const graphQLServer = createServer({
  schema,
  plugins: [
    useResponseCache({
      cache,
      includeExtensionMetadata: true,
      invalidateViaMutation: true,
      session: () => null,
      ignoredTypes: ['Cart'],
      shouldCacheResult: (t) => {
        // For some reason `ignoredTypes` doesnt work here so lets just short circuit it
        return !(t.result.data as any).cart
      },
    }),
  ],
  context: ({ req }) => {
    console.log('session', (req as any).sessionID)
    return {
      redis,
      sessionID: (req as any).sessionID,
    }
  },
})

// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:3000',
//   })
// )

app.use(
  session({
    store: new RedisStore({
      client: redis,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    saveUninitialized: true,
    secret: 'bill jobs',
    resave: false,
  })
)

// Bind GraphQL Yoga to `/graphql` endpoint
app.use('/graphql', graphQLServer)

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
