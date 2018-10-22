import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './data/schema';
import resolvers from './data/resolvers';
import db from './models';
const jwt = require('express-jwt');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use('/graphql', bodyParser.json(), jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
}));

const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: async ({req}) => { 
      //const data = await someStuff(); 
      return {
        authUser: req.user,
        db
      } 
  }});
 


server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.get('/api/getRequest', (req, res) => {
 //API logic
 });

app.post('/api/postRequest', (req, res) => {
 //API logic
 });

app.get('*', (req,res) => {
 res.sendFile(path.join(__dirname, 'build/index.html'));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
 //console.log('Listening on port', port);
 console.log(` Server ready at http://localhost:${port}${server.graphqlPath}`)
});  