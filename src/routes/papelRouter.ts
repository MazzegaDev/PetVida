import { Router, Request, Response } from "express";
import PapelController from "../controllers/papelController";


const router: Router = Router();
const controller: PapelController = new PapelController();

router.get("/funcoes", (req: Request, res: Response) => {
   // #swagger.tags = ['Papel']
   // #swagger.summary = 'Lista todos os papeis no sistema'
   controller.listRoles(req, res);
})

export default router;