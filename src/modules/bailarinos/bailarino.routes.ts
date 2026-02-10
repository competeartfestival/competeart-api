import { FastifyInstance } from "fastify";
import { criarBailarinoController } from "./bailarino.controller";
import { criarBailarinoSchema } from "./bailarino.schemas";

export async function bailarinoRoutes(app: FastifyInstance) {
  app.post(
    "/escolas/:id/bailarinos",
    { schema: criarBailarinoSchema },
    (req, reply) => criarBailarinoController(app, req, reply)
  );
}
