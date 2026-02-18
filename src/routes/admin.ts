import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdminEscolasService } from "../services/AdminEscolasService";
import { ResumoService } from "../modules/resumo/resumo.service";
import { adminAuth } from "../middlewares/adminAuth";

export async function adminRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient();

  app.get("/admin/escolas", { preHandler: adminAuth }, async () => {
    const service = new AdminEscolasService(prisma);
    return service.listar();
  });
  app.get("/admin/escolas/:id", { preHandler: adminAuth }, async (request) => {
    const { id } = request.params as { id: string };
    const resumoService = new ResumoService(app.prisma);
    try {
      return await resumoService.gerar(id);
    } catch (error: any) {
      if (error.message !== "ESCOLA_NAO_ENCONTRADA") {
        throw error;
      }
    }

    return resumoService.gerarIndependente(id);
  });
}
