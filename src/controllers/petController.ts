import { ICreatePetDTO, IUpdatePetDTO } from "../interfaces/petDTO";
import { Pets, Raca, Cliente, Especie } from "../generated/prisma/client";
import { Request, Response } from "express";
import PetService from "../services/petService";

export default class PetController {
   readonly pServ: PetService;
   constructor() {
      this.pServ = new PetService();
   }

   async createPet(req: Request, res: Response): Promise<Response> {
      try {
         const { pet_nome, pet_idade, cli_id, esp_id, rac_id } =
            req.body as ICreatePetDTO;

         const data: ICreatePetDTO = {
            pet_nome,
            pet_idade,
            cli_id,
            esp_id,
            rac_id,
         };

         const createdPet: Pets = await this.pServ.createPet(data);

         return res
            .status(201)
            .json({ msg: "Pet criado com sucesso", data: createdPet });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listPets(req: Request, res: Response): Promise<Response> {
      try {
         const list: Pets[] = await this.pServ.listPets();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updatePet(req: Request, res: Response): Promise<Response> {
      try {
         const { pet_id, pet_nome, pet_idade, cli_id, esp_id, rac_id } =
            req.body as IUpdatePetDTO;

         const data: IUpdatePetDTO = {
            pet_id,
            pet_nome,
            pet_idade,
            cli_id,
            esp_id,
            rac_id,
         };

         const updatedPet: Pets = await this.pServ.updatePets(data);

         return res
            .status(200)
            .json({ msg: "Dados do pet atualizados", data: updatedPet });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deletePet(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const deletedPet: Pets = await this.pServ.findById(parsedId);

         return res
            .status(200)
            .json({ msg: "Pet deletado com sucesso", data: deletedPet });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findById(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const finded: Pets = await this.pServ.findById(parsedId);

         return res.status(200).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findByRaca(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const finded: Pets[] = await this.pServ.findByRaca(parsedId);

         return res.status(200).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findByClient(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const finded: Pets[] = await this.pServ.findByClient(parsedId);

         return res.status(200).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findByEspecie(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const finded: Pets[] = await this.pServ.findByEspecie(parsedId);

         return res.status(200).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
