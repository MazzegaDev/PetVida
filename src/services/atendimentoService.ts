import {
   AtendimentoParamsDTO,
   ICreateAtendimentoDTO,
   IUpdateStatusDTO,
   IAtendimentoList,
} from "../interfaces/atendimentoDTO";
import { Atendimento, Pets, Servico } from "../generated/prisma/client";
import AppError from "../errors/error";
import AtendimentoRepository from "../repositories/atendimentoRepository";
import ServicoRepository from "../repositories/servicoRepository";
import PetRepository from "../repositories/petRepository";

export default class AtendimentoService {
   readonly aRepo: AtendimentoRepository;
   readonly sRepo: ServicoRepository;
   readonly pRepo: PetRepository;
   constructor() {
      this.aRepo = new AtendimentoRepository();
      this.sRepo = new ServicoRepository();
      this.pRepo = new PetRepository();
   }

   async createAtendimento(data: AtendimentoParamsDTO): Promise<Atendimento> {
      const dataNow = new Date();
      const ate_data = dataNow;

      if (!data.pet_id || !data.ser_id || data.ser_id.length === 0) {
         throw new AppError(
            "Informe um pet e pelo menos um serviço para iniciar o atendimento",
            400,
         );
      }

      const petFinded: Pets | null = await this.pRepo.findById(data.pet_id);

      if (!petFinded) {
         throw new AppError("Pet não encontrado", 404);
      }

      let servTotal: number = 0;

      for (const serId of data.ser_id) {
         const servFinded: Servico | null = await this.sRepo.findById(serId);

         if (!servFinded) {
            throw new AppError("Serviço não encontrado", 404);
         }

         servTotal += servFinded.ser_preco;
      }

      const ate_valortotal = servTotal;

      const atendimentoData: ICreateAtendimentoDTO = {
         pet_id: data.pet_id,
         ser_id: data.ser_id,
         ate_status: "Pendente",
         ate_data,
         ate_valortotal,
      };

      const newAtendimento: Atendimento =
         await this.aRepo.createAtendimento(atendimentoData);

      if (!newAtendimento) {
         throw new AppError("Não foi possivel iniciar o atendimento", 500);
      }

      return newAtendimento;
   }

   async listAtendimentos(): Promise<IAtendimentoList[]> {
      const list: IAtendimentoList[] = await this.aRepo.listAtendimento();

      if (list.length === 0) {
         throw new AppError("Nenhum atendimento para listar", 404);
      }

      return list;
   }

   async findById(id: number): Promise<IAtendimentoList> {
      const finded: IAtendimentoList | null = await this.aRepo.findById(id);

      if (!finded) {
         throw new AppError("Atendimento não encontrado", 404);
      }

      return finded;
   }

   async changeStatus(data: IUpdateStatusDTO): Promise<Atendimento> {
      const finded: IAtendimentoList | null = await this.aRepo.findById(
         data.ate_id,
      );

      if (!finded) {
         throw new AppError("Atendimento não encontrado", 404);
      }

      const updated: Atendimento = await this.aRepo.changeStatus(data);

      if (!updated) {
         throw new AppError(
            "Não foi possivel mudar o staus do atendimento",
            500,
         );
      }

      return updated;
   }
}
