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


module.exports = router;
