const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();

const REQ_ACTION = 'REQ_ACTION';

const resolvers = {
  Subscription: {
    actionRequest: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([REQ_ACTION]),
    }
  }
}