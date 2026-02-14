"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreografiaRoutes = coreografiaRoutes;
const coreografia_controller_1 = require("./coreografia.controller");
const coreografia_schemas_1 = require("./coreografia.schemas");
const coreografia_controller_2 = require("./coreografia.controller");
const coreografia_schemas_2 = require("./coreografia.schemas");
async function coreografiaRoutes(app) {
    app.post("/escolas/:id/coreografias", { schema: coreografia_schemas_1.criarCoreografiaSchema }, (req, reply) => (0, coreografia_controller_1.criarCoreografiaController)(app, req, reply));
    app.get("/escolas/:id/coreografias", { schema: coreografia_schemas_2.listarCoreografiasSchema }, (req, reply) => (0, coreografia_controller_2.listarCoreografiasController)(app, req, reply));
}
