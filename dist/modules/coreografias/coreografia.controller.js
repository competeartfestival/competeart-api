"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarCoreografiaController = criarCoreografiaController;
exports.listarCoreografiasController = listarCoreografiasController;
const coreografia_service_1 = require("./coreografia.service");
async function criarCoreografiaController(app, request, reply) {
    try {
        const service = new coreografia_service_1.CoreografiaService(app.prisma);
        const coreografia = await service.criar({
            escolaId: request.params.id,
            ...request.body,
        });
        reply.code(201).send({ id: coreografia.id });
    }
    catch (error) {
        if (error.message === "ESCOLA_NAO_ENCONTRADA") {
            reply.code(404).send({ message: "Escola não encontrada" });
            return;
        }
        if (error.message === "LIMITE_COREOGRAFIAS_ATINGIDO") {
            reply.code(400).send({ message: "Limite de coreografias atingido" });
            return;
        }
        if (error.message === "FORMACAO_INVALIDA") {
            reply.code(400).send({ message: "Formação incompatível com elenco" });
            return;
        }
        throw error;
    }
}
async function listarCoreografiasController(app, request, reply) {
    try {
        const service = new coreografia_service_1.CoreografiaService(app.prisma);
        const coreografias = await service.listarPorEscola(request.params.id);
        const response = coreografias.map((c) => ({
            id: c.id,
            nome: c.nome,
            formacao: c.formacao,
            categoria: c.categoria,
            modalidade: c.modalidade,
            duracao: c.duracao,
            bailarinos: c.listaBailarinos.map((b) => b.nomeCompleto),
        }));
        reply.send(response);
    }
    catch (error) {
        if (error.message === "ESCOLA_NAO_ENCONTRADA") {
            reply.code(404).send({ message: "Escola não encontrada" });
            return;
        }
        throw error;
    }
}
