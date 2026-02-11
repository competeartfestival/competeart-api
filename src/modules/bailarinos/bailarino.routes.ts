import { FastifyInstance } from "fastify";
import { criarBailarinoController } from "./bailarino.controller";
import { criarBailarinoSchema } from "./bailarino.schemas";
import { listarBailarinosController } from "./bailarino.controller";
import { listarBailarinosSchema } from "./bailarino.schemas";

export async function bailarinoRoutes(app: FastifyInstance) {
  app.post(
    "/escolas/:id/bailarinos",
    { schema: criarBailarinoSchema },
    (req, reply) => criarBailarinoController(app, req, reply),
  );

  app.get(
    "/escolas/:id/bailarinos",
    { schema: listarBailarinosSchema },
    (req, reply) => listarBailarinosController(app, req, reply),
  );
}
