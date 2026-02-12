import Fastify from "fastify";
import cors from "@fastify/cors";
import prismaPlugin from "./plugins/prisma";
import { escolaRoutes } from "./modules/escolas/escola.routes";
import { bailarinoRoutes } from "./modules/bailarinos/bailarino.routes";
import { coreografiaRoutes } from "./modules/coreografias/coreografia.routes";
import { resumoRoutes } from "./modules/resumo/resumo.routes";

export function buildApp() {
  const app = Fastify({ logger: true });
  app.register(cors, {
    origin: "http://localhost:5173",
  });
  app.register(prismaPlugin);

  app.register(escolaRoutes);
  app.register(bailarinoRoutes);
  app.register(coreografiaRoutes);
  app.register(resumoRoutes);

  app.get("/health", async () => {
    return { status: "ok" };
  });

  return app;
}
