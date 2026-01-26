import { Router } from "express";
import AuthController from "../controllers/authController";
import UsuarioController from "../controllers/usuarioController";
import { validateAuth } from "../middleware/authMiddleware";

const routes = Router();
const controller = new AuthController();
const userController = new UsuarioController();

routes.post("/login", (req, res) => {
   // #swagger.tags = ['Login']
   // #swagger.summary = 'Se autentifica no sistema'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/login'
                    }
                }
            }
        }
   */
   controller.login(req, res);
});

routes.post("/cadastrarUsuario", (req, res) => {
   // #swagger.tags = ['Login']
   // #swagger.summary = 'Cria um usuario'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/usuarioCliente'
                    }
                }
            }
        }
   */
   userController.createUser(req, res);
});

routes.post("/logout", (req, res) => {
   // #swagger.tags = ['Login']
   // #swagger.summary = 'Efetua logout'
   controller.logout(req, res);
});

routes.get("/usuarioLogado", validateAuth, (req, res) => {
   // #swagger.tags = ['Login']
   // #swagger.summary = 'Retorna o usuario atualmente logado'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.returnCurrentUser(req, res);
});

export default routes;
