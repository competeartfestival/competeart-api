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
  app.get("/admin/escolas/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const resumoService = new ResumoService(app.prisma);

    const resumo = await resumoService.gerar(id);

    return resumo;
  });
}
