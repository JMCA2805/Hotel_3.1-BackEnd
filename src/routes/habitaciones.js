const express = require("express");
const router = express.Router();
const controller = require('../controllers/habitaciones-c.js');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
    controller.obtenerHabitaciones(req, res);
});

router.post('/add', upload.single('imagen'), (req, res) => {
    controller.agregarHabitaciones(req, res);
});


router.post('/buscar', (req, res) => {
    const { filtro, busqueda, limite } = req.body;
    controller.buscarHabitaciones(filtro, busqueda, limite)
      .then((resultados) => {

        res.status(200).json( resultados); // Enviar resultados como un objeto
      })
      .catch((error) => {
        console.error("Error al buscar habitaciones:", error);
        res.status(500).json({ Error: "Error al buscar habitaciones" });
      });
  });


module.exports = router;
