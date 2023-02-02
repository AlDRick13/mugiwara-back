// importamos las dos depencias que acabamos de instalar
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0", // standar open Api que estamos usando
    info: {
      title: "Aplication",
      version: "1.0.0",
      description: "Proyecto de Academlo",
    },
    server: [
      {
        url: 'http://localhost:8000'
      }
    ]
  },
  apis: [
    "./src/auth/auth.routes.js",
    "./src/routes/publications_types.routes.js",
    "./src/routes/publication.routes.js",
    "./src/routes/user.routes.js",
    "./src/routes/city.routes.js",
    "./src/routes/state.routes.js",
    "./database/models/users.js",

  ],
};

const swaggerSpec = swaggerJSDoc(options);

// función para configruar la documentación
// dos parametros --> app expres, port donde se ejecuta
const swaggerDocs = (app, port) => {
  // manejador para la ruta de nuestra documentación
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // podemos definir nuestra documentación en formato json
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("ContentType", "application/json");
    res.send(swaggerSpec);
  });
  //
  console.log(
    `Documentación disponible en http://localhost:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs; // donde iniciamos nuestro servidor
// app.listen
