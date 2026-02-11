import { FastifyInstance } from "fastify";
import { criarCoreografiaController } from "./coreografia.controller";
import { criarCoreografiaSchema } from "./coreografia.schemas";
import { listarCoreografiasController } from "./coreografia.controller";
import { listarCoreografiasSchema } from "./coreografia.schemas";

export async function coreografiaRoutes(app: FastifyInstance) {
  app.post(
    "/escolas/:id/coreografias",
    { schema: criarCoreografiaSchema },
    (req, reply) => criarCoreografiaController(app, req, reply),
  );

  app.get(
    "/escolas/:id/coreografias",
    { schema: listarCoreografiasSchema },
    (req, reply) => listarCoreografiasController(app, req, reply),
  );
}
