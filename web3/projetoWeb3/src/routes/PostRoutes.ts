import { Router } from "express";

import PostController from "../controller/PostController";
import authori from "../middlewares/autorizacao";

const postRouter = Router();

postRouter.get(
  "/posts",
  authori,
  PostController.listPosts,
);

postRouter.get(
  "/post/:id",
  authori,
  PostController.getPostById,
);

postRouter.post(
  "/post",
  authori,
  PostController.createPost,
);

postRouter.put(
  "/post/:id",
  authori,
  PostController.updatePost,
);

postRouter.delete(
  "/post/:id",
  authori,
  PostController.deletePost,
);

export default postRouter;
