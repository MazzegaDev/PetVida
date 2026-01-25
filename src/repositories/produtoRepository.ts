import { ICreateProductDTO, IUpdateProductDTO } from "../interfaces/produtoDTO";
import { Produto } from "../generated/prisma/client";
import { Prisma } from "../database/database";

export default class ProdutoRepository {
   readonly prisma = Prisma;

   async createProduct(data: ICreateProductDTO): Promise<Produto> {
      const createdProduct: Produto = await this.prisma.produto.create({
         data: {
            prd_nome: data.prd_nome,
            prd_quantidade: data.prd_quantidade,
            prd_preco: data.prd_preco,
         },
      });
      return createdProduct;
   }

   async listProducts(): Promise<Produto[]> {
      const list: Produto[] = await this.prisma.produto.findMany();

      return list;
   }

   async updateProduct(data: IUpdateProductDTO): Promise<Produto> {
      const updatedProduct: Produto = await this.prisma.produto.update({
         where: { prd_id: data.prd_id },
         data: {
            prd_id: data.prd_id,
            prd_nome: data.prd_nome,
            prd_quantidade: data.prd_quantidade,
            prd_preco: data.prd_quantidade,
         },
      });

      return updatedProduct;
   }

   async deleteProduct(id: number): Promise<Produto> {
      const deletedProduct: Produto = await this.prisma.produto.delete({
         where: { prd_id: id },
      });

      return deletedProduct;
   }

   async findById(id: number): Promise<Produto | null> {
      const findedProduct: Produto | null =
         await this.prisma.produto.findUnique({
            where: { prd_id: id },
         });

      return findedProduct;
   }

   async updateStock(id: number, quantity: number): Promise<Produto> {
      const updatedStock: Produto = await this.prisma.produto.update({
         where: { prd_id: id },
         data: {
            prd_quantidade: quantity,
         },
      });

      return updatedStock;
   }

   
   async findLowStock(): Promise<Produto[]> {
      return await this.prisma.produto.findMany({
         where: {
            prd_quantidade: {
               lte: 5,
            },
         },
      });
   }
}
