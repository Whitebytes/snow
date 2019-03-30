
// Define our schema using the GraphQL schema language
const typeDefs = `
    scalar DateTime
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        avatar: String!
        token: String
    }
    type Token {
        id: ID!
        appName: String!
        appProps: String
    }
    type MenuItem {
        id: Int!
        name: String!
        url: String!
        icon: String!
        parentId: Int!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }

    
    type Module {
        id: Int!
        name: String!
        icon: String
        menuItems: [MenuItem]
    }

    type Project {
        id: ID!
        name: String!
        description: String
        userOwner: User,
        mapProps: String!
        img: String!
        createdAt: String!
    }
    type MediaRaw {
        id:  ID!
        name: String!
        type: String!
        connectorId: String!
        blobRef: String!
        userOwner: User!
        props: String!,
        project: Project!
        createdAt: String!,
        labels:String
    }

    type Query {
        allUsers: [User]
        currUser: User
        queryUsers(clause: String!): [User]
        queryMediaRaw(clause: String!): [MediaRaw]
        allMenuItems:[MenuItem]
        fetchUser(id: Int!): User
        modules:[Module]
        queryProjects(clause: String!):[Project]
    }

    type Mutation {
        login (
            email: String!,
            password: String!,
            appName:String!,
            appProps: String!
        ): String
        
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
    type ActReq {
        command: String
        payload: String
    }
`;
export default typeDefs;