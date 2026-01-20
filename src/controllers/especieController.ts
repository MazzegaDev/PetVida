import { ICreateEspecieDTO, IUpdateEspecieDTO } from "../interfaces/especieDTO";
import { Especie } from "../generated/prisma/client";
import EspecieService from "../services/especieService";
import { Request, Response } from "express";

export default class EspecieController {
   readonly eServ: EspecieService;

   constructor() {
      this.eServ = new EspecieService();
   }

   async createEspecie(req: Request, res: Response): Promise<Response> {
      try {
         const { esp_nome } = req.body as ICreateEspecieDTO;

         const data: ICreateEspecieDTO = {
            esp_nome,
         };

         const createdEspecie: Especie = await this.eServ.createEspecie(data);

         return res
            .status(201)
            .json({ msg: "Nova especie cadastrada", data: createdEspecie });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listEspecies(req: Request, res: Response): Promise<Response> {
      try {
         const list: Especie[] = await this.eServ.listEspecies();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateEspecie(req: Request, res: Response): Promise<Response> {
      try {
         const { esp_id, esp_nome } = req.body as IUpdateEspecieDTO;

         const data: IUpdateEspecieDTO = {
            esp_id,
            esp_nome,
         };

         const updatedEspecie: IUpdateEspecieDTO =
            await this.eServ.updateEspecies(data);

         return res.status(200).json({
            msg: "Dados da especie atualizados",
            data: updatedEspecie,
         });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteEspecie(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const deletedEspecie: Especie =
            await this.eServ.deleteEspecie(parsedId);

         return res
            .status(200)
            .json({ msg: "Especie deletada", data: deletedEspecie });
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
         const {id} = req.params;
         const parsedId = parseInt(id);

         const findedEspecie: Especie | null = await this.eServ.findById(parsedId);

         return res.status(200).json({msg: "Especie encontrada", data: findedEspecie});

      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
