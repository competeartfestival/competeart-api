import { FastifyInstance } from "fastify";
import { IndependenteService } from "./independente.service";

export async function criarIndependenteController(
  app: FastifyInstance,
  request: any,
  reply: any,
) {
  const service = new IndependenteService(app.prisma);
  const inscricao = await service.criar(request.body);

  reply.code(201).send({ id: inscricao.id });
}
