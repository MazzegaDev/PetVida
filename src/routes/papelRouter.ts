import { Router, Request, Response } from "express";
import PapelController from "../controllers/papelController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";


const router: Router = Router();
const controller: PapelController = new PapelController();

router.get("/funcoes", validateAuthAdm,(req: Request, res: Response) => {
   // #swagger.tags = ['Papel']
   // #swagger.summary = 'Lista todos os papeis no sistema'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listRoles(req, res);
})

export default router;