import { PrismaClient } from "@prisma/client";

interface CriarBailarinoInput {
  escolaId: string;
  nomeCompleto: string;
  nomeArtistico: string;
  cpf: string;
  dataNascimento: string;
}

export class BailarinoService {
  constructor(private prisma: PrismaClient) {}

  async criar(data: CriarBailarinoInput) {
    // 1️⃣ Garante que a escola existe
    const escola = await this.prisma.escola.findUnique({
      where: { id: data.escolaId },
    });

    if (!escola) {
      throw new Error("ESCOLA_NAO_ENCONTRADA");
    }

    // 2️⃣ Cria o bailarino
    return this.prisma.bailarino.create({
      data: {
        nomeCompleto: data.nomeCompleto,
        nomeArtistico: data.nomeArtistico,
        cpf: data.cpf,
        dataNascimento: new Date(data.dataNascimento),
        escolaId: data.escolaId,
      },
    });
  }
}
