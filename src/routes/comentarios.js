const express = require("express");
const router = express.Router();
const {agregarComentario,getComentario,getComentarioHab, filComentarioHab} = require('../controllers/comentarios.js')


router.post("/add", agregarComentario)
router.get("/get", getComentario)
router.get("/getHab", getComentarioHab)
router.post("/filHab", filComentarioHab)


module.exports = router;