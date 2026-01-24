import "express";

declare module "express-serve-static-core" {
   interface Request {
      user?: {
         usu_id: number;
         usu_nome: string;
         usu_email: string;
         pap_id: number;
      };
   }
}
