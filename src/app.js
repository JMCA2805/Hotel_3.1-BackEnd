var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const cron = require('node-cron');
const {enviarOferta} = require("./scripts/nodemailer")
const multer = require('multer');


///INICIALIZACIONES
var app = express();

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

cron.schedule('0 8 * * *', () => {
  enviarOferta()
}) 

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(`${__dirname}/uploads/`))


// ROUTES
const articulosRuta = require("./routes/articulos.js");
const authRutas = require("./routes/auth.js");
const reservarRuta = require("./routes/reservar");
const comentariosRuta = require("./routes/comentarios");

app.use("/articulos", articulosRuta);
app.use("/auth", authRutas);
app.use("/reservar", reservarRuta);
app.use("/comentarios", comentariosRuta);


module.exports = app;


