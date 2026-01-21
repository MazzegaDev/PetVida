import { Usuario } from "../generated/prisma/client";
import { Prisma } from "../database/database";
import { ICreateUsuarioDTO, IUpdateUsuarioDTO } from "../interfaces/usuarioDTO";

export default class UsuarioRepository {
   readonly prisma = Prisma;

   async createUser(data: ICreateUsuarioDTO): Promise<Usuario> {
      const created: Usuario = await this.prisma.usuario.create({
         data: {
            usu_nome: data.usu_nome,
            usu_email: data.usu_email,
            usu_senha: data.usu_senha,
            pap_id: data.pap_id,
         },
      });

      return created;
   }

   async listUsers(): Promise<Usuario[]> {
      const list: Usuario[] = await this.prisma.usuario.findMany({
         include:{
            papel: true,
         }
      });

      return list;
   }

   async updateUser(data: IUpdateUsuarioDTO): Promise<Usuario> {
      const updatedUser: Usuario = await this.prisma.usuario.update({
         where: { usu_id: data.usu_id },
         data: {
            usu_nome: data.usu_nome,
            usu_email: data.usu_email,
            usu_senha: data.usu_senha,
            pap_id: data.pap_id,
         },
      });
      return updatedUser;
   }

   async deleteUser(usu_id: number): Promise<Usuario> {
      const deletedUser: Usuario = await this.prisma.usuario.delete({
         where: { usu_id },
      });

      return deletedUser;
   }

   async findById(usu_id: number): Promise<Usuario | null> {
      const findedUser: Usuario | null = await this.prisma.usuario.findUnique({
         where: { usu_id },
         include: {
            papel: true
         }
      });

      return findedUser;
   }

   async findByEmail(usu_email: string): Promise<Usuario | null> {
      const findedUser: Usuario | null = await this.prisma.usuario.findUnique({
         where: { usu_email },
         include: {
            papel: true,
         },
      });

      return findedUser;
   }

   async validateUser(
      usu_email: string,
      usu_senha: string
   ): Promise<Usuario | null> {
      const user: Usuario | null = await this.prisma.usuario.findUnique({
         where: { usu_email },
      });

      if (!user) {
         return null;
      }

      if (user.usu_senha !== usu_senha) {
         return null;
      }

      return user;
   }
}
