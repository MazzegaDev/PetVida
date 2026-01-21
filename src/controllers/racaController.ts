import { ICreateRacaDTO, IUpdateRacaDTO } from "../interfaces/racaDTO";
import { Raca } from "../generated/prisma/client";
import { Request, Response } from "express";
import AppError from "../errors/error";
import RacaService from "../services/racaService";

export default class RacaController {
   readonly rServ: RacaService;
   constructor() {
      this.rServ = new RacaService();
   }

   async createRaca(req: Request, res: Response): Promise<Response> {
      try {
         const { rac_nome } = req.body as ICreateRacaDTO;

         const data: ICreateRacaDTO = {
            rac_nome,
         };

         const createdRaca: Raca = await this.rServ.createRaca(data);

         return res
            .status(201)
            .json({ msg: "Raça cadastrada", data: createdRaca });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listRacas(req: Request, res: Response): Promise<Response> {
      try {
         const list: Raca[] = await this.rServ.listRacas();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateRacas(req: Request, res: Response): Promise<Response> {
      try {
         const { rac_id, rac_nome } = req.body as IUpdateRacaDTO;

         const data: IUpdateRacaDTO = {
            rac_id,
            rac_nome,
         };

         const updatedRaca: Raca = await this.rServ.updateRaca(data);

         return res
            .status(200)
            .json({ msg: "Dados da raça atualizados", data: updatedRaca });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteRaca(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId: number = parseInt(id);

         const deletedRace: Raca = await this.rServ.deleteRaca(parsedId);

         return res
            .status(200)
            .json({ msg: "Raça deletada", data: deletedRace });
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
         const parsedId: number = parseInt(id);

         const findedRace: Raca = await this.rServ.findById(parsedId);

         return res
            .status(200)
            .json(findedRace);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
