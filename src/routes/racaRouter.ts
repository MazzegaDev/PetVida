import { Router } from "express";
import RacaController from "../controllers/racaController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";

const router = Router();
const controller = new RacaController();

router.post("/cadastrarRaca", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Cadastra uma raça'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/raca'
                    }
                }
            }
        }
   */
   controller.createRaca(req, res);
});

router.get("/listarRacas", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Lista todas as raças'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listRacas(req, res);
});

router.get("/buscarPorId/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Busca uma raça por ID'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.put("/alterarRaca", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Altera uma raça'

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/racaAlter'
                    }
                }
            }
        }
   */
   controller.updateRacas(req, res);
});

router.delete("/deletarRaca/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Deleta uma raça'

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deleteRaca(req, res);
});



export default router;
