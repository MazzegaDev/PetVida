import { Router } from "express";
import PetController from "../controllers/petController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";

const router = Router();
const controller = new PetController();

router.post("/cadastrarPet", validateAuth, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Cadastra um pet'
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
                        $ref: '#/components/schemas/pet'
                    }
                }
            }
        }
   */
   controller.createPet(req, res);
});

router.get("/listarPets", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista todos os pets'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listPets(req, res);
});
router.get("/buscarPorId/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.get("/buscarPorIdRaca/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id de raça'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findByRaca(req, res);
});

router.get("/buscarPorIdEspecie/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id de especie'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findByEspecie(req, res);
});

router.get("/buscarPorIdCliente/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id de cliente'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findByClient(req, res);
});

router.put("/alterarPet", validateAuthAdm,(req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Altera um pet'
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
                        $ref: '#/components/schemas/petAlter'
                    }
                }
            }
        }
   */

   controller.updatePet(req, res);
});

router.delete("/deletarPet/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Deleta um pet'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deletePet(req, res);
});

export default router;
