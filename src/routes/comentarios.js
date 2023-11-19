const express = require("express");
const router = express.Router();
const agregarComentario = require('../controllers/comentarios.js')


router.post("/add", agregarComentario)


module.exports = router;