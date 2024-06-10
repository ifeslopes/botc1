import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import UserController from "../controller/UserController";
import authori from "../middlewares/autorizacao";

const prisma = new PrismaClient();

const UserRouter = Router();

UserRouter.get('/Users', authori, UserController.getUsers);

UserRouter.get(
  "/User/:id",
  authori,
  UserController.getUserById,
);

UserRouter.post(
  "/User",
  UserController.postUser,
);

UserRouter.put(
  "/User/:id",
  authori,
  UserController.putUser,
);

UserRouter.delete(
  "/User/:id",
  authori,
  UserController.deleteUser,
);

UserRouter.get(
  "/Usernome/nome",
  authori,
  UserController.getUserByEmail,
);

export default UserRouter;
