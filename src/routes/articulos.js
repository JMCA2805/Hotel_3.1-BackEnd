const express = require("express");
const router = express.Router();
const controller = require('../controllers/blog-c.js');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
    controller.obtenerArticulos(req, res);
});

router.post('/add', upload.single('imagen'), (req, res) => {
    controller.agregarArticulo(req, res);
});

router.delete('/delete', (req, res) => {
  controller.eliminarArticulo(req, res);
});

router.put('/update', upload.single('nuevaImagen'), (req, res) => {
  controller.editarArticulo(req, res);
});




module.exports = router;
