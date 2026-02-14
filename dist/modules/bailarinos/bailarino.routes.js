"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bailarinoRoutes = bailarinoRoutes;
const bailarino_controller_1 = require("./bailarino.controller");
const bailarino_schemas_1 = require("./bailarino.schemas");
const bailarino_controller_2 = require("./bailarino.controller");
const bailarino_schemas_2 = require("./bailarino.schemas");
async function bailarinoRoutes(app) {
    app.post("/escolas/:id/bailarinos", { schema: bailarino_schemas_1.criarBailarinoSchema }, (req, reply) => (0, bailarino_controller_1.criarBailarinoController)(app, req, reply));
    app.get("/escolas/:id/bailarinos", { schema: bailarino_schemas_2.listarBailarinosSchema }, (req, reply) => (0, bailarino_controller_2.listarBailarinosController)(app, req, reply));
}
