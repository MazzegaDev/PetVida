import { JwtPayload } from "jsonwebtoken";

export interface ILoginDTO{
   usu_email: string;
   usu_senha: string;
}

export interface IPayloadDTO{
   usu_id: number;
   usu_nome: string;
   usu_email: string;
   pap_id: number;
   token: string,
}

export interface IAuthPayload extends JwtPayload {
   usu_id: number;
   usu_nome: string;
   usu_email: string;
   pap_id: number;
}