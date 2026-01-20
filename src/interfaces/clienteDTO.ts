export interface ICreateClienteDTO{
   cli_nome: string;
   cli_telefone: string;
   cli_email: string;
}

export interface IUpdateClienteDTO{
   cli_id: number;
   cli_nome?: string;
   cli_telefone?: string;
   cli_email?: string;
}