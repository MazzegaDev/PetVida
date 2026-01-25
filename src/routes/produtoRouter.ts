import { Router } from "express";
import ProdutoController from "../controllers/produtoController";
import { validateAuth, validateAuthAdm } from "../middleware/authMiddleware";

const router = Router();
const controller = new ProdutoController();

router.post("/cadastrarProduto", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Cadastra um produto'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
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

router.get("/listarProdutos", validateAuth, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Lista todos os produtos'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.listProducts(req, res);
});

router.get("/listarEstoqueCritico", validateAuth, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Lista todos os produtos com estoque critico (Menor que 5)'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findLowStock(req, res);
});

router.get("/buscarPorId/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Busca um produto pelo ID'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.findById(req, res);
});

router.put("/alterarProduto", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Altera um produto'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
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

router.patch("/baixaNoEstoque", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Baixa o estoque de um produto'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
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


router.patch("/adicionarNoEstoque", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Adiciona uma certa quantidade ao estoque de um produto'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
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
   controller.updateStock2(req, res);
});

router.delete("/deletarProduto/:id", validateAuthAdm, (req, res) => {
   // #swagger.tags = ['Produto']
   // #swagger.summary = 'Deleta um produto'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
   controller.deleteProduct(req, res);
});

export default router;
