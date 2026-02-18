"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.independenteRoutes = independenteRoutes;
const independente_controller_1 = require("./independente.controller");
const independente_schemas_1 = require("./independente.schemas");
const bailarino_controller_1 = require("../bailarinos/bailarino.controller");
const coreografia_controller_1 = require("../coreografias/coreografia.controller");
const resumo_controller_1 = require("../resumo/resumo.controller");
const bailarino_schemas_1 = require("../bailarinos/bailarino.schemas");
const coreografia_schemas_1 = require("../coreografias/coreografia.schemas");
const resumo_schemas_1 = require("../resumo/resumo.schemas");
async function independenteRoutes(app) {
    app.post("/independentes", { schema: independente_schemas_1.criarIndependenteSchema }, (req, reply) => (0, independente_controller_1.criarIndependenteController)(app, req, reply));
    app.post("/independentes/:id/bailarinos", { schema: { ...bailarino_schemas_1.criarBailarinoSchema, ...independente_schemas_1.independenteIdParamsSchema } }, (req, reply) => (0, bailarino_controller_1.criarBailarinoIndependenteController)(app, req, reply));
    app.get("/independentes/:id/bailarinos", { schema: { ...bailarino_schemas_1.listarBailarinosSchema, ...independente_schemas_1.independenteIdParamsSchema } }, (req, reply) => (0, bailarino_controller_1.listarBailarinosIndependenteController)(app, req, reply));
    app.post("/independentes/:id/coreografias", { schema: { ...coreografia_schemas_1.criarCoreografiaSchema, ...independente_schemas_1.independenteIdParamsSchema } }, (req, reply) => (0, coreografia_controller_1.criarCoreografiaIndependenteController)(app, req, reply));
    app.get("/independentes/:id/coreografias", { schema: { ...coreografia_schemas_1.listarCoreografiasSchema, ...independente_schemas_1.independenteIdParamsSchema } }, (req, reply) => (0, coreografia_controller_1.listarCoreografiasIndependenteController)(app, req, reply));
    app.get("/independentes/:id/resumo", { schema: { ...resumo_schemas_1.resumoInscricaoSchema, ...independente_schemas_1.independenteIdParamsSchema } }, (req, reply) => (0, resumo_controller_1.resumoInscricaoIndependenteController)(app, req, reply));
}
