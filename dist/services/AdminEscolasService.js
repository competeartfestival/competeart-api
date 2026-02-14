"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminEscolasService = void 0;
const client_1 = require("@prisma/client");
class AdminEscolasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listar() {
        const escolas = await this.prisma.escola.findMany({
            include: {
                profissionais: true,
                coreografias: {
                    include: {
                        bailarinos: true,
                    },
                },
            },
        });
        return escolas.map((escola) => {
            // assistentes extras
            const assistentes = escola.profissionais.filter((p) => p.funcao === client_1.FuncaoProfissional.ASSISTENTE);
            const assistentesExtras = Math.max(0, assistentes.length - 2);
            const valorAssistentesExtras = assistentesExtras * 70;
            // coreografias
            let valorCoreografias = 0;
            escola.coreografias.forEach((c) => {
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
            const total = valorCoreografias + valorAssistentesExtras;
            const completas = escola.coreografias.length >= escola.limiteCoreografias;
            return {
                id: escola.id,
                nome: escola.nome,
                limiteCoreografias: escola.limiteCoreografias,
                coreografiasCadastradas: escola.coreografias.length,
                valorTotal: total,
                status: completas ? "COMPLETA" : "EM_ANDAMENTO",
            };
        });
    }
}
exports.AdminEscolasService = AdminEscolasService;
