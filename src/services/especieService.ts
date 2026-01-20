import { ICreateEspecieDTO, IUpdateEspecieDTO } from "../interfaces/especieDTO";
import { Especie } from "../generated/prisma/client";
import AppError from "../errors/error";
import EspecieRepository from "../repositories/especieRepository";

export default class EspecieService {
   readonly eRepo: EspecieRepository;
   constructor() {
      this.eRepo = new EspecieRepository();
   }

   async createEspecie(data: ICreateEspecieDTO): Promise<Especie> {
      if (!data.esp_nome) {
         throw new AppError("Insira dados validos", 400);
      }

      const createdEspecie: Especie = await this.eRepo.createEspecie(data);

      if (!createdEspecie) {
         throw new AppError("Erro ao cadastrar a especie", 500);
      }

      return createdEspecie;
   }

   async listEspecies(): Promise<Especie[]> {
      const list: Especie[] = await this.eRepo.listEspecies();

      if (list.length === 0) {
         throw new AppError("Nenhuma especie para listar", 404);
      }

      return list;
   }

   async updateEspecies(data: IUpdateEspecieDTO): Promise<Especie> {
      if (!data.esp_nome?.trim()) {
         throw new AppError("Insira dados validos", 400);
      }

      const findedEspecie: Especie | null = await this.eRepo.findById(
         data.esp_id
      );

      if (!findedEspecie) {
         throw new AppError("Especie não encontrada", 404);
      }

      const updatedEspecie: Especie = await this.eRepo.updateEspecie(data);

      if (!updatedEspecie) {
         throw new AppError("Erro ao atualizar dados da especie", 500);
      }

      return updatedEspecie;
   }

   async deleteEspecie(id: number): Promise<Especie> {
      const findedEspecie: Especie | null = await this.eRepo.findById(id);

      if (!findedEspecie) {
         throw new AppError("Especie não encontrada", 404);
      }

      const deleted: Especie = await this.eRepo.deleteEspecie(id);

      if (!deleted) {
         throw new AppError("Erro ao deletar a especie", 500);
      }

      return deleted;
   }

   async findById(id: number): Promise<Especie> {
      const findedEspecie: Especie | null = await this.eRepo.findById(id);

      if (!findedEspecie) {
         throw new AppError("Especie não encontrada", 404);
      }

      return findedEspecie;
   }
}
