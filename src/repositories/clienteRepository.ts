import { ICreateClienteDTO, IUpdateClienteDTO } from "../interfaces/clienteDTO";
import { Prisma } from "../database/database";
import { Cliente } from "../generated/prisma/client";

export default class ClienteRepository {
   readonly prisma = Prisma;

   async createClient(data: ICreateClienteDTO): Promise<Cliente> {
      const created: Cliente = await this.prisma.cliente.create({
         data: {
            cli_nome: data.cli_nome,
            cli_email: data.cli_email,
            cli_telefone: data.cli_telefone,
            usuario: {
               connect: { usu_id: data.usu_id },
            },
         },
      });

      return created;
   }

   async listClients(): Promise<Cliente[]> {
      const list: Cliente[] = await this.prisma.cliente.findMany({
         include: {
            pet: {
               include: {
                  raca: true,
                  especie: true,
               },
            },
         },
      });

      return list;
   }

   async updateClient(data: IUpdateClienteDTO): Promise<Cliente> {
      const updated: Cliente = await this.prisma.cliente.update({
         where: { cli_id: data.cli_id },
         data: {
            cli_nome: data.cli_nome,
            cli_email: data.cli_email,
            cli_telefone: data.cli_telefone,
         },
      });

      return updated;
   }

   async deleteClient(id: number): Promise<Cliente> {
      const deleted: Cliente = await this.prisma.cliente.delete({
         where: { cli_id: id },
      });

      return deleted;
   }

   async findById(id: number): Promise<Cliente | null> {
      const findedClient: Cliente | null = await this.prisma.cliente.findUnique(
         {
            where: { cli_id: id },
         },
      );

      return findedClient;
   }

   async findByEmail(email: string): Promise<Cliente | null> {
      const findedClient: Cliente | null = await this.prisma.cliente.findUnique(
         {
            where: { cli_email: email },
         },
      );

      return findedClient;
   }

   async findByUser(id: number): Promise<Cliente | null> {
      return await this.prisma.cliente.findUnique({
         where: { usu_id: id },
         include: {
            pet: {
               include: {
                  raca: true,
                  especie: true,
               },
            },
         },
      });
   }
}
