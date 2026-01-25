import AppError from "../errors/error";
import { Papel, Usuario } from "../generated/prisma/client";
import { ILoginDTO, IPayloadDTO } from "../interfaces/loginDTO";
import UsuarioRepository from "../repositories/usuarioRepository";
import PapelRepository from "../repositories/papelRepository";
import { jwtSingIn } from "../utils/jwt";

export default class AuthService {
   readonly uRepo: UsuarioRepository;
   readonly pRepo: PapelRepository;
   constructor() {
      this.uRepo = new UsuarioRepository();
      this.pRepo = new PapelRepository();
   }

   async login(data: ILoginDTO): Promise<IPayloadDTO> {
      const findedUser: Usuario | null = await this.uRepo.findByEmail(
         data.usu_email,
      );

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      const userRoler: Papel | null = await this.pRepo.findById(findedUser.pap_id);

      if(!userRoler){
         throw new AppError("Papel não encontrado", 404);
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
         user_role: userRoler.pap_tipo,
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
