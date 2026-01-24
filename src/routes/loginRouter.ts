import { Router } from "express";
import AuthController from "../controllers/authController";

const routes = Router();
const controller = new AuthController();

routes.post("/login", (req, res) => {
   controller.login(req, res);
});
routes.post("/logout", (req, res) => {
   controller.logout(req, res);
});

export default routes;
