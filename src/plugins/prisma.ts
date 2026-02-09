import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

async function prismaPlugin(app: FastifyInstance) {
  app.decorate("prisma", prisma);

  app.addHook("onClose", async () => {
    await app.prisma.$disconnect();
  });
}

export default fp(prismaPlugin);
