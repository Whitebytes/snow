
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
            type: String!
            payload: String 
            origin:Int
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
        sender: String
        userId: String!
        id: Int!
        origin: Int
    }
    
    ${schemas}
`;
export default typeDefs;