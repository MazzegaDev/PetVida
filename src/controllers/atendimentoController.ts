import { Request, Response } from "express";
import { Atendimento } from "../generated/prisma/client";
import AtendimentoService from "../services/atendimentoService";
import {
   ICreateAtendimentoDTO,
   AtendimentoParamsDTO,
   IUpdateStatusDTO,
   IAtendimentoList,
} from "../interfaces/atendimentoDTO";

export default class AtendimentoController {
   readonly aServ: AtendimentoService;
   constructor() {
      this.aServ = new AtendimentoService();
   }

   async createAtendimento(req: Request, res: Response): Promise<Response> {
      try {
         const { pet_id, ser_id } = req.body as AtendimentoParamsDTO;

         const data: AtendimentoParamsDTO = {
            pet_id,
            ser_id,
         };

         const created: Atendimento = await this.aServ.createAtendimento(data);

         return res
            .status(201)
            .json({ msg: "Novo atendimento gerado!", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listAtendimento(req: Request, res: Response): Promise<Response> {
      try {
         const list: IAtendimentoList[] = await this.aServ.listAtendimentos();

         return res.status(200).json(list);
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

         const finded: IAtendimentoList = await this.aServ.findById(parsedId);

         return res.status(200).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async changeStatus(req: Request, res: Response): Promise<Response> {
      try {
         const { ate_id, ate_status } = req.body as IUpdateStatusDTO;

         const data: IUpdateStatusDTO = {
            ate_id,
            ate_status,
         };

         const previous: Atendimento | null = await this.aServ.findById(ate_id);

         const updated: Atendimento = await this.aServ.changeStatus(data);

         return res
            .status(200)
            .json({
               msg: `Status do atendimento alterado: de ${previous.ate_status} para ${updated.ate_status}`,
               data: updated,
            });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
