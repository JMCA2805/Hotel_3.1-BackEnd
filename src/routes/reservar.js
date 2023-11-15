const express = require("express");
const router = express.Router();
const controller = require('../controllers/reservar-c.js')


router.post("/", controller.agregarReserva)
router.get("/get", controller.obtenerReservas)


module.exports = router;
