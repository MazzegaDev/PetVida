import swaggerAutogen from "swagger-autogen";

const doc = {
   info: {
      title: "API PetVida",
      description: "API REST",
   },
   servers: [
      {
         url: "http://localhost:5000",
      },
   ],
   components: {
      schemas: {
         cliente: {
            cli_nome: "Nome",
            cli_telefone: "(00) 0000-0000",
            cli_email: "nome@email.com",
         },
         clienteAlter: {
            cli_id: 1,
            cli_nome: "Nome",
            cli_telefone: "(00) 0000-0000",
            cli_email: "nome@email.com",
         },
         produto: {
            prd_nome: "Nome",
            prd_quantidade: 5,
            prd_preco: 150,
         },
         produtoAlter: {
            prd_id: 1,
            prd_nome: "Nome",
            prd_quantidade: 5,
            prd_preco: 150,
         },
         raca: {
            rac_nome: "Nome",
         },
         especie: {
            esp_nome: "Nome",
         },
         especieAlter: {
            esp_id: 1,
            esp_nome: "nome",
         },
         racaAlter: {
            rac_id: 1,
            rac_nome: "Nome",
         },
         usuario: {
            usu_nome: "Nome",
            usu_email: "nome@email.com",
            usu_senha: "senha123",
            pap_id: 1,
         },
         usuarioAlter: {
            usu_id: 1,
            usu_nome: "Nome",
            usu_email: "nome@email.com",
            usu_senha: "senha123",
            pap_id: 1,
         },
         baixaEstoque: {
            prd_id: 1,
            prd_quantidade: 10,
         },
         pet: {
            pet_nome: "Nome",
            pet_idade: 1,
            cli_id: 1,
            esp_id: 1,
            rac_id: 1,
         },
         petAlter: {
            pet_id: 1,
            pet_nome: "Nome",
            pet_idade: 1,
            cli_id: 1,
            esp_id: 1,
            rac_id: 1,
         },
         servico: {
            ser_nome: "Nome",
            ser_preco: 89.9,
         },
         servicoAlter: {
            ser_id: 1,
            ser_nome: "Nome",
            ser_preco: 99.8,
         },
         atendimento: {
            pet_id: 1,
            ser_id: [1, 2, 3],
         },
         alterarStatus: {
            ate_id: 1,
            ate_status: "Concluido | Pendente | Negado"
         }
      },
   },
};

const outputFile = "./src/swaggerOutput.json";
const endpointsFiles = ["./app.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
