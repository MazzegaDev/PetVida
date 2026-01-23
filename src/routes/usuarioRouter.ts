import { Router } from "express";
import UsuarioController from "../controllers/usuarioController";

const router = Router();
const controller = new UsuarioController();

router.post("/cadastrarUsuario", (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Cadastra um usuario'
   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/usuario'
                    }
                }
            }
        }
   */
   controller.createUser(req, res);
});

router.get("/listarUsuarios", (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Lista todos os usuarios'

   controller.listUsers(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Busca um usuario por ID'
   controller.findById(req, res);
});

router.get("/buscarPorEmail/:email", (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Busca um usuario pro E-mail'
   controller.findByEmail(req, res);
});

router.put("/alterarUsuario", (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Altera um usuario'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/usuarioAlter'
                    }
                }
            }
        }
   */
   controller.updateUser(req, res);
});

router.delete("/deletarUsuario/:id", (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Deleta um usuario'
   controller.deleteUser(req, res);
});

export default router;
