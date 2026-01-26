import { ICreatePetDTO, IUpdatePetDTO,TPetList } from "../interfaces/petDTO";
import { Prisma } from "../database/database";
import { Pets, Cliente, Raca, Especie } from "../generated/prisma/client";

export default class PetRepository {
   readonly prisma = Prisma;

   async createPet(data: ICreatePetDTO): Promise<Pets> {
      return await this.prisma.pets.create({
         data: {
            pet_nome: data.pet_nome,
            pet_idade: data.pet_idade,
            cliente: {
               connect: { cli_id: data.cli_id },
            },
            especie: {
               connect: { esp_id: data.esp_id },
            },
            raca: {
               connect: { rac_id: data.rac_id },
            },
         },
      });
   }

   async listPets(): Promise<TPetList[]> {
      return this.prisma.pets.findMany({
         include: {
            cliente: true,
            raca: true,
            especie: true,
         },
      });
   }

   async updatePet(data: IUpdatePetDTO): Promise<Pets> {
      return await this.prisma.pets.update({
         where: {
            pet_id: data.pet_id,
         },
         data: {
            pet_nome: data.pet_nome,
            pet_idade: data.pet_idade,
            cliente: {
               connect: { cli_id: data.cli_id },
            },
            especie: {
               connect: { esp_id: data.esp_id },
            },
            raca: {
               connect: { rac_id: data.rac_id },
            },
         },
      });
   }

   async deletePet(id: number): Promise<Pets> {
      return await this.prisma.pets.delete({
         where: {
            pet_id: id,
         },
      });
   }

   async findByRaca(id: number): Promise<TPetList[]> {
      return await this.prisma.pets.findMany({
         where: { rac_id: id },
         include: {
            cliente: true,
            raca: true,
            especie: true,
         },
      });
   }

   async findByEspecie(id: number): Promise<TPetList[]> {
      return await this.prisma.pets.findMany({
         where: { esp_id: id },
         include: {
            cliente: true,
            raca: true,
            especie: true,
         },
      });
   }

   async findByClient(id: number): Promise<TPetList[]> {
      return await this.prisma.pets.findMany({
         where: { cli_id: id },
         include: {
            cliente: true,
            raca: true,
            especie: true,
         },
      });
   }

   async findById(id: number): Promise<TPetList | null> {
      return await this.prisma.pets.findUnique({
         where: {
            pet_id: id,
         },
         include: {
            cliente: true,
            raca: true,
            especie: true,
         },
      });
   }
}
