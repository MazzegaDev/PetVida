import { Router } from "express";
import ClienteController from "../controllers/clienteController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";

const controller = new ClienteController();
const router = Router();

router.post("/cadastrarCliente", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Cadastra um cliente'
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
                        $ref: '#/components/schemas/cliente'
                    }
                }
            }
        }
   */

   controller.createCliente(req, res);
});

router.get("/listarClientes", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Lista todos os clientes'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listClients(req, res);
});

router.get("/buscarPorId/:id", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Busca um cliente por seu ID'

   controller.findById(req, res);
});

router.get("/buscarPorEmail/:email", (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Busca um cliente por seu E-mail'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findByEmail(req, res);
});

router.put("/alterarCliente", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Altera um cliente'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/clienteAlter'
                    }
                }
            }
        }
   */
   controller.updateClient(req, res);
});

router.delete("/deletarCliente/:id", (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Deleta um cliente'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deleteClient(req, res);
});

export default router;
