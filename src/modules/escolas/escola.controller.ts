import { FastifyInstance } from "fastify";
import { EscolaService } from "./escola.service";

export async function criarEscolaController(
  app: FastifyInstance,
  request: any,
  reply: any
) {
  const service = new EscolaService(app.prisma);
  const escola = await service.criar(request.body);

  reply.code(201).send({ id: escola.id });
}
