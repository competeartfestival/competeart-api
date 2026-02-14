"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = adminAuth;
async function adminAuth(request, reply) {
    const adminKey = request.headers["x-admin-key"];
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
        return reply.status(401).send({
            message: "Não autorizado",
        });
    }
}
