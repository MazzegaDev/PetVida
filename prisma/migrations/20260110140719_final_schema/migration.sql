/*
  Warnings:

  - A unique constraint covering the columns `[usu_email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prd_preco` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "prd_preco" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usu_email_key" ON "Usuario"("usu_email");
