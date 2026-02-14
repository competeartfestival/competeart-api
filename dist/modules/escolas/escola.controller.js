"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarEscolaController = criarEscolaController;
const escola_service_1 = require("./escola.service");
async function criarEscolaController(app, request, reply) {
    const service = new escola_service_1.EscolaService(app.prisma);
    const escola = await service.criar(request.body);
    reply.code(201).send({ id: escola.id });
}
