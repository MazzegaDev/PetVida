import { ICreateUsuarioDTO, ICreateUsuarioADMDTO,IUpdateUsuarioDTO, TUsuarioList } from "../interfaces/usuarioDTO";
import { Usuario } from "../generated/prisma/client";
import UsuarioRepository from "../repositories/usuarioRepository";
import AppError from "../errors/error";

export default class UsuarioService {
   readonly uRepo: UsuarioRepository;

   constructor() {
      this.uRepo = new UsuarioRepository();
   }

   async createUserADM(data: ICreateUsuarioADMDTO): Promise<Usuario> {
      if (
         !data.usu_nome.trim() ||
         !data.usu_email.trim() ||
         !data.usu_senha.trim()
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      data.pap_id = 1;

      const newUser: Usuario = await this.uRepo.createUserADM(data);

      if (!newUser) {
         throw new AppError("Não foi possivel criar o novo usuario", 500);
      }

      return newUser;
   }

   async createUser(data: ICreateUsuarioDTO): Promise<Usuario> {
      if (
         !data.usu_nome.trim() ||
         !data.usu_email.trim() ||
         !data.usu_senha.trim() ||
         !data.usu_tell.trim()
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      data.pap_id = 2;

      const newUser: Usuario = await this.uRepo.createUser(data);

      if (!newUser) {
         throw new AppError("Não foi possivel criar o novo usuario", 500);
      }

      return newUser;
   }

   async listUsers(): Promise<TUsuarioList[]> {
      const list: TUsuarioList[] = await this.uRepo.listUsers();

      if (list.length === 0) {
         throw new AppError("Nenhum usuario para listar", 404);
      }

      return list;
   }

   async updateUser(data: IUpdateUsuarioDTO): Promise<Usuario> {
      if (
         data.usu_nome?.trim() == "" ||
         data.usu_email?.trim() == "" ||
         data.usu_tell?.trim() == "" ||
         data.usu_senha?.trim() == ""
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      const findedUser: TUsuarioList | null = await this.uRepo.findById(
         data.usu_id,
      );

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      const updatedUser: Usuario = await this.uRepo.updateUser(data);

      if (!updatedUser) {
         throw new AppError(
            "Não foi possivel alterar os dados do usuario",
            500,
         );
      }

      return updatedUser;
   }

   async deleteUser(id: number): Promise<Usuario> {
      const findedUser: TUsuarioList | null = await this.uRepo.findById(id);

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      const deletedUser: Usuario = await this.uRepo.deleteUser(id);

      if (!deletedUser) {
         throw new AppError("Não foi possivel deletar o usuario", 500);
      }

      return deletedUser;
   }

   async findById(id: number): Promise<TUsuarioList> {
      const findedUser: TUsuarioList | null = await this.uRepo.findById(id);

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      return findedUser;
   }

   async findByEmail(email: string): Promise<TUsuarioList> {
      const findedUser: TUsuarioList | null =
         await this.uRepo.findByEmail(email);

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      return findedUser;
   }
}
