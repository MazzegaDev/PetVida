import { Request, Response } from "express";
import { ICreateUsuarioDTO, ICreateUsuarioADMDTO,IUpdateUsuarioDTO,TUsuarioList } from "../interfaces/usuarioDTO";
import UsuarioService from "../services/usuarioService";
import { Usuario } from "../generated/prisma/client";

export default class UsuarioController {
   readonly uServ: UsuarioService;
   constructor() {
      this.uServ = new UsuarioService();
   }

   async createUserADM(req: Request, res: Response): Promise<Response> {
      try {
         const { usu_nome, usu_email, usu_senha,  } =
            req.body as ICreateUsuarioADMDTO;
         const newUser: ICreateUsuarioADMDTO = {
            usu_nome,
            usu_email,
            usu_senha,

         };

         const createdUser: Usuario = await this.uServ.createUserADM(newUser);

         return res
            .status(201)
            .json({ msg: "Usuario criado!", data: createdUser });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }

   async createUser(req: Request, res: Response): Promise<Response> {
      try {
         const { usu_nome, usu_email, usu_senha, usu_tell } =
            req.body as ICreateUsuarioDTO;
         const newUser: ICreateUsuarioDTO = {
            usu_nome,
            usu_email,
            usu_senha,
            usu_tell,
         };

         const createdUser: Usuario = await this.uServ.createUser(newUser);

         return res
            .status(201)
            .json({ msg: "Usuario criado!", data: createdUser });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno " });
      }
   }

   async listUsers(req: Request, res: Response): Promise<Response> {
      try {
         const list: TUsuarioList[] = await this.uServ.listUsers();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateUser(req: Request, res: Response): Promise<Response> {
      try {
         const { usu_id, usu_nome, usu_email, usu_senha, usu_tell, pap_id } =
            req.body as IUpdateUsuarioDTO;
         const updatedUser: IUpdateUsuarioDTO = {
            usu_id,
            usu_nome,
            usu_email,
            usu_senha,
            usu_tell,
            pap_id,
         };

         const updated: Usuario = await this.uServ.updateUser(updatedUser);

         return res
            .status(200)
            .json({ msg: "Dados do usuario atualizado!", data: updated });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteUser(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const deletedUser: Usuario = await this.uServ.deleteUser(parsedId);

         return res
            .status(200)
            .json({ msg: "Usuario deletado!", data: deletedUser });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }
         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findById(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId = parseInt(id);

         const findedUser: TUsuarioList = await this.uServ.findById(parsedId);

         return res.status(200).json(findedUser);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findByEmail(req: Request, res: Response): Promise<Response> {
      try {
         const { email } = req.params;

         const findedUser: TUsuarioList = await this.uServ.findByEmail(email);

         return res.status(200).json(findedUser);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json({ msg: error.message });
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
