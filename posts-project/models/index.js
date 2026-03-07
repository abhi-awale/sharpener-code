const Post = require('./post');
const Comment = require('./comment');

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = {
    Post,
    Comment
};