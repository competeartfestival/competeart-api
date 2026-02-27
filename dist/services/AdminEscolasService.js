"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEscolasService = void 0;
const client_1 = require("@prisma/client");
class AdminEscolasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    calcularValorCoreografias(coreografias) {
        let valorCoreografias = 0;
        coreografias.forEach((c) => {
            const qtd = c.bailarinos.length;
            switch (c.formacao) {
                case client_1.Formacao.SOLO:
                    valorCoreografias += 160;
                    break;
                case client_1.Formacao.DUO:
                    valorCoreografias += 220;
                    break;
                case client_1.Formacao.TRIO:
                    valorCoreografias += 320;
                    break;
                case client_1.Formacao.GRUPO:
                    valorCoreografias += qtd * 80;
                    break;
            }
        });
        return valorCoreografias;
    }
    async listar() {
        const [escolas, independentes] = await Promise.all([
            this.prisma.escola.findMany({
                include: {
                    profissionais: true,
                    coreografias: {
                        include: {
                            bailarinos: true,
                        },
                    },
                },
            }),
            this.prisma.inscricaoIndependente.findMany({
                include: {
                    coreografias: {
                        include: {
                            bailarinos: true,
                        },
                    },
                },
            }),
        ]);
        const inscricoesEscola = escolas.map((escola) => {
            const profissionaisExtras = Math.max(0, escola.profissionais.length - 2);
            const valorProfissionaisExtras = profissionaisExtras * 70;
            const valorCoreografias = this.calcularValorCoreografias(escola.coreografias);
            const total = valorCoreografias + valorProfissionaisExtras;
            const completas = escola.coreografias.length >= escola.limiteCoreografias;
            return {
                id: escola.id,
                nome: escola.nome,
                limiteCoreografias: escola.limiteCoreografias,
                coreografiasCadastradas: escola.coreografias.length,
                valorTotal: total,
                tipoInscricao: "ESCOLA",
                status: completas ? "COMPLETA" : "EM_ANDAMENTO",
            };
        });
        const inscricoesIndependentes = independentes.map((independente) => {
            const valorCoreografias = this.calcularValorCoreografias(independente.coreografias);
            const completas = independente.coreografias.length >= independente.limiteCoreografias;
            return {
                id: independente.id,
                nome: independente.nomeResponsavel,
                limiteCoreografias: independente.limiteCoreografias,
                coreografiasCadastradas: independente.coreografias.length,
                valorTotal: valorCoreografias,
                tipoInscricao: "BAILARINO_INDEPENDENTE",
                status: completas ? "COMPLETA" : "EM_ANDAMENTO",
            };
        });
        return [...inscricoesEscola, ...inscricoesIndependentes];
    }
}
exports.AdminEscolasService = AdminEscolasService;
