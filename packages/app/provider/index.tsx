import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider } from './apollo'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <ApolloProvider>
        <Dripsy>{children}</Dripsy>
      </ApolloProvider>
    </NavigationProvider>
  )
}
