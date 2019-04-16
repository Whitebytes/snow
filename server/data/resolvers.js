'use strict';
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const {REQ_ACTION, pubsub} = require('./Subscriptions');
const {withFilter} = require('apollo-server-express');

require('dotenv').config();
// Define resolvers
let msgCnt=0;
const resolvers = {
    Query: {
        clientInfo: (_, __, { req }) =>{
            return {
                hostname: req.hostname,
                userAgent: req.get('User-Agent'),
                ip: req.ip
            }
        }, 
    },
    Mutation: {
        async login(_, { email, password, appName, appProps }, { res }) {
            var security = require('../util/Security').default;
            let token = await security.login(email, password,appName, appProps, res)
            return token;

        },
        publish: (_, args, { req }) =>{
            let {receiver, ...rest} = args;
            let actReq =  { 
                userId: req.user.id,
                sender: req.token.id,
                id: msgCnt++,
                ...rest
            }
      
            pubsub.publish(REQ_ACTION, {
                actionRequest:actReq,
                receiver: receiver
            });
            
            
            return actReq;
        }
    },
    Subscription: {
        actionRequest: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: withFilter(
                () => pubsub.asyncIterator(REQ_ACTION),
                (payload, _, ctx) => {
                    if (payload.receiver){
                       return ctx.token.id==payload.receiver;
                    }
                    return ctx.user.userId==payload.userId
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
