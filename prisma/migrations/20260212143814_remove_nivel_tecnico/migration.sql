/*
  Warnings:

  - You are about to drop the column `nivelTecnico` on the `Coreografia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coreografia" DROP COLUMN "nivelTecnico";

-- DropEnum
DROP TYPE "NivelTecnico";
