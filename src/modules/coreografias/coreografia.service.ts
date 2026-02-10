import {
  PrismaClient,
  Formacao,
} from "@prisma/client";

interface CriarCoreografiaInput {
  escolaId: string;
  nome: string;
  nomeCoreografo: string;
  nivelTecnico: any;
  formacao: Formacao;
  modalidade: any;
  categoria: any;
  duracao: string;
  musica: string;
  temCenario: boolean;
  bailarinosIds: string[];
}

export class CoreografiaService {
  constructor(private prisma: PrismaClient) {}

  async criar(data: CriarCoreografiaInput) {
    const escola = await this.prisma.escola.findUnique({
      where: { id: data.escolaId },
      include: { coreografias: true },
    });

    if (!escola) {
      throw new Error("ESCOLA_NAO_ENCONTRADA");
    }

    if (escola.coreografias.length >= escola.limiteCoreografias) {
      throw new Error("LIMITE_COREOGRAFIAS_ATINGIDO");
    }

    const qtd = data.bailarinosIds.length;

    if (data.formacao === "SOLO" && qtd !== 1) {
      throw new Error("FORMACAO_INVALIDA");
    }
    if (data.formacao === "DUO" && qtd !== 2) {
      throw new Error("FORMACAO_INVALIDA");
    }
    if (data.formacao === "TRIO" && qtd !== 3) {
      throw new Error("FORMACAO_INVALIDA");
    }
    if (data.formacao === "GRUPO" && qtd < 4) {
      throw new Error("FORMACAO_INVALIDA");
    }

    return this.prisma.$transaction(async (tx) => {
      const coreografia = await tx.coreografia.create({
        data: {
          nome: data.nome,
          nomeCoreografo: data.nomeCoreografo,
          nivelTecnico: data.nivelTecnico,
          formacao: data.formacao,
          modalidade: data.modalidade,
          categoria: data.categoria,
          duracao: data.duracao,
          musica: data.musica,
          temCenario: data.temCenario,
          escolaId: data.escolaId,
        },
      });

      await tx.coreografiaBailarino.createMany({
        data: data.bailarinosIds.map((bailarinoId) => ({
          coreografiaId: coreografia.id,
          bailarinoId,
        })),
      });

      return coreografia;
    });
  }
}
