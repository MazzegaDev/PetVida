import { Router } from "express";
import ProdutoController from "../controllers/produtoController";

const router = Router();
const controller = new ProdutoController();

router.post("/cadastrarProduto", (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Cadastra um produto'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/produto'
                    }
                }
            }
        }
   */
   controller.newProduct(req, res);
});

router.get("/listarProdutos", (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Lista todos os produtos'
   controller.listProducts(req, res);
});

router.get("/buscarPorId/:id", (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Busca um produto pelo ID'
   controller.findById(req, res);
});

router.put("/alterarProduto", (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Altera um produto'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/produtoAlter'
                    }
                }
            }
        }
   */
   controller.updateProduct(req, res);
});

router.patch("/baixaNoEstoque", (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Baixa o estoque de um produto'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/baixaEstoque'
                    }
                }
            }
        }
   */
   controller.updateStock(req, res);
});

router.delete("/deletarProduto/:id", (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Deleta um produto'
   controller.deleteProduct(req, res);
});




export default router;
