'use strict';
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { User, Post, Tag } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

require('dotenv').config();
import security from '../util/Security';

const mapType =(type)=>{

}
function readOnly(target, key, descriptor){
    descriptor.writable=false;
    return descriptor;
}

// Define resolvers
const resolvers = {
    Query: {
        // Fetch all users
        async allUsers(_,{ctx}) {
            return await User.all();
        },
        // Get a user by it ID
        async fetchUser(_,{ id},{authUser} ) {
            return await User.findById(id);
        }
    },
    Mutation: {
        // Handles user login
        async login(_, { email, password }, { res }) {
            return security.login(email, password, res)
        },
        async logout(a,b,{req, res}) {
            return await security.logout(res)
        },
        // Create new user
        async createUser(_, { firstName, lastName, email, password }) {
            return await User.create({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });
        },
        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, password }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }
            // fetch the user by it ID
            const user = await User.findById(id);
            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });
            return user;
        },
       
    },
   
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'DateTime type',
        parseValue(value) {
            // value from the client
            return new Date(value);
        },
        serialize(value) {
            const date = new Date(value);
            // value sent to the client
            return date.toISOString();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // ast value is always in string format
                return parseInt(ast.value, 10);
            }
            return null;
        }
    })
}

fs
  .readdirSync(__dirname+'/../models')
  .filter(file => {
    return (file.indexOf('.') !== 0) 
    && (file !== 'index.js') 
    && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var resolver = require(__dirname+'/../models/'+file);
    if(resolver.query)
        Object.assign(resolvers.Query,resolver.query)
    
  });

  
export default resolvers;
