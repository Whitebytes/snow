'use strict';
const uuid = require('uuid/v4'); // ES5


const model = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    User.associate = function(models) {
        // A user can have many tokens
       // User.hasMany(models.Token, {as: 'accessTokens', foreignKey:'userId'});
    };
    User.gqlQuery = `
        allUsers: [User]
        currUser: User
        queryUsers(clause: String!): [User]
        fetchUser(id: Int!): User
    `
    User.gqlType=`
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        avatar: String!
        token: String
    }
    `
    User.resolvers = {
        Query: {
            // Fetch all users
            async allUsers(_,{ctx}) {
                return await User.all();
            },
            async queryUsers(_,{clause}) {
                return await User.findAll({
                    where: JSON.parse(clause)
                })
            },
            async fetchUser(_,{ id},{authUser} ) {
                return await User.findById(id);
            },
            async currUser(_,__,{authUser} ) {
                if (!authUser){
                    throw new Error('There is no current user');
                }
                return authUser;
            },
        },
        Mutation: {
            // Create new user
            async createUser(_, { firstName, lastName, email, password }) {
                return await User.create({
                    firstName,
                    lastName,
                    email,
                    password: await bcrypt.hash(password, 10)
                });
            },
            // Update a particular user
            async updateUser(_, { id, firstName, lastName, email, password }, { authUser }) {
                // Make sure user is logged in
                if (!authUser) {
                    throw new Error('You must log in to continue!')
                }
                // fetch the user by it ID
                // Update the user
                await user.update({
                    firstName,
                    lastName,
                    email,
                    password: await bcrypt.hash(password, 10)
                });
                return user;
            }
           
        }
    }
    /*User.beforeCreate((user, _ ) => {
        return user.id = uuid(); 
    })*/
  
    return User;
}


export default model;
