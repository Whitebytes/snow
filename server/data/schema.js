
// Define our schema using the GraphQL schema language
const typeDefs = ({queries, schemas, mutations}) => `
    scalar DateTime
    type Query {
        ${queries}
        clientInfo: ClientInfo
    }

    type Mutation {
        ${mutations}
        login (
            email: String!,
            password: String!,
            appName:String!,
            appProps: String!
        ): String
        publish (
            receiver: String,
            topic: String!
            payload: String 
        ): ActReq
        createUser (
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
        ): User
    }
    type Subscription {
        actionRequest(topic: String, sender: String): ActReq
    }
    type ClientInfo {
        hostname: String!
        ip: String!
        userAgent: String!
    }
    type ActReq {
        topic: String
        payload: String
        sender: String
        userId: String!
        id: Int!
    }
    
    ${schemas}
`;
export default typeDefs;