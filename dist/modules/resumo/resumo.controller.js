"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumoInscricaoController = resumoInscricaoController;
exports.resumoInscricaoIndependenteController = resumoInscricaoIndependenteController;
const resumo_service_1 = require("./resumo.service");
async function resumoInscricaoController(app, request, reply) {
    try {
        const service = new resumo_service_1.ResumoService(app.prisma);
        const resumo = await service.gerar(request.params.id);
        reply.send(resumo);
    }
    catch (error) {
        if (error.message === "ESCOLA_NAO_ENCONTRADA") {
            reply.code(404).send({ message: "Escola não encontrada" });
            return;
        }
        throw error;
    }
}
async function resumoInscricaoIndependenteController(app, request, reply) {
    try {
        const service = new resumo_service_1.ResumoService(app.prisma);
        const resumo = await service.gerarIndependente(request.params.id);
        reply.send(resumo);
    }
    catch (error) {
        if (error.message === "INDEPENDENTE_NAO_ENCONTRADO") {
            reply.code(404).send({ message: "Inscrição independente não encontrada" });
            return;
        }
        throw error;
    }
}
