import { FastifyInstance } from "fastify";
import { criarEscolaController } from "./escola.controller";
import { criarEscolaSchema } from "./escola.schemas";

export async function escolaRoutes(app: FastifyInstance) {
  app.post(
    "/escolas",
    { schema: criarEscolaSchema },
    (req, reply) => criarEscolaController(app, req, reply)
  );
}
