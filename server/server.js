import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './data/schema';
import {db, resolvers, schemas, queries} from './models';

import security from './util/Security';
const {REQ_ACTION, pubsub} = require('./data/Subscriptions');
import http from 'http';

var cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(cookieParser());
app.use('/graphql', 
  bodyParser.json(),
  security.syncAuth()
);
let allSchema = typeDefs({schemas, queries});

const server = new ApolloServer({
  typeDefs: allSchema,
  resolvers: resolvers,
  playground: {
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline',
      //someday, this is  works, and cookies are being send automaticly by the playground
      //https://github.com/prisma/graphql-playground/pull/836/files/b989c2ed9f974395d0fe3738d67e32fc76ccb2c9
      'request.credentials': 'same-origin' 
    }
  }, 
  subscriptions: {
    onConnect: async (connectionParams, webSocket, context) => {
      if (connectionParams.authorization) {
        webSocket.token= await security.validateToken(connectionParams.authorization);
        webSocket.user =  await webSocket.token.getOwner();
        webSocket.token.update({active:true});
      if (webSocket.user)
        //ready to send
         // setTimeout(()=>{
            pubsub.publish(REQ_ACTION, {
              actionRequest: { 
                type:"clientConnect", 
                userId: webSocket.user.id,
                payload: JSON.stringify({
                    token: webSocket.token
              }) },
            });
        //  },100)
    
          return {
            user: webSocket.user,
            token: webSocket.token
          }
      }
      throw new Error('Missing or invalid credentials!');
    },
    onDisconnect:async (webSocket, context) => {
      if (webSocket.token)
        webSocket.token.update({active:false})
      if (webSocket.user)
      //ready to send
        pubsub.publish(REQ_ACTION, {
          actionRequest: { 
            type:"clientDisconnect", 
            userId: webSocket.user.id,
            payload: JSON.stringify({
                token: webSocket.token
          }) },
        });
    },
  },
  context: async ({req, res, connection}) => { 
    if (connection) {
      return connection.context;
     
    } else {
      return {
        authUser: req.user,
        req, 
        res,
        db
      } 
  }
}});
server.applyMiddleware({ app })


//load initial data into database


app.use(express.static(path.join(__dirname, 'build')));
/*app.use(bodyParser.json());
app.get('/api/getRequest', (req, res) => {
 //API logic
 });

app.post('/api/postRequest', (req, res) => {
 //API logic
 });

app.get('*', (req,res) => {
 res.sendFile(path.join(__dirname, 'build/index.html'));
});*/

const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
})


