export const criarIndependenteSchema = {
  body: {
    type: "object",
    required: ["nomeResponsavel", "email", "whatsapp", "limiteCoreografias"],
    properties: {
      nomeResponsavel: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      whatsapp: { type: "string", minLength: 8 },
      limiteCoreografias: { type: "integer", minimum: 1 },
    },
  },
};

export const independenteIdParamsSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
};
