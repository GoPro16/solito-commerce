import SchemaBuilder from '@pothos/core'
import { PrismaClient } from '@prisma/client'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'

import type PrismaTypes from '../prisma/pothos-types'
import Redis from 'ioredis'

const prisma = new PrismaClient()

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: {
    redis: Redis
    sessionID: string
  }
}>({
  plugins: [PrismaPlugin, RelayPlugin, SimpleObjectsPlugin],
  prisma: {
    client: prisma,
    // exposeDescriptions: boolean | { models: boolean, fields: boolean },
  },
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
})

const product = builder.prismaNode('Product', {
  id: { field: 'id' },
  fields: (t) => ({
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    shortDescription: t.exposeString('short_description'),
    img: t.exposeString('img'),
    price: t.exposeInt('price'),
  }),
})

const CartItem = builder.simpleObject('CartItem', {
  fields: (t) => ({
    quantity: t.int(),
    product: t.field({
      type: product,
    }),
  }),
})

builder.queryType({
  fields: (t) => ({
    products: t.prismaConnection({
      type: 'Product',
      cursor: 'id',
      resolve: (query) => {
        return prisma.product.findMany({
          ...query,
        })
      },
    }),
    // product
    cart: t.connection({
      type: CartItem,
      resolve: async (_, __, { redis, sessionID }) => {
        const cartRes = await redis.zrangebyscore(
          `cart:${sessionID}`,
          1,
          '+inf',
          'WITHSCORES'
        )

        const products = await prisma.product.findMany({
          where: {
            id: {
              in: cartRes.filter((_, index) => index % 2 === 0),
            },
          },
        })

        return {
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
          },
          edges: products.map((p) => ({
            node: {
              product: p,
              quantity:
                parseInt(cartRes[cartRes.findIndex((i) => i === p.id) + 1]) ||
                0,
            },
            cursor: '',
          })),
        }
      },
    }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    addToCart: t.field({
      type: 'Boolean',
      args: {
        productId: t.arg.globalID({
          required: true,
        }),
      },
      resolve: async (_, { productId }, { redis, sessionID }) => {
        try {
          await redis.zincrby(`cart:${sessionID}`, 1, productId.id)

          // Expire cart after 24h
          await redis.expire(`cart:${sessionID}`, 60 * 60 * 24)

          return true
        } catch (error) {
          console.error('error', error)
          return false
        }
      },
    }),
    removeFromCart: t.field({
      type: 'Boolean',
      args: {
        productId: t.arg.globalID({
          required: true,
        }),
      },
      resolve: async (_, { productId }, { redis, sessionID }) => {
        try {
          await redis.zrem(`cart:${sessionID}`, productId.id)
          // Expire cart after 24h
          await redis.expire(`cart:${sessionID}`, 60 * 60 * 24)

          return true
        } catch (error) {
          console.error('error', error)
          return false
        }
      },
    }),
    createProduct: t.field({
      type: 'Boolean',
      args: {
        name: t.arg({
          type: 'String',
          required: true,
        }),
        short_description: t.arg({
          type: 'String',
          required: true,
        }),
        description: t.arg({
          type: 'String',
          required: true,
        }),
        price: t.arg({
          type: 'Int',
          required: true,
        }),
      },
      resolve: async (root, args, ctx) => {
        try {
          const { name, short_description, description, price } = args
          const product = await prisma.product.create({
            data: {
              short_description,
              description,
              price,
              name,
              img: '',
            },
          })
        } catch (e) {
          console.error('error', e)
        }

        return true
      },
    }),
  }),
})

export const schema = builder.toSchema({})
