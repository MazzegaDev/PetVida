import { Router } from "express";
import AtendimentoController from "../controllers/atendimentoController";

const controller = new AtendimentoController();
const router = Router();

router.post("/iniciarAtendimento", (req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Inicia um atendimento'

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

router.get("/listarAtendimentos", (req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Lista todos os atendimentos'
   controller.listAtendimento(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Atendimento']
   // #swagger.summary = 'Busca um atendimento por ID'
   controller.findById(req, res);
});

router.patch("/alterarStatus", (req, res) => {
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
   controller.changeStatus(req, res);
});

export default router;