"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscolaService = void 0;
class EscolaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(data) {
        const profissionaisComFlag = data.profissionais.map((p) => {
            const ehExtra = data.profissionais.indexOf(p) >= 2;
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
exports.EscolaService = EscolaService;
