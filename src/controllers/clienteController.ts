import { ICreateClienteDTO, IUpdateClienteDTO } from "../interfaces/clienteDTO";
import { Request, Response } from "express";
import { Cliente } from "../generated/prisma/client";
import ClienteService from "../services/clienteService";

export default class ClienteController {
   readonly cServ: ClienteService;
   constructor() {
      this.cServ = new ClienteService();
   }

   async createCliente(req: Request, res: Response): Promise<Response> {
      try {
         const { cli_nome, cli_email, cli_telefone } =
            req.body as ICreateClienteDTO;

         const data: ICreateClienteDTO = {
            cli_nome,
            cli_email,
            cli_telefone,
         };

         const createdClient: Cliente = await this.cServ.createCliente(data);

         return res
            .status(201)
            .json({ msg: "Novo cliente cadastrado", data: createdClient });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listClients(req: Request, res: Response): Promise<Response> {
      try {
         const list: Cliente[] = await this.cServ.listClients();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateClient(req: Request, res: Response): Promise<Response> {
      try {
         const {cli_id, cli_email, cli_nome, cli_telefone} = req.body as IUpdateClienteDTO;
         
         const data: IUpdateClienteDTO = {
            cli_id,
            cli_email,
            cli_nome,
            cli_telefone,
         }

         const updatedClient: Cliente = await this.cServ.updateClient(data);

         return res.status(200).json({msg: "Dados do cliente atualizados", data: updatedClient});

      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteClient(req: Request, res: Response): Promise<Response> {
      try {
         const {id} = req.params;
         const parsedId: number = parseInt(id);

         const deletedClient: Cliente = await this.cServ.deleteClient(parsedId);

         return res.status(200).json({msg: "Cliente deletado", data: deletedClient});

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

         const findedClient: Cliente = await this.cServ.findById(parsedId);

         return res.status(200).json(findedClient);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findByEmail(req: Request, res: Response): Promise<Response> {
      try {
         const { email } = req.params;

         const findedClient: Cliente = await this.cServ.findByEmail(email);

         return res.status(200).json(findedClient);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
