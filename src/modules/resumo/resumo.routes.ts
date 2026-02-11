import { FastifyInstance } from "fastify";
import { resumoInscricaoController } from "./resumo.controller";
import { resumoInscricaoSchema } from "./resumo.schemas";

export async function resumoRoutes(app: FastifyInstance) {
  app.get(
    "/escolas/:id/resumo",
    { schema: resumoInscricaoSchema },
    (req, reply) => resumoInscricaoController(app, req, reply)
  );
}
