'use strict';
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const {REQ_ACTION, pubsub} = require('./Subscriptions');
const {withFilter} = require('apollo-server-express');
require('dotenv').config();
// Define resolvers
const resolvers = {
    Query: {
        clientInfo: (_, __, { req }) =>{
            return {
                hostname: req.hostname,
                userAgent: req.get('User-Agent'),
                ip: req.ip
            }
        }
    },
    Mutation: {
         login(_, { email, password, appName, appProps }, { res }) {
            var security = require('../util/Security').default;
            return  security.login(email, password,appName, appProps, res)
        }
    },
    Subscription: {
        actionRequest: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: withFilter(
                () => pubsub.asyncIterator(REQ_ACTION),
                (payload, _, ctx) => {
                   /// console.log(ctx.user)
                  return true;
                },
              ),
        }
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

export default resolvers;
