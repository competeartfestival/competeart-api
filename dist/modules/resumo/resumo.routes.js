"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumoRoutes = resumoRoutes;
const resumo_controller_1 = require("./resumo.controller");
const resumo_schemas_1 = require("./resumo.schemas");
async function resumoRoutes(app) {
    app.get("/escolas/:id/resumo", { schema: resumo_schemas_1.resumoInscricaoSchema }, (req, reply) => (0, resumo_controller_1.resumoInscricaoController)(app, req, reply));
}
