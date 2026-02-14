"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const prisma_1 = require("../lib/prisma");
async function prismaPlugin(app) {
    app.decorate("prisma", prisma_1.prisma);
    app.addHook("onClose", async () => {
        await app.prisma.$disconnect();
    });
}
exports.default = (0, fastify_plugin_1.default)(prismaPlugin);
