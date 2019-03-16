const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      resolve(parentValue, {email, password}, req) {
        return AuthService.signup({
          //returning promise
          email,
          password,
          req,
        });
      },
    },

    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        // you can write it in one line creating bottom three lines in auth.js
        const {user} = req; // from password
        req.logout(); // will delete req.user
        return user; // return logged out user in gql
      },
    },
  },
});

module.exports = mutation;
