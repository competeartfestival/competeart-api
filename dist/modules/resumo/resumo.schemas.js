"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumoInscricaoSchema = void 0;
exports.resumoInscricaoSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "string", format: "uuid" },
        },
    },
};
