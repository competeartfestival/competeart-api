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

  app.delete(
    "/admin/escolas/:id",
    { preHandler: adminAuth },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const service = new AdminEscolasService(prisma);

      try {
        await service.excluirInscricao(id);
      } catch (error: any) {
        if (error.message === "INSCRICAO_NAO_ENCONTRADA") {
          reply.code(404).send({ message: "Inscrição não encontrada" });
          return;
        }

        throw error;
      }

      reply.code(204).send();
    },
  );
}
