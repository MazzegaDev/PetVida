import { ICreateClienteDTO, IUpdateClienteDTO } from "../interfaces/clienteDTO";
import { Cliente } from "../generated/prisma/client";
import ClienteRepository from "../repositories/clienteRepository";
import AppError from "../errors/error";

export default class ClienteService {
   readonly cRepo: ClienteRepository;
   constructor() {
      this.cRepo = new ClienteRepository();
   }

   async createCliente(data: ICreateClienteDTO): Promise<Cliente> {
      if (
         !data.cli_nome.trim() ||
         !data.cli_email.trim() ||
         !data.cli_telefone.trim()
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      const existedEmail: Cliente | null = await this.cRepo.findByEmail(data.cli_email);

      if(existedEmail){
         throw new AppError("Já existe um usuario com esse E-Mail", 400);
      }

      const createdClient: Cliente = await this.cRepo.createClient(data);

      if (!createdClient) {
         throw new AppError("Erro ao cadastrar novo cliente", 500);
      }

      return createdClient;
   }

   async listClients(): Promise<Cliente[]> {
      const list: Cliente[] = await this.cRepo.listClients();

      if (list.length === 0) {
         throw new AppError("nenhum cliente para listar", 404);
      }

      return list;
   }

   async updateClient(data: IUpdateClienteDTO): Promise<Cliente> {
      const findedClient: Cliente | null = await this.cRepo.findById(
         data.cli_id
      );

      if (!findedClient) {
         throw new AppError("Cliente não encontrado", 404);
      }

      if (
         !data.cli_nome?.trim() ||
         !data.cli_email?.trim() ||
         !data.cli_telefone?.trim()
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      const updatedClient: Cliente = await this.cRepo.updateClient(data);

      return updatedClient;
   }

   async deleteClient(id: number): Promise<Cliente> {
      const findedClient: Cliente | null = await this.cRepo.findById(id);

      if (!findedClient) {
         throw new AppError("Cliente não encontrado", 404);
      }

      const deletedClient: Cliente = await this.cRepo.deleteClient(id);

      return deletedClient;
   }

   async findById(id: number): Promise<Cliente> {
      const findedClient: Cliente | null = await this.cRepo.findById(id);

      if (!findedClient) {
         throw new AppError("Cliente não encontrado", 404);
      }

      return findedClient;
   }

   async findByEmail(email: string): Promise<Cliente> {
      const findedClient: Cliente | null = await this.cRepo.findByEmail(email);

      if (!findedClient) {
         throw new AppError("Cliente não encontrado", 404);
      }

      return findedClient;
   }
}
