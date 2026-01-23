import { ICreateAtendimentoDTO, IUpdateStatusDTO } from "../interfaces/atendimentoDTO";
import { Prisma } from "../database/database";
import { Atendimento } from "../generated/prisma/client";

export default class AtendimentoRepository {
   readonly prisma = Prisma;

   async createAtendimento(data: ICreateAtendimentoDTO): Promise<Atendimento> {
      return await this.prisma.atendimento.create({
         data: {
            ate_data: data.ate_data,
            ate_valortotal: data.ate_valortotal,
            ate_status: data.ate_status,
            ser_id: data.ser_id,
            pet_id: data.pet_id,
         },
      });
   }

   async listAtendimento(): Promise<Atendimento[]> {
      return await this.prisma.atendimento.findMany({
         include: {
            pets: true,
            servico: true,
         },
      });
   }

   async findById(id: number): Promise<Atendimento | null> {
      return await this.prisma.atendimento.findUnique({
         where: {
            ate_id: id,
         },
         include: {
            pets: true,
            servico: true,
         },
      });
   }

   async changeStatus(data: IUpdateStatusDTO): Promise<Atendimento>{
      return await this.prisma.atendimento.update({
         where: {ate_id: data.ate_id},
         data:{
            ate_status: data.ate_status
         }
      })
   }
}
