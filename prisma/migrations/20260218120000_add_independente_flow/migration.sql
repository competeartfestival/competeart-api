-- CreateTable
CREATE TABLE "InscricaoIndependente" (
    "id" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "limiteCoreografias" INTEGER NOT NULL DEFAULT 1,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InscricaoIndependente_pkey" PRIMARY KEY ("id")
);

-- DropForeignKey
ALTER TABLE "Bailarino" DROP CONSTRAINT "Bailarino_escolaId_fkey";

-- DropForeignKey
ALTER TABLE "Coreografia" DROP CONSTRAINT "Coreografia_escolaId_fkey";

-- AlterTable
ALTER TABLE "Bailarino"
    ALTER COLUMN "escolaId" DROP NOT NULL,
    ADD COLUMN "independenteId" TEXT;

-- AlterTable
ALTER TABLE "Coreografia"
    ALTER COLUMN "escolaId" DROP NOT NULL,
    ADD COLUMN "independenteId" TEXT;

-- AddForeignKey
ALTER TABLE "Bailarino" ADD CONSTRAINT "Bailarino_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bailarino" ADD CONSTRAINT "Bailarino_independenteId_fkey" FOREIGN KEY ("independenteId") REFERENCES "InscricaoIndependente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coreografia" ADD CONSTRAINT "Coreografia_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coreografia" ADD CONSTRAINT "Coreografia_independenteId_fkey" FOREIGN KEY ("independenteId") REFERENCES "InscricaoIndependente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
