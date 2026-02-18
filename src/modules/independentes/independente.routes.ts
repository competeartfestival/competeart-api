import { FastifyInstance } from "fastify";
import { criarIndependenteController } from "./independente.controller";
import {
  criarIndependenteSchema,
  independenteIdParamsSchema,
} from "./independente.schemas";
import {
  criarBailarinoIndependenteController,
  listarBailarinosIndependenteController,
} from "../bailarinos/bailarino.controller";
import {
  criarCoreografiaIndependenteController,
  listarCoreografiasIndependenteController,
} from "../coreografias/coreografia.controller";
import { resumoInscricaoIndependenteController } from "../resumo/resumo.controller";
import {
  criarBailarinoSchema,
  listarBailarinosSchema,
} from "../bailarinos/bailarino.schemas";
import {
  criarCoreografiaSchema,
  listarCoreografiasSchema,
} from "../coreografias/coreografia.schemas";
import { resumoInscricaoSchema } from "../resumo/resumo.schemas";

export async function independenteRoutes(app: FastifyInstance) {
  app.post(
    "/independentes",
    { schema: criarIndependenteSchema },
    (req, reply) => criarIndependenteController(app, req, reply),
  );

  app.post(
    "/independentes/:id/bailarinos",
    { schema: { ...criarBailarinoSchema, ...independenteIdParamsSchema } },
    (req, reply) => criarBailarinoIndependenteController(app, req, reply),
  );

  app.get(
    "/independentes/:id/bailarinos",
    { schema: { ...listarBailarinosSchema, ...independenteIdParamsSchema } },
    (req, reply) => listarBailarinosIndependenteController(app, req, reply),
  );

  app.post(
    "/independentes/:id/coreografias",
    { schema: { ...criarCoreografiaSchema, ...independenteIdParamsSchema } },
    (req, reply) => criarCoreografiaIndependenteController(app, req, reply),
  );

  app.get(
    "/independentes/:id/coreografias",
    { schema: { ...listarCoreografiasSchema, ...independenteIdParamsSchema } },
    (req, reply) => listarCoreografiasIndependenteController(app, req, reply),
  );

  app.get(
    "/independentes/:id/resumo",
    { schema: { ...resumoInscricaoSchema, ...independenteIdParamsSchema } },
    (req, reply) => resumoInscricaoIndependenteController(app, req, reply),
  );
}
