"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const escola_routes_1 = require("./modules/escolas/escola.routes");
const bailarino_routes_1 = require("./modules/bailarinos/bailarino.routes");
const coreografia_routes_1 = require("./modules/coreografias/coreografia.routes");
const resumo_routes_1 = require("./modules/resumo/resumo.routes");
const admin_1 = require("./routes/admin");
const independente_routes_1 = require("./modules/independentes/independente.routes");
function buildApp() {
    const app = (0, fastify_1.default)({ logger: true });
    app.register(cors_1.default, {
        origin: [
            "http://localhost:5173",
            "https://competeart-web.vercel.app",
            "https://competeartfestival.com.br",
            "https://www.competeartfestival.com.br",
        ],
    });
    app.register(prisma_1.default);
    app.register(escola_routes_1.escolaRoutes);
    app.register(bailarino_routes_1.bailarinoRoutes);
    app.register(coreografia_routes_1.coreografiaRoutes);
    app.register(resumo_routes_1.resumoRoutes);
    app.register(independente_routes_1.independenteRoutes);
    app.register(admin_1.adminRoutes);
    app.get("/", async () => {
        return { status: "ok" };
    });
    app.get("/health", async () => {
        return { status: "ok" };
    });
    return app;
}
