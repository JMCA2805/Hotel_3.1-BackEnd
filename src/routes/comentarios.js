const express = require("express");
const router = express.Router();
const {agregarComentario,getComentario,getComentarioHab} = require('../controllers/comentarios.js')


router.post("/add", agregarComentario)
router.get("/get", getComentario)
router.get("/getHab", getComentarioHab)


module.exports = router;