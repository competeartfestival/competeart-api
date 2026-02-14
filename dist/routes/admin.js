"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = adminRoutes;
const client_1 = require("@prisma/client");
const AdminEscolasService_1 = require("../services/AdminEscolasService");
const resumo_service_1 = require("../modules/resumo/resumo.service");
const adminAuth_1 = require("../middlewares/adminAuth");
async function adminRoutes(app) {
    const prisma = new client_1.PrismaClient();
    app.get("/admin/escolas", { preHandler: adminAuth_1.adminAuth }, async () => {
        const service = new AdminEscolasService_1.AdminEscolasService(prisma);
        return service.listar();
    });
    app.get("/admin/escolas/:id", async (request, reply) => {
        const { id } = request.params;
        const resumoService = new resumo_service_1.ResumoService(app.prisma);
        const resumo = await resumoService.gerar(id);
        return resumo;
    });
}
