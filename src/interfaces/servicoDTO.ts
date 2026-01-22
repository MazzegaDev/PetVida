export interface ICreateServicoDTO {
   ser_nome: string;
   ser_preco: number;
}

export interface IUpdateServicoDTO {
   ser_id: number;
   ser_nome?: string;
   ser_preco?: number;
}
