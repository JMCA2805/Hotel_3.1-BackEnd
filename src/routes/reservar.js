const express = require("express");
const router = express.Router();
const controller = require('../controllers/reservar-c.js')


router.post("/", controller.agregarReserva)
router.get("/get", controller.obtenerReservas)
router.put("/editar", controller.editarReserva)

router.delete('/eliminar', (req, res) => {
    controller.eliminarReserva (req, res);
  });



module.exports = router;
