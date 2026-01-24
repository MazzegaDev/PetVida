import AppError from "../errors/error";
import { Usuario } from "../generated/prisma/client";
import { ILoginDTO, IPayloadDTO } from "../interfaces/loginDTO";
import UsuarioRepository from "../repositories/usuarioRepository";
import { jwtSingIn } from "../utils/jwt";

export default class AuthService {
   readonly uRepo: UsuarioRepository;
   constructor() {
      this.uRepo = new UsuarioRepository();
   }

   async login(data: ILoginDTO): Promise<IPayloadDTO> {
      const findedUser: Usuario | null = await this.uRepo.findByEmail(
         data.usu_email,
      );

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      const givenPass: string = data.usu_senha;
      const oldPass: string = findedUser.usu_senha;

      if (givenPass != oldPass) {
         throw new AppError("Senha invalida", 400);
      }

      const token = jwtSingIn({
         usu_id: findedUser.usu_id,
         usu_nome: findedUser.usu_nome,
         usu_email: findedUser.usu_email,
         pap_id: findedUser.pap_id,
      });

      const payload: IPayloadDTO = {
         usu_id: findedUser.usu_id,
         usu_nome: findedUser.usu_nome,
         usu_email: findedUser.usu_email,
         pap_id: findedUser.pap_id,
         token: token,
      };

      return payload;
   }
}
