import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import  { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'node-fetch';
import gql from "graphql-tag";
import {  menuChanged, menu_loaded } from "../redux/actions";
import Router from 'next/router'

const userQ='query{currUser{firstName, lastName}}'
const moduleList = gql`query {modules{id,name,icon,menuItems{name, icon, url}}}`

const uri = process.browser  ? window.location.origin + '/graphql' :''

const httplink = new HttpLink({
    uri: uri,
    fetch
})

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
    uri: uri.replace('http', 'ws'),
    options: {
      reconnect: true,
      connectionParams: ()=> ({
        authorization: localStorage.getItem('token')
    })
    }
  }) : null;
  
  
  const terminatingLink = process.browser ? split( //only create the split in the browser
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httplink,
  ) : httplink;

  const authLink = setContext((_, { headers }) => {
    var token = localStorage.getItem('token')
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
var client =  new ApolloClient({
    ssrMode: true,
    link: link,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
});

client
  .query({
    query: gql(userQ),
    fetchPolicy: 'no-cache'
  }).then(({data, errors}) => {
    if (errors)
      Router.push('/me/Login')
  }).catch((error)=>{
    Router.push('/me/Login')
  })
  
client.subscribe({
    query: gql`subscription{actionRequest{command, payload	}}`,
    variables: {}
  }).subscribe({
    next ({data}) {
      if (data.actionRequest){
          menuChanged();
          client
              .query({
                query: moduleList,
                fetchPolicy: 'no-cache'
              }) 
              .then(({data}) => {
                menu_loaded(data.modules);
          }) 
      }
    },
    error(err) { console.error('err', err); },
  });

export default client;