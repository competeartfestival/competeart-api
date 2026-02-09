import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import { escolaRoutes } from "./modules/escolas/escola.routes";

export function buildApp() {
  const app = Fastify({ logger: true });

  // 1️⃣ plugins
  app.register(prismaPlugin);

  // 2️⃣ rotas
  app.register(escolaRoutes);

  app.get("/health", async () => {
    return { status: "ok" };
  });

  return app;
}
