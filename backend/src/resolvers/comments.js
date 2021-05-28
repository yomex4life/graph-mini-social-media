const Post = require('../models/Post')
const checkAuth = require('../utils/checkAuth')

module.exports = {
    Mutations:{
        async createComment(_, {postId, comment}, context){
            const user = checkAuth(context);
            try
            {
                if(comment.trim() === '')
                {
                    throw new UserInputError('Empty Comment', {
                        errors:{
                            body: 'comment body cannot be empty'
                        }
                    })
                }
                const post = await Post.findById(postId);
                if(post)
                {
                    post.comments.unshift({
                        body: comment,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                    await post.save();
                    return post;
                }
                else
                {
                    throw new UserInputError('Post not found');
                }
            }
            catch(err)
            {
                throw new Error('Unable to create comment')
            }
        },

        async deleteComment(_, {postId, commentId}, context)
        {
            const user = checkAuth(context);
            const post = await Post.findById(postId);
            try
            {
                if(postId)
                {
                    const commentIndex = post.comments.findIndex(c => c.id === commentId);
                    if(post.comments[commentIndex].username  =  user.username)
                    {
                        post.comments.splice(commentIndex, 1);
                        await post.save();
                        return post;
                    }
                    else
                    {
                        throw new UserInputError('You do not have the right permission');
                    }
                }
                else
                {
                    throw new UserInputError('Post not found');
                }
            }
            catch(err)
            {
                throw new Error('Unable to delete comment')
            }
        }
    }
}