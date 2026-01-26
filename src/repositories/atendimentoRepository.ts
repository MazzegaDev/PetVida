import {
   ICreateAtendimentoDTO,
   IUpdateStatusDTO,
   IAtendimentoList,
} from "../interfaces/atendimentoDTO";
import { Prisma } from "../database/database";
import { Atendimento } from "../generated/prisma/client";

export default class AtendimentoRepository {
   readonly prisma = Prisma;

   async createAtendimento(data: ICreateAtendimentoDTO) {
      return await this.prisma.atendimento.create({
         data: {
            ate_data: data.ate_data,
            ate_valortotal: data.ate_valortotal,
            ate_status: data.ate_status,
            pet_id: data.pet_id,
            servico: {
               create: data.ser_id.map((id) => ({
                  ser_id: id,
               })),
            },
         },
         include: {
            servico: {
               include: {
                  servico: true,
               },
            },
         },
      });
   }

   async listAtendimento(): Promise<IAtendimentoList[]> {
      return await this.prisma.atendimento.findMany({
         include: {
            pets: {
               include: {
                  especie: true,
                  raca: true,
               },
            },
            servico: true,
         },
      });
   }

   async findById(id: number): Promise<IAtendimentoList | null> {
      return await this.prisma.atendimento.findUnique({
         where: {
            ate_id: id,
         },
         include: {
            pets: {
               include: {
                  especie: true,
                  raca: true,
               },
            },
            servico: true,
         },
      });
   }

   async changeStatus(data: IUpdateStatusDTO): Promise<Atendimento> {
      return await this.prisma.atendimento.update({
         where: { ate_id: data.ate_id },
         data: {
            ate_status: data.ate_status,
         },
      });
   }
}
