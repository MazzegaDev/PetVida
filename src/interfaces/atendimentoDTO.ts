import { Prisma } from "../generated/prisma/client";

type Status = "Concluido" | "Pendente" | "Negado";
export interface ICreateAtendimentoDTO {
   ate_data: Date;
   ate_valortotal: number;
   ate_status: Status;
   pet_id: number;
   ser_id: number[];
}

export interface AtendimentoParamsDTO {
   pet_id: number;
   ser_id: number[];
}

export interface IUpdateStatusDTO {
   ate_id: number;
   ate_status: Status;
}

export type IAtendimentoList = Prisma.AtendimentoGetPayload<{
   include: {
      pets: {
         include: {
            especie: true;
            raca: true;
         };
      };
      servico: true;
   };
}>;
