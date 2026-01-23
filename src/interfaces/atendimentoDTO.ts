type Status = "Concluido" | "Pendente" | "Negado";

export interface ICreateAtendimentoDTO {
   ate_data: Date;
   ate_valortotal: number;
   ate_status: Status
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