import { Prisma } from "../generated/prisma/client";
export interface ICreateUsuarioDTO {
   usu_nome: string;
   usu_email: string;
   usu_senha: string;
   usu_tell: string;
   pap_id?: number;
}

export interface ICreateUsuarioADMDTO {
   usu_nome: string;
   usu_email: string;
   usu_senha: string;
   pap_id?: number;
}

export interface IUpdateUsuarioDTO {
   usu_id: number;
   usu_nome?: string;
   usu_email?: string;
   usu_senha?: string;
   usu_tell?: string;
   pap_id?: number;
}

export type TUsuarioList = Prisma.UsuarioGetPayload<{
   include: {
      papel: true;
      cliente: {
         include: {
            pet: true;
         };
      };
   };
}>;
