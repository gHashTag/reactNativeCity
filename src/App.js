import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as Keychain from 'react-native-keychain'
import AppNavigator from './AppNavigator'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const authLink = setContext(async (_, { headers }) => {
  let token
  token = await Keychain.getGenericPassword()
  token = token.password
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <AppNavigator />
    </ApolloHooksProvider>
  </ApolloProvider>
)

export default App
