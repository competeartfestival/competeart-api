import { PrismaClient, Formacao, FuncaoProfissional } from "@prisma/client";

export class ResumoService {
  constructor(private prisma: PrismaClient) {}

  async gerar(escolaId: string) {
    const escola = await this.prisma.escola.findUnique({
      where: { id: escolaId },
      include: {
        profissionais: true,
        coreografias: {
          include: {
            bailarinos: {
              include: {
                bailarino: true,
              },
            },
          },
        },
      },
    });

    if (!escola) {
      throw new Error("ESCOLA_NAO_ENCONTRADA");
    }

    const assistentes = escola.profissionais.filter(
      (p) => p.funcao === FuncaoProfissional.ASSISTENTE,
    );

    const assistentesExtras = Math.max(0, assistentes.length - 2);
    const valorAssistentesExtras = assistentesExtras * 70;

    let valorCoreografias = 0;

    const coreografiasDetalhe = escola.coreografias.map((c) => {
      const qtdBailarinos = c.bailarinos.length;

      let valor = 0;

      switch (c.formacao) {
        case Formacao.SOLO:
          valor = 160;
          break;
        case Formacao.DUO:
          valor = 220;
          break;
        case Formacao.TRIO:
          valor = 320;
          break;
        case Formacao.GRUPO:
          valor = qtdBailarinos * 80;
          break;
      }

      valorCoreografias += valor;

      return {
        id: c.id,
        nome: c.nome,
        formacao: c.formacao,
        bailarinos: qtdBailarinos,
        valor,
      };
    });

    return {
      escola: {
        id: escola.id,
        nome: escola.nome,
        limiteCoreografias: escola.limiteCoreografias,
      },
      totais: {
        coreografias: escola.coreografias.length,
        assistentesExtras,
      },
      valores: {
        coreografias: valorCoreografias,
        assistentesExtras: valorAssistentesExtras,
        total: valorCoreografias + valorAssistentesExtras,
      },
      detalhamento: {
        coreografias: coreografiasDetalhe,
      },
    };
  }
}
