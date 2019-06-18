import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import AppNavigator from './AppNavigator'

const httpLink = createHttpLink({
  uri: 'https://ancient-earth-87642.herokuapp.com'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = 'token' //await AsyncStorage.getItem(TOKEN_KEY) // eslint-disable-line
  // return the headers to the context so httpLink can read them
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
