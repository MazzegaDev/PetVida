import { ICreateRacaDTO, IUpdateRacaDTO } from "../interfaces/racaDTO";
import { Raca } from "../generated/prisma/client";
import RacaRepository from "../repositories/racaRepository";
import AppError from "../errors/error";

export default class RacaService {
   readonly rRepo;
   constructor() {
      this.rRepo = new RacaRepository();
   }

   async createRaca(data: ICreateRacaDTO): Promise<Raca> {
      if (!data.rac_nome) {
         throw new AppError("Insira dados validos", 400);
      }

      const created: Raca = await this.rRepo.createRaca(data);

      if (!created) {
         throw new AppError("Erro ao cadastrar a raça", 500);
      }

      return created;
   }

   async listRacas(): Promise<Raca[]> {
      const list: Raca[] = await this.rRepo.listRacas();

      if (list.length === 0) {
         throw new AppError("Nenhuma raça para listar", 404);
      }

      return list;
   }

   async updateRaca(data: IUpdateRacaDTO): Promise<Raca> {
      const findedRaca: Raca | null = await this.rRepo.findById(data.rac_id);

      if (!findedRaca) {
         throw new AppError("Raça não encontrada", 404);
      }

      if (!data.rac_nome) {
         throw new AppError("Insira dados validos", 400);
      }

      const updated: Raca = await this.rRepo.updateRaca(data);

      if (!updated) {
         throw new AppError("Erro ao atualizar dados da raça", 500);
      }

      return updated;
   }

   async deleteRaca(id: number): Promise<Raca> {
      const findedRaca: Raca | null = await this.rRepo.findById(id);

      if (!findedRaca) {
         throw new AppError("Raça não encontrada", 404);
      }

      const deleted: Raca = await this.rRepo.deleteRaca(id);

      if (!deleted) {
         throw new AppError("Erro ao deletar raça", 500);
      }

      return deleted;
   }

   async findById(id: number): Promise<Raca> {
      const findedRaca: Raca | null = await this.rRepo.findById(id);

      if (!findedRaca) {
         throw new AppError("Raça não encontrada", 404);
      }

      return findedRaca;
   }
}
