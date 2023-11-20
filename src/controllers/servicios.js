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
        data = serviciosobt[i].icono.data;
        imagenCompleta =
          "data:" +
          serviciosobt[i].icono.contentType +
          ";base64," +
          data.toString("base64");

        servicioss[i] = {
          servicio: serviciosobt[i].servicio,
          descripcion: serviciosobt[i].descripcion,
          imagen: imagenCompleta,
        };
      }
      
      if (servicioss.length === 0) {
        res.status(200).send("");
      } else {
        res.status(200).json(servicioss);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: "Error al obtener servicioss" });
    }
  };

  eliminarServicio = async (req, res) => {
    try {
      const servicio = req.body.servicio;
      const ser = await Servicios.findOne({ "servicio": servicio });
      if (!ser) {
        return res.status(404).json({ mensaje: 'servicio no encontrado' });
      }

      await Servicios.deleteOne({'servicio': servicio});

      res.json({ mensaje: 'Servicios eliminado correctamente' });
      
    } catch (error) {
      console.error('Error al eliminar el servicio', error);
      res.status(500).json({ mensaje: 'Error al eliminar el servicio' });
    }
  };
}

const serviciosC = new ServiciosController();

module.exports = serviciosC;
