'use strict';
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { User, Module, MediaRaw} = require('../models');
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
        async queryUsers(_,{clause}) {
            return await User.findAll({where: JSON.parse(clause)})
        },
        async queryMediaRaw(_,{clause}) {
            var data = await MediaRaw.findAll({where: JSON.parse(clause)}).map(item =>{
                return {
                    
                    ...item.dataValues,
                    props:JSON.stringify(item.props)
                }
            })
            console.log(data)
            return data;
        },
        // Get a user by it ID
        async fetchUser(_,{ id},{authUser} ) {
            return await User.findById(id);
        },
        async modules(_,{ id},{authUser} ) {
            console.log({authUser})
            return await Module.findAll({
                include: [{// Notice `include` takes an ARRAY
                    all: true, 
                    nested: true
                }],
                order: [
                    // Will escape title and validate DESC against a list of valid direction parameters
                    ['id', 'ASC'],
                    ['menuItems','id', 'ASC']
                ]
            
                
              })
        },
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
