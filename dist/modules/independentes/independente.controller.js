"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarIndependenteController = criarIndependenteController;
const independente_service_1 = require("./independente.service");
async function criarIndependenteController(app, request, reply) {
    const service = new independente_service_1.IndependenteService(app.prisma);
    const inscricao = await service.criar(request.body);
    reply.code(201).send({ id: inscricao.id });
}
