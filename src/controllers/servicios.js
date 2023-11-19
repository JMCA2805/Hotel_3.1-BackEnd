const Servicios = require("../models/servicios");

class ServiciosController {
  // Controlador para guardar un nuevo artículo
  agregarServicio = async (req, res) => {
    try {
      const { servicio, descripcion } = req.body;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;

      const tituloServicios = await Servicios.findOne({ servicio });

      if (tituloServicios) {
        res.status(400).send("Servicio ya registrada");
      } else {
        const nuevoServicio = new Servicios({
          servicio,
          descripcion,
          icono: { data: imagenBuffer, contentType },
        });
        await nuevoServicio.save();
        res.status(201).send("Servicio agregado correctamente");
      }
    } catch (error) {
      console.error("Error al agregar Servicios:", error);
      res.status(500).json({ Error: "Error al agregar Servicios" });
    }
  };

  obtenerServicios = async (req, res) => {
    try {
      const serviciosobt = await Servicios.find();
      let imagenCompleta;
      let data;
      let servicioss = [];

      for (let i = 0; i < serviciosobt.length; i++) {
        data = serviciosobt[i].imagen.data;
        imagenCompleta =
          "data:" +
          serviciosobt[i].imagen.contentType +
          ";base64," +
          data.toString("base64");
        console.log(data);

        servicioss[i] = {
          titulo: serviciosobt[i].titulo,
          texto: serviciosobt[i].texto,
          imagen: imagenCompleta,
        };
      }

      console.log(servicioss);

      if (servicioss.length === 0) {
        res.status(200).send("No hay servicios en la Base de Datos");
      } else {
        res.status(200).json(servicioss);
      }
    } catch (error) {
      res.status(500).json({ Error: "Error al obtener servicioss" });
    }
  };
}

const serviciosC = new ServiciosController();

module.exports = serviciosC;
