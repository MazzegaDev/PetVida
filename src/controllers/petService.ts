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
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
