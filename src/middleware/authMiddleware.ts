import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { IAuthPayload } from "../interfaces/loginDTO";
import PapelRepository from "../repositories/papelRepository";

export function validateAuth(
   req: Request,
   res: Response,
   next: NextFunction,
): Response | undefined {
   const token = req.cookies[process.env.COOKIE_NAME!];

   if (!token) {
      return res.status(401).json({ msg: "Token não encontrado" });
   }

   try {
      const payload: IAuthPayload = verifyToken(token);

      req.user = {
         usu_id: payload.usu_id,
         usu_email: payload.usu_email,
         usu_nome: payload.usu_nome,
         user_role: payload.user_role,
         pap_id: payload.pap_id,
      };

      next();
   } catch (error) {
      return res.status(401).json({ msg: "Token invalido ou expirado" });
   }
}

export async function validateAuthAdm(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<Response | undefined> {
   const token = req.cookies[process.env.COOKIE_NAME!];

   if (!token) {
      return res.status(401).json({ msg: "Token não encontrado" });
   }

   try {
      const payload: IAuthPayload = verifyToken(token);

      req.user = {
         usu_id: payload.usu_id,
         usu_email: payload.usu_email,
         usu_nome: payload.usu_nome,
         user_role: payload.user_role,
         pap_id: payload.pap_id,
      };

      if (payload.user_role != "adm") {
         return res.status(401).json({ msg: "Acesso restrito" });
      }

      next();
   } catch (error) {
      return res.status(401).json({ msg: "Token invalido ou expirado" });
   }
}
