import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './data/resolvers';
import typeDefs from './data/schema';
import db from './models';
import security from './util/Security';


var cookieParser = require('cookie-parser')

const jwt = require('express-jwt');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(cookieParser());
app.use('/graphql', 
  bodyParser.json(),
  security.syncAuth()
);

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  playground: {
    settings: {
      'editor.theme': 'dark',
      //someday, this is  works, and cookies are being send automaticly by the playground
      //https://github.com/prisma/graphql-playground/pull/836/files/b989c2ed9f974395d0fe3738d67e32fc76ccb2c9
      'request.credentials': 'same-origin' 
    }
  },
  context: async ({req, res}) => { 
    console.log(req.user)
    return {
      authUser: req.user,
      req, 
      res,
      db
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
app.listen(port, () => {
 //console.log('Listening on port', port);
 console.log(` Server ready at http://localhost:${port}${server.graphqlPath}`)
});

