"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarBailarinosSchema = exports.criarBailarinoSchema = void 0;
exports.criarBailarinoSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string", format: "uuid" },
        },
    },
    body: {
        type: "object",
        required: ["nomeCompleto", "nomeArtistico", "cpf", "dataNascimento"],
        properties: {
            nomeCompleto: { type: "string", minLength: 1 },
            nomeArtistico: { type: "string", minLength: 1 },
            cpf: { type: "string", minLength: 11 },
            dataNascimento: { type: "string", format: "date" },
        },
    },
};
exports.listarBailarinosSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string", format: "uuid" },
        },
    },
};
