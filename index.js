const express = require("express");
// const swaggerUi = require('swagger-ui-express');  // Descomentar para usar swagger docs de rutas  
// const swaggerDocument = require('./swagger.json');// Descomentar para usar swagger docs de rutas
const app = express(); // Inicializar servidor
const port = 3000;
// const path = require('path'); // Descomentar para usar jsdoc

//Importar middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status - :response-time ms :body'));

// Rutas
const rutasUsuarios = require('./routes/usuarios.routes');
const rutasFavortios = require('./routes/favoritos.routes');


app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({ extended: true }));

// CONFIGURACIÓN DE VISTAS PUG -- Motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public')); // Habilito la carpeta public para archivos estáticos

//Rutas API
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/favoritos', rutasFavortios);
//Rutas Web

//Rutas Views

//http://localhost:3000/api-docs/
//  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Habilitando ruta para docs swagger
//  //http://localhost:3000/api-jsdoc/
//  app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));

//Invocar middleware
app.use(error404); //Middleware para manejo de 404

app.listen(port, () => { // Servidor está escuchando en este puerto variable port
    console.log(`Example app listening on http://localhost:${port}`);
});