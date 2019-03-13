import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
    uri: process.env.REACT_APP_API_SERVER_URL,
    credentials: 'omit'
})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})