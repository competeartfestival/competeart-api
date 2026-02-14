import { FastifyRequest, FastifyReply } from "fastify";

export async function adminAuth(request: FastifyRequest, reply: FastifyReply) {
  const adminKey = request.headers["x-admin-key"];

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return reply.status(401).send({
      message: "Não autorizado",
    });
  }
}
