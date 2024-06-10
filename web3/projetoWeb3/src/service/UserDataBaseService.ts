import { Prisma, PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserDataBaseService {
    constructor() {}

    async listDBUsers() {
        try {
            return await prisma.user.findMany();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getUserById(id: number) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    posts: true,
                    comments: true,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const users = await prisma.user.findMany({
                where: {
                    email: {
                        contains: email.toLowerCase(),
                    },
                },
                include: {
                    posts: true,
                    comments: true,
                },
            });

            return users;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async insertDBUser(user: Prisma.UserCreateInput) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = await prisma.user.create({
                data: {
                    ...user,
                    password: hashedPassword,
                },
            });
            return newUser;
        } catch (error) {
            console.log(error);
            return "Erro na criação de usuario!";
        }
    }

    async updateDBUser(user: Prisma.UserUpdateInput, id: number) {
        try {
            if (typeof user.password === 'string') {
                user.password = await bcrypt.hash(user.password, 10);
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: id,
                },
                data: user,
            });
            return updatedUser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteDBUser(id: number) {
        try {
            await prisma.user.delete({
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

export default new UserDataBaseService();
