import { Request, Response } from "express";
import AuthService from "../services/authService";
import { ILoginDTO } from "../interfaces/loginDTO";
import AppError from "../errors/error";

export default class AuthController {
   readonly authServ: AuthService;
   constructor() {
      this.authServ = new AuthService();
   }

   async returnCurrentUser(req: Request, res: Response): Promise<Response> {
      try {
         if (!req.user) {
            throw new AppError("Nenhum usuario logado no momento", 404);
         }
         return res.status(200).json(req.user);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async login(req: Request, res: Response): Promise<Response> {
      try {
         const { usu_email, usu_senha } = req.body as ILoginDTO;

         const dataLogin: ILoginDTO = {
            usu_email,
            usu_senha,
         };

         const data = await this.authServ.login(dataLogin);
         const token = data.token;

         res.cookie(process.env.COOKIE_NAME!, token, {
            httpOnly: true,
         });
         return res.status(200).json(data);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   logout(req: Request, res: Response) {
      res.clearCookie(process.env.COOKIE_NAME!);
      return res.status(204).send();
   }
}
