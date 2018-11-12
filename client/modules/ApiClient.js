import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';


const link = new HttpLink({
    uri: (typeof(window)!='undefined') ? window.location.origin + '/graphql' :'',
    fetch
})

const client = new ApolloClient({
    ssrMode: true,
    link: link,
    cache: new InMemoryCache(),
});

class ApiClient {
    mutate(props) {
         return client.mutate(props);
    } 
}

export default ApiClient;
