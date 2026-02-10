import { FastifyInstance } from "fastify";
import { BailarinoService } from "./bailarino.service";

export async function criarBailarinoController(
  app: FastifyInstance,
  request: any,
  reply: any,
) {
  try {
    const service = new BailarinoService(app.prisma);

    const bailarino = await service.criar({
      escolaId: request.params.id,
      ...request.body,
    });

    reply.code(201).send({ id: bailarino.id });
  } catch (error: any) {
    if (error.message === "ESCOLA_NAO_ENCONTRADA") {
      reply.code(404).send({ message: "Escola não encontrada" });
      return;
    }

    if (error.code === "P2002") {
      reply.code(409).send({ message: "CPF já cadastrado" });
      return;
    }

    throw error;
  }
}
