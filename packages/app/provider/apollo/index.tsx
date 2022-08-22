import {
  ApolloClient,
  ApolloProvider as AApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

import { PropsWithChildren } from 'react'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
})

export const ApolloProvider = ({ children }: PropsWithChildren<{}>) => {
  return <AApolloProvider client={apolloClient}>{children}</AApolloProvider>
}
