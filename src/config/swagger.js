const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitterbit Orders API",
      version: "1.0.0",
      description: "API para gerenciamento de pedidos - Teste Jitterbit",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Ì≥ò Swagger dispon√≠vel em: http://localhost:3000/docs");
}

module.exports = swaggerDocs;
