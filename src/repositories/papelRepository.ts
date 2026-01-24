import { Papel } from "../generated/prisma/client";
import { Prisma } from "../database/database";

export default class PapelRepository {
   readonly prisma = Prisma;

   async listRoles(): Promise<Papel[]> {
      const list: Papel[] = await this.prisma.papel.findMany();

      return list;
   }

   async findById(id: number): Promise<Papel | null> {
      return await this.prisma.papel.findUnique({
         where: { pap_id: id },
      });
   }
}
