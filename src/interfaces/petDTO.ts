import { Prisma } from "../generated/prisma/client";

export interface ICreatePetDTO {
   pet_nome: string;
   pet_idade: number;
   cli_id: number;
   esp_id: number;
   rac_id: number;
}

export interface IUpdatePetDTO {
   pet_id: number;
   pet_nome?: string;
   pet_idade?: number;
   cli_id?: number;
   esp_id?: number;
   rac_id?: number;
}


export type TPetList = Prisma.PetsGetPayload<{
   include: {
      cliente: true,
      especie: true,
      raca: true
   }
}>