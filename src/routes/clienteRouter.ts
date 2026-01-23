import { Router } from "express";
import ClienteController from "../controllers/clienteController";

const controller = new ClienteController();
const router = Router();

router.post("/cadastrarCliente", (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Cadastra um cliente'

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

router.get("/listarClientes", (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Lista todos os clientes'

   controller.listClients(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Busca um cliente por seu ID'

   controller.findById(req, res);
});

router.get("/buscarPorEmail/:email", (req, res) => {
   // #swagger.tags = ['Cliente']
   // #swagger.summary = 'Busca um cliente por seu E-mail'

   controller.findByEmail(req, res);
});

router.put("/alterarCliente", (req, res) => {
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

   controller.deleteClient(req, res);
});


export default router;
