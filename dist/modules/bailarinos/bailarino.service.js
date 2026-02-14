"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BailarinoService = void 0;
class BailarinoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(data) {
        const escola = await this.prisma.escola.findUnique({
            where: { id: data.escolaId },
        });
        if (!escola) {
            throw new Error("ESCOLA_NAO_ENCONTRADA");
        }
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
    async listarPorEscola(escolaId) {
        const escola = await this.prisma.escola.findUnique({
            where: { id: escolaId },
        });
        if (!escola) {
            throw new Error("ESCOLA_NAO_ENCONTRADA");
        }
        return this.prisma.bailarino.findMany({
            where: { escolaId },
            orderBy: { nomeArtistico: "asc" },
        });
    }
}
exports.BailarinoService = BailarinoService;
