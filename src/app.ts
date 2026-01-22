import express from "express";
import papelRouter from "./routes/papelRouter";
import usuarioRouter from "./routes/usuarioRouter";
import produtoRouter from "./routes/produtoRouter";
import clienteRouter from "./routes/clienteRouter";
import racaRouter from "./routes/racaRouter";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerOutput.json";
import especieRouter from "./routes/especieRouter"
import petRouter from "./routes/petRouter";
import servicoRouter from "./routes/servicoRouter";


const app = express();
app.use(express.json());
app.use("/cargo", papelRouter);
app.use("/usuario", usuarioRouter);
app.use("/produto", produtoRouter);
app.use("/cliente", clienteRouter);
app.use("/raca", racaRouter);
app.use("/especie", especieRouter);
app.use("/pet", petRouter);
app.use("/servico", servicoRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
