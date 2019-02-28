import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const link = new HttpLink({
    uri: (typeof(window)!='undefined') ? window.location.origin + '/graphql' :'',
    fetch
})

export default  new ApolloClient({
    ssrMode: true,
    link: link,
    cache: new InMemoryCache(),
});

