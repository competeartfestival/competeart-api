import { PrismaClient, Formacao, FuncaoProfissional } from "@prisma/client";

export class ResumoService {
  constructor(private prisma: PrismaClient) {}

  private calcularValorCoreografia(formacao: Formacao, qtdBailarinos: number) {
    switch (formacao) {
      case Formacao.SOLO:
        return 160;
      case Formacao.DUO:
        return 220;
      case Formacao.TRIO:
        return 320;
      case Formacao.GRUPO:
        return qtdBailarinos * 80;
      default:
        return 0;
    }
  }

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
      const valor = this.calcularValorCoreografia(c.formacao, c.bailarinos.length);
      valorCoreografias += valor;

      return {
        id: c.id,
        nome: c.nome,
        nomeCoreografo: c.nomeCoreografo,
        formacao: c.formacao,
        modalidade: c.modalidade,
        categoria: c.categoria,
        duracao: c.duracao,
        musica: c.musica,
        temCenario: c.temCenario,
        valor,
      };
    });

    return {
      escola: {
        id: escola.id,
        nome: escola.nome,
        limiteCoreografias: escola.limiteCoreografias,
        whatsapp: escola.whatsapp,
        nomeDiretor: escola.nomeDiretor,
        endereco: escola.endereco,
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

  async gerarIndependente(independenteId: string) {
    const inscricao = await this.prisma.inscricaoIndependente.findUnique({
      where: { id: independenteId },
      include: {
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

    if (!inscricao) {
      throw new Error("INDEPENDENTE_NAO_ENCONTRADO");
    }

    let valorCoreografias = 0;

    const coreografiasDetalhe = inscricao.coreografias.map((c) => {
      const valor = this.calcularValorCoreografia(c.formacao, c.bailarinos.length);
      valorCoreografias += valor;

      return {
        id: c.id,
        nome: c.nome,
        nomeCoreografo: c.nomeCoreografo,
        formacao: c.formacao,
        modalidade: c.modalidade,
        categoria: c.categoria,
        duracao: c.duracao,
        musica: c.musica,
        temCenario: c.temCenario,
        valor,
      };
    });

    return {
      independente: {
        id: inscricao.id,
        nomeResponsavel: inscricao.nomeResponsavel,
        email: inscricao.email,
        whatsapp: inscricao.whatsapp,
        limiteCoreografias: inscricao.limiteCoreografias,
      },
      totais: {
        coreografias: inscricao.coreografias.length,
        assistentesExtras: 0,
      },
      valores: {
        coreografias: valorCoreografias,
        assistentesExtras: 0,
        total: valorCoreografias,
      },
      detalhamento: {
        coreografias: coreografiasDetalhe,
      },
    };
  }
}
