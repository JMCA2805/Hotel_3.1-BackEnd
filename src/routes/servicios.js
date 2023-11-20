const express = require("express");
const router = express.Router();
const controller = require('../controllers/servicios');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: multer.memoryStorage() });


router.get('/', (req, res) => {
    controller.obtenerServicios(req, res);
  });


router.post('/add', upload.single('icono'), (req, res) => {
    controller.agregarServicio(req, res);
});

router.delete('/delete', (req, res) => {
  controller.eliminarServicio(req, res);
});
module.exports = router;
