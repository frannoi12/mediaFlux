import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Media",
            version: "1.0.0",
            description: "API pour la gestion des médias",
        },
        servers: [
            {
                url: process.env.API_URL || "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                Media: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID unique du média",
                        },
                        title: {
                            type: "string",
                            description: "Titre unique du média",
                        },
                        description: {
                            type: "string",
                            description: "Description optionnelle du média",
                        },
                        mediaPath: {
                            type: "string",
                            description: "Chemin du fichier média",
                        },
                        status: {
                            type: "boolean",
                            description: "Statut du média (actif ou inactif)",
                            default: false,
                        },
                    },
                    required: ["title", "mediaPath"], // Champs obligatoires
                },
            },
        },
    },

    
    
    apis: ["./MediaRouter.js"], // Chemin vers vos routes avec documentation Swagger
};

const swaggerSpec = swaggerJsDoc(options);

export function swaggerDocs(app) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
