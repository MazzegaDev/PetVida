import { Router } from "express";
import EspecieController from "../controllers/especieController";

const router = Router();
const controller = new EspecieController();

router.post("/cadastrarRaca", (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Cadastra uma especie'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/especie'
                    }
                }
            }
        }
   */
   controller.createEspecie(req, res);
});

router.get("/listarRacas", (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Lista todas as especies'
   controller.listEspecies(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Busca uma especie por ID'
   controller.findById(req, res);
});

router.put("/alterarRaca", (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Altera uma especie'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/especieAlter'
                    }
                }
            }
        }
   */
   controller.updateEspecie(req, res);
});

router.delete("/deletarRaca/:id", (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Deleta uma especie'
   controller.deleteEspecie(req, res);
});

export default router;
