export interface ICreateProductDTO{
   prd_nome: string;
   prd_quantidade: number;
   prd_preco: number;
}

export interface IUpdateProductDTO{
   prd_id: number;
   prd_nome?: string;
   prd_quantidade?: number;
   prd_preco?: number;
}

export interface IUpdateStock{
   prd_id: number;
   prd_quantidade: number;
}