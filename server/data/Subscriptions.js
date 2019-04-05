const { PubSub } = require('apollo-server-express');
export const pubsub = new PubSub();

export const REQ_ACTION = 'REQ_ACTION';
export default pubsub;