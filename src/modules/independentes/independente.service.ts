import { PrismaClient } from "@prisma/client";

interface CriarIndependenteInput {
  nomeResponsavel: string;
  email: string;
  whatsapp: string;
  limiteCoreografias: number;
}

export class IndependenteService {
  constructor(private prisma: PrismaClient) {}

  async criar(data: CriarIndependenteInput) {
    return this.prisma.inscricaoIndependente.create({
      data: {
        nomeResponsavel: data.nomeResponsavel,
        email: data.email,
        whatsapp: data.whatsapp,
        limiteCoreografias: data.limiteCoreografias,
      },
    });
  }
}
