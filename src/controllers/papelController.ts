import { Papel } from "../generated/prisma/client";
import PapelService from "../services/papelService";
import { Request, Response } from "express";

export default class PapelController{
   readonly pServ: PapelService;
   constructor(){
      this.pServ = new PapelService();
   }

   async listRoles(req: Request, res: Response): Promise<Response>{
      try {
         const list: Papel[] = await this.pServ.listRoles();

         return res.status(200).json(list)

      } catch (error) {
         console.log(error);
         return res.status(500).json({msg: "Erro interno"});
      }
   }
}