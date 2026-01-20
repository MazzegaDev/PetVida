import {
   ICreateProductDTO,
   IUpdateProductDTO,
   IUpdateStock,
} from "../interfaces/produtoDTO";
import { Produto } from "../generated/prisma/client";
import { Request, Response } from "express";
import ProdutoService from "../services/produtoService";

export default class ProdutoController {
   readonly pServ: ProdutoService;
   constructor() {
      this.pServ = new ProdutoService();
   }

   async newProduct(req: Request, res: Response): Promise<Response> {
      try {
         const { prd_nome, prd_preco, prd_quantidade } =
            req.body as ICreateProductDTO;

         const data: ICreateProductDTO = {
            prd_nome,
            prd_preco,
            prd_quantidade,
         };

         const created: Produto = await this.pServ.newProduct(data);

         return res
            .status(201)
            .json({ msg: "Novo produto cadastrado", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listProducts(req: Request, res: Response): Promise<Response> {
      try {
         const list: Produto[] = await this.pServ.listProducts();

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateProduct(req: Request, res: Response): Promise<Response> {
      try {
         const { prd_id, prd_nome, prd_preco, prd_quantidade } =
            req.body as IUpdateProductDTO;

         const data: IUpdateProductDTO = {
            prd_id,
            prd_nome,
            prd_preco,
            prd_quantidade,
         };

         const updated: Produto = await this.pServ.updateProduct(data);

         return res
            .status(200)
            .json({ msg: "Dados do produto atualizados", data: updated });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteProduct(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId: number = parseInt(id);

         const deleted: Produto = await this.pServ.deleteProduct(parsedId);

         return res
            .status(200)
            .json({ msg: "Produto deletado", data: deleted });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findById(req: Request, res: Response): Promise<Response> {
      try {
         const { id } = req.params;
         const parsedId: number = parseInt(id);

         const finded: Produto = await this.pServ.findById(parsedId);

         return res.status(200).json(finded);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateStock(req: Request, res: Response): Promise<Response> {
      try {
         const { prd_id, prd_quantidade } = req.body as IUpdateStock;

         const data: IUpdateStock = {
            prd_id,
            prd_quantidade,
         };

         const newStock: Produto = await this.pServ.updateStock(data);

         return res
            .status(200)
            .json({ msg: "Estoque alterado nova quantidade", data: newStock });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
