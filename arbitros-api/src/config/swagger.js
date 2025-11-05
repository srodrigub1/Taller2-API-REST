import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Árbitros (Express)",
      version: "1.0.0",
      description: "API REST de Árbitros en Node/Express que consume la API de Spring Boot",
    },
    servers: [
      { url: "http://localhost:3000", description: "Desarrollo local" }
    ]
  },
  apis: ["./src/routes/*.js"],
};

export const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/", (req, res) => res.redirect("/api-docs"));
};