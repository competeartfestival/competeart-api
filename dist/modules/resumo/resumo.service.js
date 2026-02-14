"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumoService = void 0;
const client_1 = require("@prisma/client");
class ResumoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async gerar(escolaId) {
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
        const assistentes = escola.profissionais.filter((p) => p.funcao === client_1.FuncaoProfissional.ASSISTENTE);
        const assistentesExtras = Math.max(0, assistentes.length - 2);
        const valorAssistentesExtras = assistentesExtras * 70;
        let valorCoreografias = 0;
        const coreografiasDetalhe = escola.coreografias.map((c) => {
            const qtdBailarinos = c.bailarinos.length;
            let valor = 0;
            switch (c.formacao) {
                case client_1.Formacao.SOLO:
                    valor = 160;
                    break;
                case client_1.Formacao.DUO:
                    valor = 220;
                    break;
                case client_1.Formacao.TRIO:
                    valor = 320;
                    break;
                case client_1.Formacao.GRUPO:
                    valor = qtdBailarinos * 80;
                    break;
            }
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
}
exports.ResumoService = ResumoService;
