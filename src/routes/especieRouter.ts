import { Router } from "express";
import EspecieController from "../controllers/especieController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";

const router = Router();
const controller = new EspecieController();

router.post("/cadastrarRaca", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Cadastra uma especie'
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
                        $ref: '#/components/schemas/especie'
                    }
                }
            }
        }
   */
   controller.createEspecie(req, res);
});

router.get("/listarRacas", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Lista todas as especies'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listEspecies(req, res);
});

router.get("/buscarPorId/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Busca uma especie por ID'

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.put("/alterarRaca", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Altera uma especie'
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
                        $ref: '#/components/schemas/especieAlter'
                    }
                }
            }
        }
   */
   controller.updateEspecie(req, res);
});

router.delete("/deletarRaca/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Especie']
   // #swagger.summary = 'Deleta uma especie'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deleteEspecie(req, res);
});

export default router;
