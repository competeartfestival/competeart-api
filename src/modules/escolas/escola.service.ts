import { PrismaClient, FuncaoProfissional } from "@prisma/client";

interface CriarEscolaInput {
  nome: string;
  endereco: string;
  email: string;
  whatsapp: string;
  nomeDiretor: string;
  limiteCoreografias: number;
  profissionais: {
    nome: string;
    funcao: FuncaoProfissional;
  }[];
}

export class EscolaService {
  constructor(private prisma: PrismaClient) {}

  async criar(data: CriarEscolaInput) {
    const assistentes = data.profissionais.filter(
      (p) => p.funcao === "ASSISTENTE"
    );

    const profissionaisComFlag = data.profissionais.map((p) => {
      const ehExtra =
        p.funcao === "ASSISTENTE" &&
        assistentes.indexOf(p) >= 2;

      return {
        nome: p.nome,
        funcao: p.funcao,
        ehExtra,
      };
    });

    return this.prisma.escola.create({
      data: {
        nome: data.nome,
        endereco: data.endereco,
        email: data.email,
        whatsapp: data.whatsapp,
        nomeDiretor: data.nomeDiretor,
        limiteCoreografias: data.limiteCoreografias,
        profissionais: {
          create: profissionaisComFlag,
        },
      },
    });
  }
}
