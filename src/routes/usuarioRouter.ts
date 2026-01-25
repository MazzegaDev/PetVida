import { Router } from "express";
import UsuarioController from "../controllers/usuarioController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";

const router = Router();
const controller = new UsuarioController();

router.post("/cadastrarUsuario", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Cadastra um usuario com privilegios de adm'
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
                        $ref: '#/components/schemas/usuario'
                    }
                }
            }
        }
   */
   controller.createUserADM(req, res);
});


router.get("/listarUsuarios", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Lista todos os usuarios'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listUsers(req, res);
});

router.get("/buscarPorId/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Busca um usuario por ID'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.get("/buscarPorEmail/:email", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Busca um usuario pro E-mail'

   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findByEmail(req, res);
});

router.put("/alterarUsuario", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Altera um usuario'
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
                        $ref: '#/components/schemas/usuarioAlter'
                    }
                }
            }
        }
   */
   controller.updateUser(req, res);
});

router.delete("/deletarUsuario/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Usuario']
   // #swagger.summary = 'Deleta um usuario'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deleteUser(req, res);
});

export default router;
