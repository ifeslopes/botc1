import { Prisma, PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

class PostDataBaseService {
    constructor() {}

    async listDBPosts() {
        try {
            return await prisma.post.findMany({
                
                    include: {
                        author: { select: { name: true } },

                        comments: {
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

    async getPostById(id: number) {
        try {
            return await prisma.post.findUnique({
                where: {
                    id: id,
                },
                include: {
                    comments: {
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

    async getPostsByAuthorId(authorId: number) {
        try {
            return await prisma.post.findMany({
                where: {
                    authorId: authorId,
                },
                include: {
                    comments: {
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

    async insertDBPost(post: Prisma.PostCreateInput) {
        try {
            const newPost = await prisma.post.create({
                data: {
                    ...post,
                },
                include: {
                    author: true,
                    comments: true,
                },
            });
            return newPost;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateDBPost(post: Prisma.PostUpdateInput, id: number) {
        try {
            const updatedPost = await prisma.post.update({
                where: {
                    id: id,
                },
                data: post,
                include: {
                    author: true,
                    comments: true,
                },
            });
            return updatedPost;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteDBPost(id: number) {
        try {
            await prisma.post.delete({
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

export default new PostDataBaseService();
