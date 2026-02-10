import { FastifyInstance } from "fastify";
import { criarCoreografiaController } from "./coreografia.controller";
import { criarCoreografiaSchema } from "./coreografia.schemas";

export async function coreografiaRoutes(app: FastifyInstance) {
  app.post(
    "/escolas/:id/coreografias",
    { schema: criarCoreografiaSchema },
    (req, reply) => criarCoreografiaController(app, req, reply)
  );
}
