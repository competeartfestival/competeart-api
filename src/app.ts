import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import { escolaRoutes } from "./modules/escolas/escola.routes";
import { bailarinoRoutes } from "./modules/bailarinos/bailarino.routes";
import { coreografiaRoutes } from "./modules/coreografias/coreografia.routes";

export function buildApp() {
  const app = Fastify({ logger: true });

  // 1️⃣ plugins
  app.register(prismaPlugin);

  // 2️⃣ rotas
  app.register(escolaRoutes);
  app.register(bailarinoRoutes);
  app.register(coreografiaRoutes);

  app.get("/health", async () => {
    return { status: "ok" };
  });

  return app;
}
