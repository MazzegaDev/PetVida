import { Papel } from "../generated/prisma/client";
import PapelRepository from "../repositories/papelRepository";

export default class PapelService{
   readonly pRepo: PapelRepository;
   constructor(){
      this.pRepo = new PapelRepository();
   }

   async listRoles(): Promise<Papel[]>{
      const list: Papel[] = await this.pRepo.listRoles();

      return list;
   }
}