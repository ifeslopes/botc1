import { Prisma, PrismaClient, Comment } from '@prisma/client';

const prisma = new PrismaClient();

class CommentDataBaseService {
    constructor() {}

    async listDBComments() {
        try {
            return await prisma.comment.findMany({
                include: {
                    author: { select: { name: true } },

                    post: {
                        include: {
                            author: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getCommentById(id: number) {
        try {
            return await prisma.comment.findUnique({
                where: {
                    id: id,
                },
                include: {
                    post: true,
                    author: true,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getCommentsByPostId(postId: number) {
        try {
            return await prisma.comment.findMany({
                where: {
                    postId: postId,
                },
                include: {
                    post: true,
                    author: true,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getCommentsByAuthorId(authorId: number) {
        try {
            return await prisma.comment.findMany({
                where: {
                    authorId: authorId,
                },
                include: {
                    post: true,
                    author: true,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async insertDBComment(comment: Prisma.CommentCreateInput) {
        try {
            const newComment = await prisma.comment.create({
                data: comment,
            });
            return newComment;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateDBComment(comment: Prisma.CommentUpdateInput, id: number) {
        try {
            const updatedComment = await prisma.comment.update({
                where: {
                    id: id,
                },
                data: comment,
            });
            return updatedComment;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteDBComment(id: number) {
        try {
            await prisma.comment.delete({
                where: {
                    id: id,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default new CommentDataBaseService();
