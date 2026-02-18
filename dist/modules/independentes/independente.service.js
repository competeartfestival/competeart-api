"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndependenteService = void 0;
class IndependenteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(data) {
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
exports.IndependenteService = IndependenteService;
