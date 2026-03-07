
const response = require('../utils/response');
const {addPost, fetchAllPost, fetchPostById, addCommentToPost} = require('../services/postServices');

const addNewEntry = async (req, res) => {
    const { link, description } = req.body;

    try {
        const post = await addPost(link, description);

        return response.success(res, {
            statusCode:201,
            message:"Post created successfully!",
            data: post
        });

    } catch (err) {
        return response.error(res, {
            message: "Internal server error.",
            err: err
        });
    }
}

const fetchAllEntries = async(req, res) => {
    try{
        const posts = await fetchAllPost();

        return response.success(res, {
            statusCode:200,
            message: "Records fetched successfully!",
            data: posts
        });

    } catch (err) {
        return response.error(res, {
            message: "Internal server error.",
            err: err
        });
    }
}

const addComment = async (req, res) => {
    const {id} = req.params;

    const {commentText} = req.body;

    try{

        const post = await fetchPostById(id);

        if(!post) {
            return response.error(res, {
                statusCode: 404,
                message: "Post not found",
            });
        }

        await addCommentToPost(post, commentText);

        response.success(res, {
            statusCode:201,
            message: "Comment added successfully!"
        });

    } catch (err) {
        return response.error(res, {
            message: "Internal server error.",
            err: err
        });
    }
}

module.exports = {
    addNewEntry,
    fetchAllEntries,
    addComment
}