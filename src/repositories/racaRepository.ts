import { ICreateRacaDTO, IUpdateRacaDTO } from "../interfaces/racaDTO";
import { Prisma } from "../database/database";
import { Raca } from "../generated/prisma/client";


export default class RacaRepository {
   readonly prisma = Prisma;

   async createRaca(data: ICreateRacaDTO): Promise<Raca> {
      return await this.prisma.raca.create({
         data: {
            rac_nome: data.rac_nome,
         },
      });
   }

   async listRacas(): Promise<Raca[]> {
      return await this.prisma.raca.findMany();
   }

   async updateRaca(data: IUpdateRacaDTO): Promise<Raca> {
      return await this.prisma.raca.update({
         where: { rac_id: data.rac_id },
         data: {
            rac_nome: data.rac_nome,
         },
      });
   }

   async deleteRaca(id: number): Promise<Raca> {
      return await this.prisma.raca.delete({
         where: { rac_id: id },
      });
   }

   async findById(id: number): Promise<Raca | null> {
      return await this.prisma.raca.findUnique({
         where: { rac_id: id },
      }) 
   }
}
