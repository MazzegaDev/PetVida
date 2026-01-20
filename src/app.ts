import express from "express";
import papelRouter from "./routes/papelRouter";
import usuarioRouter from "./routes/usuarioRouter";
import produtoRouter from "./routes/produtoRouter";
import clienteRouter from "./routes/clienteRouter";
import racaRouter from "./routes/racaRouter";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerOutput.json";
import especieRouter from "./routes/especieRouter"

const app = express();
app.use(express.json());
app.use("/papeis", papelRouter);
app.use("/usuario", usuarioRouter);
app.use("/produto", produtoRouter);
app.use("/cliente", clienteRouter);
app.use("/raca", racaRouter);
app.use("/especie", especieRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
