export const criarCoreografiaSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: {
    type: "object",
    required: [
      "nome",
      "nomeCoreografo",
      "nivelTecnico",
      "formacao",
      "modalidade",
      "categoria",
      "duracao",
      "musica",
      "temCenario",
      "bailarinosIds",
    ],
    properties: {
      nome: { type: "string", minLength: 1 },
      nomeCoreografo: { type: "string", minLength: 1 },

      nivelTecnico: {
        enum: ["INICIANTE", "AMADOR", "SEMI_PROFISSIONAL", "PROFISSIONAL"],
      },
      formacao: {
        enum: ["SOLO", "DUO", "TRIO", "GRUPO"],
      },
      modalidade: {
        enum: [
          "BALLET_CLASSICO",
          "BALLET_NEOCLASSICO",
          "JAZZ",
          "CONTEMPORANEO",
          "DANCAS_URBANAS",
          "SAPATEADO",
          "ESTILO_LIVRE",
          "OUTROS",
        ],
      },
      categoria: {
        enum: [
          "BABY",
          "INFANTIL_I",
          "INFANTIL_II",
          "JUVENIL_I",
          "JUVENIL_II",
          "ADULTO",
          "ADULTO_INICIANTE",
          "SENIOR",
          "MASTER",
        ],
      },

      duracao: { type: "string", minLength: 5 },
      musica: { type: "string", minLength: 1 },
      temCenario: { type: "boolean" },

      bailarinosIds: {
        type: "array",
        minItems: 1,
        items: { type: "string", format: "uuid" },
      },
    },
  },
};
