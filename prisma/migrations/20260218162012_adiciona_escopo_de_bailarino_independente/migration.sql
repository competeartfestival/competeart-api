-- DropForeignKey
ALTER TABLE "Bailarino" DROP CONSTRAINT "Bailarino_escolaId_fkey";

-- DropForeignKey
ALTER TABLE "Bailarino" DROP CONSTRAINT "Bailarino_independenteId_fkey";

-- DropForeignKey
ALTER TABLE "Coreografia" DROP CONSTRAINT "Coreografia_escolaId_fkey";

-- DropForeignKey
ALTER TABLE "Coreografia" DROP CONSTRAINT "Coreografia_independenteId_fkey";

-- AddForeignKey
ALTER TABLE "Bailarino" ADD CONSTRAINT "Bailarino_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bailarino" ADD CONSTRAINT "Bailarino_independenteId_fkey" FOREIGN KEY ("independenteId") REFERENCES "InscricaoIndependente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coreografia" ADD CONSTRAINT "Coreografia_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coreografia" ADD CONSTRAINT "Coreografia_independenteId_fkey" FOREIGN KEY ("independenteId") REFERENCES "InscricaoIndependente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
