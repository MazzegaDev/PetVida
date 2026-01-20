import { Prisma } from "../database/database";
import { Especie } from "../generated/prisma/client";
import { ICreateEspecieDTO, IUpdateEspecieDTO } from "../interfaces/especieDTO";

export default class EspecieRepository {
   readonly prisma = Prisma;

   async createEspecie(data: ICreateEspecieDTO): Promise<Especie> {
      return await this.prisma.especie.create({
         data: {
            esp_nome: data.esp_nome,
         },
      });
   }

   async listEspecies(): Promise<Especie[]> {
      return await this.prisma.especie.findMany();
   }

   async updateEspecie(data: IUpdateEspecieDTO): Promise<Especie> {
      return await this.prisma.especie.update({
         where: { esp_id: data.esp_id },
         data: {
            esp_nome: data.esp_nome,
         },
      });
   }

   async deleteEspecie(id: number): Promise<Especie> {
      return await this.prisma.especie.delete({
         where: { esp_id: id },
      });
   }

   async findById(id: number): Promise<Especie | null> {
      return await this.prisma.especie.findUnique({
         where: { esp_id: id },
      });
   }
}
