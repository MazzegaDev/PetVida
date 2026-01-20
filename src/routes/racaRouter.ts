import { Router } from "express";
import RacaController from "../controllers/racaController";

const router = Router();
const controller = new RacaController();

router.post("/cadastrarRaca", (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Cadastra uma raça'

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

router.get("/listarRacas", (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Lista todas as raças'
   controller.listRacas(req, res);
});

router.put("/alterarRaca", (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Altera uma raça'

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

router.delete("/deletarRaca/:id", (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Deleta uma raça'
   controller.deleteRaca(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Raça']
   // #swagger.summary = 'Busca uma raça por ID'
   controller.findById(req, res);
});

export default router;
