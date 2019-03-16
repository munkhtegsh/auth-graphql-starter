const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID} = graphql;
const UserType = require('./user_type');

// by default gql alway exptects at least one field available
// for defined type
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dummyField: {type: GraphQLID},
    user: {
      // checking user authenticated
      type: UserType,
      resolve(parentValue, args, req) {
        // req connected with password
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
