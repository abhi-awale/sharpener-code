const { Post, Comment } = require('../models');

exports.addPost = async(link, description) => {
    const post = await Post.create({
            link, description
        });

    return post;
}

exports.fetchAllPost = async() => {
    const query = {
            attributes:['id', 'link', 'description'],
            include: [{
                model:Comment,
                attributes: ['id', 'commentText']
            }]
        }

    const posts = await Post.findAll(query);

    return posts;
}