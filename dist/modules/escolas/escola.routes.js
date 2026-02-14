"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escolaRoutes = escolaRoutes;
const escola_controller_1 = require("./escola.controller");
const escola_schemas_1 = require("./escola.schemas");
async function escolaRoutes(app) {
    app.post("/escolas", { schema: escola_schemas_1.criarEscolaSchema }, (req, reply) => (0, escola_controller_1.criarEscolaController)(app, req, reply));
}
