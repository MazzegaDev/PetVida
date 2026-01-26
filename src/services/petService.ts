import { ICreatePetDTO, IUpdatePetDTO, TPetList } from "../interfaces/petDTO";
import { Pets, Raca, Cliente, Especie } from "../generated/prisma/client";
import PetRepository from "../repositories/petRepository";
import RacaRepository from "../repositories/racaRepository";
import ClienteRepository from "../repositories/clienteRepository";
import EspecieRepository from "../repositories/especieRepository";
import AppError from "../errors/error";

export default class PetService {
   readonly pRepo: PetRepository;
   readonly rRepo: RacaRepository;
   readonly cRepo: ClienteRepository;
   readonly eRepo: EspecieRepository;

   constructor() {
      this.pRepo = new PetRepository();
      this.rRepo = new RacaRepository();
      this.cRepo = new ClienteRepository();
      this.eRepo = new EspecieRepository();
   }

   async createPet(data: ICreatePetDTO): Promise<Pets> {
      if (
         !data.pet_nome.trim() ||
         !data.pet_idade ||
         !data.rac_id ||
         !data.esp_id ||
         !data.cli_id
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      const findedRaca: Raca | null = await this.rRepo.findById(data.rac_id);
      if (!findedRaca) {
         throw new AppError("Raça não encontrada", 404);
      }

      const findedCliente: Cliente | null = await this.cRepo.findById(
         data.cli_id,
      );
      if (!findedCliente) {
         throw new AppError("Cliente não encontrado", 404);
      }

      const findedEspecie: Especie | null = await this.eRepo.findById(
         data.esp_id,
      );
      if (!findedEspecie) {
         throw new AppError("Especie não encontrada", 404);
      }

      const createdPet: Pets = await this.pRepo.createPet(data);
      if (!createdPet) {
         throw new AppError("Erro ao cadastrar pet", 500);
      }

      return createdPet;
   }

   async listPets(): Promise<TPetList[]> {
      const list: TPetList[] = await this.pRepo.listPets();

      if (list.length === 0) {
         throw new AppError("Nenhum pet para listar", 404);
      }

      return list;
   }

   async updatePets(data: IUpdatePetDTO): Promise<Pets> {
      if (
         !data.pet_nome?.trim() ||
         !data.pet_idade ||
         !data.rac_id ||
         !data.esp_id ||
         !data.cli_id
      ) {
         throw new AppError("Insira dados validos", 400);
      }

      const findedPet: TPetList | null = await this.pRepo.findById(data.pet_id);
      if (!findedPet) {
         throw new AppError("Pet não encontrado", 404);
      }

      const findedRaca: Raca | null = await this.rRepo.findById(data.rac_id);
      if (!findedRaca) {
         throw new AppError("Raça não encontrada", 404);
      }

      const findedCliente: Cliente | null = await this.cRepo.findById(
         data.cli_id,
      );
      if (!findedCliente) {
         throw new AppError("Cliente não encontrado", 404);
      }

      const findedEspecie: Especie | null = await this.eRepo.findById(
         data.esp_id,
      );
      if (!findedEspecie) {
         throw new AppError("Especie não encontrada", 404);
      }

      const createdPet: Pets = await this.pRepo.updatePet(data);
      if (!createdPet) {
         throw new AppError("Erro ao atualizar dados do pet", 500);
      }

      return createdPet;
   }

   async deletePet(id: number): Promise<Pets> {
      const findedPet: TPetList | null = await this.pRepo.findById(id);
      if (!findedPet) {
         throw new AppError("Pet não encontrado", 404);
      }

      const deletedPet: Pets = await this.pRepo.deletePet(id);

      if (!deletedPet) {
         throw new AppError("Erro ao deletar o pet", 500);
      }

      return deletedPet;
   }

   async findById(id: number): Promise<TPetList> {
      const findedPet: TPetList | null = await this.pRepo.findById(id);
      if (!findedPet) {
         throw new AppError("Pet não encontrado", 404);
      }

      return findedPet;
   }

   async findByRaca(id: number): Promise<TPetList[]> {
      const findedPet: TPetList[] | null = await this.pRepo.findByRaca(id);
      if (findedPet.length === 0) {
         throw new AppError("Nenhum pet pertence a essa raça", 404);
      }

      return findedPet;
   }

   async findByClient(id: number): Promise<TPetList[]> {
      const findedPet: TPetList[] | null = await this.pRepo.findByClient(id);
      if (findedPet.length === 0) {
         throw new AppError("Nenhum pet pertence a esse cliente", 404);
      }

      return findedPet;
   }

   async findByEspecie(id: number): Promise<PTPetList[]> {
      const findedPet: TPetList[] | null = await this.pRepo.findByEspecie(id);
      if (findedPet.length === 0) {
         throw new AppError("Nenhum pet pertence a essa especie", 404);
      }

      return findedPet;
   }
}
