import { ICreateServicoDTO, IUpdateServicoDTO } from "../interfaces/servicoDTO";
import { Servico } from "../generated/prisma/client";
import { Request, Response } from "express";
import ServicoService from "../services/servicoService";

export default class ServicoController {
   readonly sServ: ServicoService;
   constructor() {
      this.sServ = new ServicoService();
   }

   async createServico(req: Request, res: Response): Promise<Response> {
      try {
         const { ser_nome, ser_preco } = req.body as ICreateServicoDTO;

         const data: ICreateServicoDTO = {
            ser_nome,
            ser_preco,
         };

         const created: Servico = await this.sServ.createServico(data);

         return res
            .status(201)
            .json({ msg: "Novo serviço cadastrado", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }
   async listServico(req: Request, res: Response): Promise<Response> {
      try {
         const list: Servico[] = await this.sServ.listServicos();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }
   async updateServico(req: Request, res: Response): Promise<Response> {
      try {
         const { ser_id, ser_nome, ser_preco } = req.body as IUpdateServicoDTO;

         const data: IUpdateServicoDTO = {
            ser_id,
            ser_nome,
            ser_preco,
         };

         const created: Servico = await this.sServ.updateServico(data);

         return res
            .status(201)
            .json({ msg: "Dados do serviço atualizados", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }
   async deleteServico(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const deleted: Servico = await this.sServ.deleteServico(parsedId);

         return res
            .status(200)
            .json({ msg: "Serviço deletado", data: deleted });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }
   async findById(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const finded: Servico = await this.sServ.findById(parsedId);

         return res.status(201).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }
}
