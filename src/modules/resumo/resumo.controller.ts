import { FastifyInstance } from "fastify";
import { ResumoService } from "./resumo.service";

export async function resumoInscricaoController(
  app: FastifyInstance,
  request: any,
  reply: any
) {
  try {
    const service = new ResumoService(app.prisma);
    const resumo = await service.gerar(request.params.id);

    reply.send(resumo);
  } catch (error: any) {
    if (error.message === "ESCOLA_NAO_ENCONTRADA") {
      reply.code(404).send({ message: "Escola não encontrada" });
      return;
    }

    throw error;
  }
}
