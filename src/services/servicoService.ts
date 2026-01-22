import { ICreateServicoDTO, IUpdateServicoDTO } from "../interfaces/servicoDTO";
import { Servico } from "../generated/prisma/client";
import AppError from "../errors/error";
import ServicoRepository from "../repositories/servicoRepository";

export default class ServicoService {
   readonly sRepo: ServicoRepository;
   constructor() {
      this.sRepo = new ServicoRepository();
   }

   async createServico(data: ICreateServicoDTO): Promise<Servico> {
      if (!data.ser_nome.trim() || !data.ser_preco) {
         throw new AppError("Insira dados validos", 400);
      }

      const created: Servico = await this.sRepo.createServico(data);
      if (!created) {
         throw new AppError("Erro ao cadastrar o serviço", 500);
      }

      return created;
   }

   async listServicos(): Promise<Servico[]> {
      const list: Servico[] = await this.sRepo.listServicos();

      if (list.length === 0) {
         throw new AppError("Nenhum serviço para listar", 404);
      }

      return list;
   }

   async updateServico(data: IUpdateServicoDTO): Promise<Servico> {
      if (!data.ser_nome?.trim() || !data.ser_preco) {
         throw new AppError("Insira dados validos", 400);
      }

      const finded: Servico | null = await this.sRepo.findById(data.ser_id);
      if (!finded) {
         throw new AppError("Serviço não encontrado", 404);
      }

      const updated: Servico = await this.sRepo.updateServico(data);

      return updated;
   }

   async deleteServico(id: number): Promise<Servico> {
      const finded: Servico | null = await this.sRepo.findById(id);

      if (!finded) {
         throw new AppError("Serviço não encontrado", 404);
      }

      const deleted: Servico = await this.sRepo.deleteServico(id);

      return deleted;
   }

   async findById(id: number): Promise<Servico> {
      const finded: Servico | null = await this.sRepo.findById(id);

      if (!finded) {
         throw new AppError("Serviço não encontrado", 404);
      }

      return finded;
   }
}
