import { Prisma } from "../database/database";
import { Servico } from "../generated/prisma/client";
import { ICreateServicoDTO, IUpdateServicoDTO } from "../interfaces/servicoDTO";

export default class ServicoRepository {
   readonly prisma = Prisma;

   async createServico(data: ICreateServicoDTO): Promise<Servico> {
      return await this.prisma.servico.create({
         data: {
            ser_nome: data.ser_nome,
            ser_preco: data.ser_preco,
         },
      });
   }

   async listServicos(): Promise<Servico[]> {
      return await this.prisma.servico.findMany();
   }

   async updateServico(data: IUpdateServicoDTO): Promise<Servico> {
      return await this.prisma.servico.update({
         where: { ser_id: data.ser_id },
         data: {
            ser_nome: data.ser_nome,
            ser_preco: data.ser_preco,
         },
      });
   }

   async deleteServico(id: number): Promise<Servico>{
      return await this.prisma.servico.delete({
         where: {ser_id: id}
      })
   }

   async findById(id: number): Promise<Servico | null>{
      return await this.prisma.servico.findUnique({
         where: {ser_id: id}
      })
   }
}
