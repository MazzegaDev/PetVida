export interface ICreateClienteDTO{
   cli_nome: string;
   cli_telefone: string;
   cli_email: string;
   usu_id: number;
}

export interface IUpdateClienteDTO{
   cli_id: number;
   cli_nome?: string;
   cli_telefone?: string;
   usu_id?: number;
   cli_email?: string;
}