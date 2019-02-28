
// Define our schema using the GraphQL schema language
const typeDefs = `
    scalar DateTime
    type User {
        id: Int!
        firstName: String!
        lastName: String
        email: String!
        token: String
    }
    
    type MenuItem {
        id: Int!
        name: String!
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
    type Query {
        allUsers: [User]
        queryUsers(clause: String!): [User]
        allMenuItems:[MenuItem]
        fetchUser(id: Int!): User
        modules:[Module]
    }

    type Mutation {
        login (
            email: String!,
            password: String!
        ): String
        logout: String
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
`;
export default typeDefs;