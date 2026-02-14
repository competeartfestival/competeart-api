"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreografiaService = void 0;
class CoreografiaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(data) {
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
    async listarPorEscola(escolaId) {
        const escola = await this.prisma.escola.findUnique({
            where: { id: escolaId },
        });
        if (!escola) {
            throw new Error("ESCOLA_NAO_ENCONTRADA");
        }
        const coreografias = await this.prisma.coreografia.findMany({
            where: { escolaId },
            orderBy: { criadoEm: "asc" },
            include: {
                bailarinos: {
                    include: {
                        bailarino: {
                            select: {
                                id: true,
                                nomeCompleto: true,
                                nomeArtistico: true,
                            },
                        },
                    },
                },
            },
        });
        return coreografias.map((c) => {
            const qtd = c.bailarinos.length;
            let valor = 0;
            switch (c.formacao) {
                case "SOLO":
                    valor = 160;
                    break;
                case "DUO":
                    valor = 220;
                    break;
                case "TRIO":
                    valor = 320;
                    break;
                case "GRUPO":
                    valor = qtd * 80;
                    break;
            }
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
                listaBailarinos: c.bailarinos.map((b) => b.bailarino),
            };
        });
    }
}
exports.CoreografiaService = CoreografiaService;
