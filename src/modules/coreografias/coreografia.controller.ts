import { FastifyInstance } from "fastify";
import { CoreografiaService } from "./coreografia.service";

export async function criarCoreografiaController(
  app: FastifyInstance,
  request: any,
  reply: any
) {
  try {
    const service = new CoreografiaService(app.prisma);

    const coreografia = await service.criar({
      escolaId: request.params.id,
      ...request.body,
    });

    reply.code(201).send({ id: coreografia.id });
  } catch (error: any) {
    if (error.message === "ESCOLA_NAO_ENCONTRADA") {
      reply.code(404).send({ message: "Escola não encontrada" });
      return;
    }

    if (error.message === "LIMITE_COREOGRAFIAS_ATINGIDO") {
      reply.code(400).send({ message: "Limite de coreografias atingido" });
      return;
    }

    if (error.message === "FORMACAO_INVALIDA") {
      reply.code(400).send({ message: "Formação incompatível com elenco" });
      return;
    }

    throw error;
  }
}
