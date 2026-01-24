import { Router } from "express";
import ServicoController from "../controllers/servicoController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";
const controller = new ServicoController();
const router = Router();

router.post("/cadastrarServico", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Cadastra um serviço'
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
                        $ref: '#/components/schemas/servico'
                    }
                }
            }
        }
   */

   controller.createServico(req, res);
});

router.get("/listarServicos", validateAuth, (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Lista todos os serviços'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listServico(req, res);
});

router.get("/buscarPorId/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Busca um serviço por ID'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.put("/alterarServico", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Altera um serviço'
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
                        $ref: '#/components/schemas/servicoAlter'
                    }
                }
            }
        }
   */

   controller.updateServico(req, res);
});

router.delete("/deletarServico/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Serviço']
   // #swagger.summary = 'Deleta um serviço'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deleteServico(req, res);
});



export default router;
