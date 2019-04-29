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
            let actReq =  { 
                userId: req.user.id,
                sender: req.token.id,
                id: msgCnt++,
                ...args
            }
      
            pubsub.publish(REQ_ACTION, {
                actionRequest:actReq
            });
            
            
            return actReq;
        }
    },
    Subscription: {
        actionRequest: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: withFilter(
                () => pubsub.asyncIterator(REQ_ACTION),
                ({actionRequest }, {topic, sender}, ctx) => {
                    let valid=true;
                    valid = valid && (!sender || sender==actionRequest.sender)
                    valid = valid && (!topic || topic===actionRequest.topic)
                    valid = valid && (ctx.user.id===actionRequest.userId)
                    valid = valid && (!actionRequest.receiver || ctx.token.id===actionRequest.receiver)
                    return valid;
                },
              )
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
