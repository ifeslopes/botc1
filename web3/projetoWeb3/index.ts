import express from "express";
import UserRoute from './src/routes/UserRoutes';
import CommentRouter from './src/routes/CommentRoutes';
import PostRouter from './src/routes/PostRoutes';
import Login from "./src/routes/AuthRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cors());

app.use(UserRoute);
app.use(CommentRouter);
app.use(PostRouter);
app.use(Login);
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = 3005;

app.get("/", function (req, res) {
  /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
  return res.json({
    status: "ok",
    messagem: "Requisição enviada com sucesso",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log("Servidor rodando normalmente na porta " + port);
});
