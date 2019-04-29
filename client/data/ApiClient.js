import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import  { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'node-fetch';
import {subscribe, publish } from './Queries';

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

export class ApolloClientWithMessageBus extends ApolloClient{
  constructor(props){
    super(props)
    this.listHandlers=[]
  }
  connectMB() {
    var me=this;
    this.subscribe({
        query: subscribe,
        variables:{topic: null, sender: null}
    }).subscribe({
      next ({data}) {
          if (data.actionRequest){
            let message = data.actionRequest;
            me.listHandlers.filter(({sender, topic})=>{
                return (!sender || sender==message.sender)  &&  (!topic || topic==message.topic)
            }).forEach(item=>item.onMessage({...message}))
          }
      },
    })
    this.MBconnected=true;
  }
  listen (topic, sender, onMessage) {
    this.listHandlers.push({topic, sender, onMessage});
    if (!this.MBconnected){
      this.connectMB()
    }
  }
  publish(payload){
    this.mutate({mutation: publish, variables: payload})
  }
}
const cache = new InMemoryCache();
var client =  new ApolloClientWithMessageBus({
    ssrMode: true,
    link: link,
    cache: cache,
    defaultOptions: defaultOptions,
});
cache.writeData({data: {currMenu: null, currModule: null, drawerOpen:true }});
export default client;