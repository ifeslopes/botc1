import { Router } from "express";

import { PrismaClient } from "@prisma/client";
import CommentController from "../controller/CommentController";
import authori from "../middlewares/autorizacao";

const prisma = new PrismaClient();

const CommentRouter = Router();

CommentRouter.get("/Comments", authori, CommentController.listComments);

CommentRouter.get("/Comment/:id", authori, CommentController.getCommentById);

CommentRouter.post("/Comment", authori, CommentController.createComment);

CommentRouter.put("/Comment/:id", authori, CommentController.updateComment);

CommentRouter.delete("/Comment/:id", authori, CommentController.deleteComment);

export default CommentRouter;
