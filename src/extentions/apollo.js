import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GQLSERVER
})

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('session')
  return {
    headers: {
      ...headers,
      session: token ? `${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  credentials: 'include',
  cache: new InMemoryCache({ typePolicies: {
    Nagging: {
      keyFields: ["uuid"],
    },
    User: {
      keyFields: ["uuid"]
    }
  }})
})

export default client