const postsResolvers = require('../resolvers/post')
const usersResolvers = require('../resolvers/user')

//for each query adds a corresponding resolver
module.exports = {
    Query:{
        ...postsResolvers.Query
    },

    Mutation: {
        ...usersResolvers.Mutation
    }
}