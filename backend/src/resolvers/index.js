const postsResolvers = require('../resolvers/post')
const usersResolvers = require('../resolvers/user')
const commentsResolvers = require('../resolvers/comments')

//for each query adds a corresponding resolver
module.exports = {
    Query:{
        ...postsResolvers.Query
    },

    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutations
    }
}