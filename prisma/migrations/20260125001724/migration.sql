/*
  Warnings:

  - A unique constraint covering the columns `[usu_id]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usu_id` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "usu_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usu_id_key" ON "Cliente"("usu_id");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_usu_id_fkey" FOREIGN KEY ("usu_id") REFERENCES "Usuario"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;
