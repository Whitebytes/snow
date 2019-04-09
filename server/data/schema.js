
// Define our schema using the GraphQL schema language
const typeDefs = ({queries, schemas}) => `
    scalar DateTime
    type Query {
        ${queries}
        clientInfo: ClientInfo
    }

    type Mutation {
        login (
            email: String!,
            password: String!,
            appName:String!,
            appProps: String!
        ): String
        publish (
            receiver: String, 
            type: String!
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
        actionRequest: ActReq
    }
    type ClientInfo {
        hostname: String!
        ip: String!
        userAgent: String!
    }
    type ActReq {
        type: String
        payload: String
        receiver: String
        userId: String!
    }
    
    ${schemas}
`;
export default typeDefs;