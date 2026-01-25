import {
   ICreateProductDTO,
   IUpdateProductDTO,
   IUpdateStock,
} from "../interfaces/produtoDTO";
import { Produto } from "../generated/prisma/client";
import ProdutoRepository from "../repositories/produtoRepository";
import AppError from "../errors/error";

export default class ProdutoService {
   readonly pRepo;
   constructor() {
      this.pRepo = new ProdutoRepository();
   }

   async newProduct(data: ICreateProductDTO): Promise<Produto> {
      if (!data.prd_nome.trim() || !data.prd_preco || !data.prd_quantidade) {
         throw new AppError("Insira dados validos", 400);
      }

      const createdProduct: Produto = await this.pRepo.createProduct(data);

      if (!createdProduct) {
         throw new AppError("Erro ao cadastrar o produto", 500);
      }

      return createdProduct;
   }

   async listProducts(): Promise<Produto[]> {
      const list: Produto[] = await this.pRepo.listProducts();

      if (list.length === 0) {
         throw new AppError("Nenhum produto para listar", 404);
      }

      return list;
   }

   async updateProduct(data: IUpdateProductDTO): Promise<Produto> {
      const findedProduct: Produto | null = await this.pRepo.findById(
         data.prd_id,
      );

      if (!findedProduct) {
         throw new AppError("Produto não encontrado", 404);
      }

      if (!data.prd_nome?.trim() || !data.prd_preco || !data.prd_quantidade) {
         throw new AppError("Insira dados validos", 404);
      }

      const updatedProduct: Produto = await this.pRepo.updateProduct(data);

      if (!updatedProduct) {
         throw new AppError("Erro ao atualizar dados do produto", 500);
      }

      return updatedProduct;
   }

   async deleteProduct(id: number): Promise<Produto> {
      const findedProduct: Produto | null = await this.pRepo.findById(id);

      if (!findedProduct) {
         throw new AppError("Produto não encontrado", 404);
      }

      const deletedProduct: Produto = await this.pRepo.deleteProduct(id);
      if (!deletedProduct) {
         throw new AppError("Erro ao deletar do produto", 500);
      }
      return deletedProduct;
   }

   async findById(id: number): Promise<Produto> {
      const findedProduct: Produto | null = await this.pRepo.findById(id);

      if (!findedProduct) {
         throw new AppError("Produto não encontrado", 404);
      }

      return findedProduct;
   }

   async updateStock(data: IUpdateStock): Promise<Produto> {
      const id: number = data.prd_id;
      const quantity: number = data.prd_quantidade;

      const findedProduct: Produto | null = await this.pRepo.findById(id);

      if (!findedProduct) {
         throw new AppError(
            "Produto não encontrado para atualizar o estoque",
            404,
         );
      }

      if (quantity <= 0) {
         throw new AppError("Informe a quantidade", 404);
      }

      if (quantity > findedProduct.prd_quantidade) {
         throw new AppError("Estoque insuficiente para a compra", 400);
      }

      const newStock: number = findedProduct.prd_quantidade - quantity;

      const updatedStock: Produto = await this.pRepo.updateStock(id, newStock);

      if (!updatedStock) {
         throw new AppError("Erro ao atualizar estoque do produto", 500);
      }

      return updatedStock;
   }

   async updateStock2(data: IUpdateStock): Promise<Produto> {
      const id: number = data.prd_id;
      const quantity: number = data.prd_quantidade;

      const findedProduct: Produto | null = await this.pRepo.findById(id);

      if (!findedProduct) {
         throw new AppError(
            "Produto não encontrado para atualizar o estoque",
            404,
         );
      }

      if (quantity <= 0) {
         throw new AppError("Informe a quantidade", 404);
      }


      const newStock: number = findedProduct.prd_quantidade + quantity;

      const updatedStock: Produto = await this.pRepo.updateStock(id, newStock);

      if (!updatedStock) {
         throw new AppError("Erro ao atualizar estoque do produto", 500);
      }

      return updatedStock;
   }

   async findLowStock(): Promise<Produto[]> {
      const list: Produto[] = await this.pRepo.findLowStock();

      if (list.length === 0) {
         throw new AppError("Nenhum produto com estoque critico", 404);
      }

      return list;
   }
}
