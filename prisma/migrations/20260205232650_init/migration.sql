-- CreateEnum
CREATE TYPE "FuncaoProfissional" AS ENUM ('COREOGRAFO', 'ASSISTENTE');

-- CreateEnum
CREATE TYPE "NivelTecnico" AS ENUM ('INICIANTE', 'AMADOR', 'SEMI_PROFISSIONAL', 'PROFISSIONAL');

-- CreateEnum
CREATE TYPE "Formacao" AS ENUM ('SOLO', 'DUO', 'TRIO', 'GRUPO');

-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('BALLET_CLASSICO', 'BALLET_NEOCLASSICO', 'JAZZ', 'CONTEMPORANEO', 'DANCAS_URBANAS', 'SAPATEADO', 'ESTILO_LIVRE', 'OUTROS');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('BABY', 'INFANTIL_I', 'INFANTIL_II', 'JUVENIL_I', 'JUVENIL_II', 'ADULTO', 'ADULTO_INICIANTE', 'SENIOR', 'MASTER');

-- CreateTable
CREATE TABLE "Escola" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "nomeDiretor" TEXT NOT NULL,
    "limiteCoreografias" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escola_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "funcao" "FuncaoProfissional" NOT NULL,
    "ehExtra" BOOLEAN NOT NULL,
    "escolaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bailarino" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "nomeArtistico" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "escolaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bailarino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coreografia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeCoreografo" TEXT NOT NULL,
    "nivelTecnico" "NivelTecnico" NOT NULL,
    "formacao" "Formacao" NOT NULL,
    "modalidade" "Modalidade" NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "duracao" TEXT NOT NULL,
    "musica" TEXT NOT NULL,
    "temCenario" BOOLEAN NOT NULL,
    "escolaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coreografia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoreografiaBailarino" (
    "id" TEXT NOT NULL,
    "coreografiaId" TEXT NOT NULL,
    "bailarinoId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoreografiaBailarino_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bailarino_cpf_key" ON "Bailarino"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "CoreografiaBailarino_coreografiaId_bailarinoId_key" ON "CoreografiaBailarino"("coreografiaId", "bailarinoId");

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bailarino" ADD CONSTRAINT "Bailarino_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coreografia" ADD CONSTRAINT "Coreografia_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreografiaBailarino" ADD CONSTRAINT "CoreografiaBailarino_coreografiaId_fkey" FOREIGN KEY ("coreografiaId") REFERENCES "Coreografia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreografiaBailarino" ADD CONSTRAINT "CoreografiaBailarino_bailarinoId_fkey" FOREIGN KEY ("bailarinoId") REFERENCES "Bailarino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
