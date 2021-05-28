const Post = require('../models/Post')
const checkAuth = require('../utils/checkAuth')

module.exports = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts
            } catch (error) {
                console.log(error)
            }
        },

        async getPost(_, {postId})
        {
            try
            {
                const post = await Post.findById(postId);
                if(post)
                {
                    return post;
                }
                else
                {
                    throw new Error('Post not found');
                }
            }
            catch (err)
            {
                throw new Error('Error retriving post')
            }
        }
    },

    Mutation:{
        async createPost(_, {body}, context)
        {
            const user = checkAuth(context);
            try
            {
                const post = new Post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                });

                const newPost = await post.save();
                return newPost;
            }
            catch (err)
            {
                throw new Error(err);
            }
        },

        async deletePost(_, {postId}, context)
        {
            const user = checkAuth(context);
            try
            {
                const post = await Post.findById(postId);
                if(post.username === user.username)
                {
                    await post.delete();
                    return 'Post deleted successfully';
                }
                else
                {
                    throw new Error('You do not have the permiaaion to delete this post');
                }
            }
            catch (err)
            {
                throw new Error(err);
            }
        },

        async likePost(_, {postId}, context)
        {
            const user = checkAuth(context);

            const post = await Post.findById(postId)
            if(post)
            {
                if(post.likes.find(like=> like.username === user.username))
                {
                    post.likes = post.likes.filter(like => like.username !== user.username);                
                }
                else
                {
                    post.likes.push({
                        username: user.username,
                        createdAt:new Date().toISOString(),
                    });
                }
                await post.save();
                return post;
            }
            else
            {
                throw new Error('Post not found');
            }
        }
    }
}