import { Router } from "express";
import ServicoController from "../controllers/servicoController";

const controller = new ServicoController();
const router = Router();

router.post("/cadastrarServico", (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Cadastra um serviço'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/servico'
                    }
                }
            }
        }
   */

   controller.createServico(req, res);
});

router.get("/listarServicos", (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Lista todos os serviços'

   controller.listServico(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Busca um serviço por ID'

   controller.findById(req, res);
});

router.put("/alterarServico", (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Altera um serviço'
   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/servicoAlter'
                    }
                }
            }
        }
   */

   controller.updateServico(req, res);
});

router.delete("/deletarServico/:id", (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Deleta um serviço'

   controller.deleteServico(req, res);
});



export default router;
