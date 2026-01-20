
import { Papel } from "../generated/prisma/client";
import { Prisma } from "../database/database";

export default class PapelRepository {
   readonly prisma = Prisma;

   async listRoles(): Promise<Papel[]> {
      const list: Papel[] = await this.prisma.papel.findMany();

      return list;
   }
}
