"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.independenteIdParamsSchema = exports.criarIndependenteSchema = void 0;
exports.criarIndependenteSchema = {
    body: {
        type: "object",
        required: ["nomeResponsavel", "email", "whatsapp", "limiteCoreografias"],
        properties: {
            nomeResponsavel: { type: "string", minLength: 1 },
            email: { type: "string", format: "email" },
            whatsapp: { type: "string", minLength: 8 },
            limiteCoreografias: { type: "integer", minimum: 1 },
        },
    },
};
exports.independenteIdParamsSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string", format: "uuid" },
        },
    },
};
