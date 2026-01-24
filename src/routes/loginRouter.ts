import { Router } from "express";
import AuthController from "../controllers/authController";

const routes = Router();
const controller = new AuthController();

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
routes.post("/logout", (req, res) => {
   controller.logout(req, res);
});

export default routes;
