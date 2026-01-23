import { Router } from "express";
import PetController from "../controllers/petController";

const router = Router();
const controller = new PetController();

router.post("/cadastrarPet", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Cadastra um pet'

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

router.get("/listarPets", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista todos os pets'

   controller.listPets(req, res);
});
router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id'

   controller.findById(req, res);
});

router.get("/buscarPorIdRaca/:id", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id de raça'

   controller.findByRaca(req, res);
});

router.get("/buscarPorIdEspecie/:id", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id de especie'

   controller.findByEspecie(req, res);
});

router.get("/buscarPorIdCliente/:id", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Lista um pet por seu id de cliente'

   controller.findByClient(req, res);
});

router.put("/alterarPet", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Altera um pet'

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

router.delete("/deletarPet/:id", (req, res) => {
   // #swagger.tags = ['Pet']
   // #swagger.summary = 'Deleta um pet'
   controller.deletePet(req, res);
});

export default router;
