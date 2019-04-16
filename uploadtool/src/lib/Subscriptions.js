import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http';
import WebSocket from 'ws';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import settings  from './Settings';
import { setContext } from 'apollo-link-context';

var uri = settings.get('uri')
const httpLink = new HttpLink({
  uri: `http://${uri}/graphql`,
  fetch: fetch
});
console.log(`connected to ${uri}`)

const wsLink = new WebSocketLink({
  uri: `ws://${uri}/graphql`,
  fetch:fetch,
  webSocketImpl: WebSocket,
  options: {
    reconnect: true,
    connectionParams: ()=> ({
        authorization: settings.get('token')
    })
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) =>() => {
  var token = settings.get('token');
  console.log(token)
  return {
            headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link = ApolloLink.from([authLink, terminatingLink]);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  ssrMode: true,
  link:link,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

export default client;
