import { Request, Response } from 'express';
import PostDataBaseService from '../service/PostDataBaseService';

class PostController {
    constructor() {}

    async listPosts(req: Request, res: Response) {
        try {
            const posts = await PostDataBaseService.listDBPosts();
            res.json({
                status: 200,
                posts: posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Unable to list posts',
            });
        }
        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Post']
    #swagger.summary = 'Get all posts'
    #swagger.description = 'Retrieves a list of all posts'
    #swagger.responses[200] = {
      description: 'A list of posts',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Post" }
          }
        }
      }
    }
    */
    }

    async getPostById(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Post ID not found',
            });
            return;
        }

        try {
            const post = await PostDataBaseService.getPostById(parseInt(id));

            if (!post) {
                res.status(404).json({
                    status: 404,
                    message: 'Post not found',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                post: post,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error retrieving the post',
            });
        }

        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Post']
    #swagger.summary = 'Get post by ID'
    #swagger.description = 'Retrieves a post by ID'
    #swagger.responses[200] = {
      description: 'Returns a post',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Post" }
        }
      }
    }
    */
    }

    async getPostsByAuthorId(req: Request, res: Response) {
        const authorId = req.params.authorId;

        if (!authorId) {
            res.status(400).json({
                status: 400,
                message: 'Author ID not found',
            });
            return;
        }

        try {
            const posts = await PostDataBaseService.getPostsByAuthorId(
                parseInt(authorId)
            );

            if (!posts || posts.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: 'Posts not found',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                posts: posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error retrieving the posts',
            });
        }

        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Post']
    #swagger.summary = 'Get posts by Author ID'
    #swagger.description = 'Retrieves posts by Author ID'
    #swagger.responses[200] = {
      description: 'Returns posts',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Post" }
          }
        }
      }
    }
    */
    }

    async createPost(req: Request, res: Response) {
        const postData = req.body;

        if (!postData.title || !postData.content || !postData.authorId) {
            res.status(400).json({
                status: 400,
                message: 'Missing required fields',
            });
            return;
        }

        try {
            const newPost = await PostDataBaseService.insertDBPost(postData);
            res.status(201).json({
                status: 201,
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error creating the post',
            });
        }

        /*
    #swagger.security = [{"bearerAuth": []}]
    #swagger.tags = ['Post']
    #swagger.summary = 'Create a new post'
    #swagger.description = 'Creates a new post with the provided data'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/PostCreate" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Post created successfully',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Post" }
        }
      }
    }
    */
    }

    async updatePost(req: Request, res: Response) {
        const id = req.params.id;
        const postData = req.body;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Post ID not found',
            });
            return;
        }

        if (!postData.title || !postData.content) {
            res.status(400).json({
                status: 400,
                message: 'Missing required fields',
            });
            return;
        }

        try {
            const updatedPost = await PostDataBaseService.updateDBPost(
                postData,
                parseInt(id)
            );
            res.status(200).json({
                status: 200,
                post: updatedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error updating the post',
            });
        }

        /*
    #swagger.security = [{"bearerAuth": []}]
    #swagger.tags = ['Post']
    #swagger.summary = 'Update post by ID'
    #swagger.description = 'Updates a post with the provided data'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/PostUpdate" }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Post updated successfully',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Post" }
        }
      }
    }
    */
    }

    async deletePost(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Post ID not found',
            });
            return;
        }

        try {
            await PostDataBaseService.deleteDBPost(parseInt(id));
            res.status(200).json({
                status: 200,
                message: 'Post deleted successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error deleting the post',
            });
        }

        /*
   
    #swagger.tags = ['Post']
    #swagger.summary = 'Delete post by ID'
    #swagger.description = 'Deletes a post with the provided ID'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.responses[200] = {
      description: 'Post deleted successfully',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Post" }
        }
      }
    }
    */
    }
}

export default new PostController();
