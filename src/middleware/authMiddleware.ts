import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { IAuthPayload } from "../interfaces/loginDTO";

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
         pap_id: payload.pap_id,
      };

      next();
   } catch (error) {
      return res.status(401).json({ msg: "Token invalido ou expirado" });
   }
}
