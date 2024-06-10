import { Request, Response } from 'express';
import CommentDataBaseService from '../service/CommentDataBaseService';

class CommentController {
    constructor() {}

    async listComments(req: Request, res: Response) {
        try {
            const comments = await CommentDataBaseService.listDBComments();
            res.json({
                status: 200,
                comments: comments,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Unable to list comments',
            });
        }
        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Comment']
    #swagger.summary = 'Get all comments'
    #swagger.description = 'Retrieves a list of all comments'
    #swagger.responses[200] = {
      description: 'A list of comments',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Comment" }
          }
        }
      }
    }
    */
    }

    async getCommentById(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Comment ID not found',
            });
            return;
        }

        try {
            const comment = await CommentDataBaseService.getCommentById(
                parseInt(id)
            );

            if (!comment) {
                res.status(404).json({
                    status: 404,
                    message: 'Comment not found',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                comment: comment,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error retrieving the comment',
            });
        }

        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Comment']
    #swagger.summary = 'Get comment by ID'
    #swagger.description = 'Retrieves a comment by ID'
    #swagger.responses[200] = {
      description: 'Returns a comment',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Comment" }
        }
      }
    }
    */
    }

    async getCommentsByPostId(req: Request, res: Response) {
        const postId = req.params.postId;

        if (!postId) {
            res.status(400).json({
                status: 400,
                message: 'Post ID not found',
            });
            return;
        }

        try {
            const comments = await CommentDataBaseService.getCommentsByPostId(
                parseInt(postId)
            );

            if (!comments || comments.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: 'Comments not found',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                comments: comments,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error retrieving the comments',
            });
        }

        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Comment']
    #swagger.summary = 'Get comments by Post ID'
    #swagger.description = 'Retrieves comments by Post ID'
    #swagger.responses[200] = {
      description: 'Returns comments',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Comment" }
          }
        }
      }
    }
    */
    }

    async getCommentsByAuthorId(req: Request, res: Response) {
        const authorId = req.params.authorId;

        if (!authorId) {
            res.status(400).json({
                status: 400,
                message: 'Author ID not found',
            });
            return;
        }

        try {
            const comments = await CommentDataBaseService.getCommentsByAuthorId(
                parseInt(authorId)
            );

            if (!comments || comments.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: 'Comments not found',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                comments: comments,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error retrieving the comments',
            });
        }

        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Comment']
    #swagger.summary = 'Get comments by Author ID'
    #swagger.description = 'Retrieves comments by Author ID'
    #swagger.responses[200] = {
      description: 'Returns comments',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: { $ref: "#/components/schemas/Comment" }
          }
        }
      }
    }
    */
    }

    async createComment(req: Request, res: Response) {
        const commentData = req.body;

        if (
            !commentData.content ||
            !commentData.postId ||
            !commentData.authorId
        ) {
            res.status(400).json({
                status: 400,
                message: 'Missing required fields',
            });
            return;
        }

        try {
            const newComment = await CommentDataBaseService.insertDBComment(
                commentData
            );
            res.status(201).json({
                status: 201,
                comment: newComment,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error creating the comment',
            });
        }

        /*
      #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Comment']
    #swagger.summary = 'Create a new comment'
    #swagger.description = 'Creates a new comment with the provided data'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CommentCreate" }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Comment created successfully',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Comment" }
        }
      }
    }
    */
    }

    async updateComment(req: Request, res: Response) {
        const id = req.params.id;
        const commentData = req.body;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Comment ID not found',
            });
            return;
        }

        if (!commentData.content) {
            res.status(400).json({
                status: 400,
                message: 'Missing required fields',
            });
            return;
        }

        try {
            const updatedComment = await CommentDataBaseService.updateDBComment(
                commentData,
                parseInt(id)
            );
            res.status(200).json({
                status: 200,
                comment: updatedComment,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error updating the comment',
            });
        }

        /*
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.tags = ['Comment']
    #swagger.summary = 'Update comment by ID'
    #swagger.description = 'Updates a comment with the provided data'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/CommentUpdate" }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Comment updated successfully',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Comment" }
        }
      }
    }
    */
    }

    async deleteComment(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                status: 400,
                message: 'Comment ID not found',
            });
            return;
        }

        try {
            await CommentDataBaseService.deleteDBComment(parseInt(id));
            res.status(200).json({
                status: 200,
                message: 'Comment deleted successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: 'Error deleting the comment',
            });
        }

        /*
    #swagger.tags = ['Comment']
    #swagger.summary = 'Delete comment by ID'
    #swagger.description = 'Deletes a comment with the provided ID'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.responses[200] = {
      description: 'Comment deleted successfully',
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Comment" }
        }
      }
    }
    */
    }
}

export default new CommentController();
