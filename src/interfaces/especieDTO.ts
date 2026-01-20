export interface ICreateEspecieDTO {
   esp_nome: string;
}

export interface IUpdateEspecieDTO {
   esp_id: number;
   esp_nome?: string;
}
