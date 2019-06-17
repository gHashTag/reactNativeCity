import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import defaults from './defaults'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
})

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults
})

const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([stateLink, httpLink]),
  cache
})

export default client
