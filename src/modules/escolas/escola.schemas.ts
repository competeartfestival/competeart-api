export const criarEscolaSchema = {
  body: {
    type: "object",
    required: [
      "nome",
      "endereco",
      "email",
      "whatsapp",
      "nomeDiretor",
      "limiteCoreografias",
      "profissionais",
    ],
    properties: {
      nome: { type: "string", minLength: 1 },
      endereco: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      whatsapp: { type: "string", minLength: 8 },
      nomeDiretor: { type: "string", minLength: 1 },
      limiteCoreografias: { type: "integer", minimum: 1 },
      profissionais: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          required: ["nome", "funcao"],
          properties: {
            nome: { type: "string", minLength: 1 },
            funcao: { enum: ["ASSISTENTE", "COREOGRAFO"] },
          },
        },
      },
    },
  },
};
