import { Router } from "express";
import AtendimentoController from "../controllers/atendimentoController";
import { validateAuth,validateAuthAdm } from "../middleware/authMiddleware";

const controller = new AtendimentoController();
const router = Router();

router.post("/iniciarAtendimento", validateAuth, (req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Inicia um atendimento'

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
                        $ref: '#/components/schemas/atendimento'
                    }
                }
            }
        }
   */
   controller.createAtendimento(req, res);
});

router.get("/listarAtendimentos", validateAuth,(req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Lista todos os atendimentos'

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listAtendimento(req, res);
});

router.get("/buscarPorId/:id", validateAuth,(req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Busca um atendimento por ID'

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.patch("/alterarStatus", validateAuth,(req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Altera o status de um atendimento um atendimento'
   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/alterarStatus'
                    }
                }
            }
        }
   */

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.changeStatus(req, res);
});

export default router;
