import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQLSERVER,
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