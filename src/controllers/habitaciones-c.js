const habitaciones = require("../models/habitaciones");

class habitacionesController {
  // Controlador para guardar una nueva Habitacion
  agregarHabitaciones = async (req, res) => {
    try {
      const { nombre, descripcion, tarifa, comodidades, cantidad } = req.body;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;
        const arrayComodidades = JSON.parse(comodidades);

      const nombreHabitaciones = await habitaciones.findOne({ nombre });

      if (nombreHabitaciones) {
        res.status(400).send("Habiración ya registrada");
      } else {
        const nuevaHabitacion = new habitaciones({
            nombre,
            descripcion,
            comodidades: arrayComodidades,
            imagen: { data: imagenBuffer, contentType },
            tarifa,
            cantidad
        });

        await nuevaHabitacion.save();
        res.status(201).send("Habitación agregada correctamente");
      }
    } catch (error) {
      console.error("Error al agregar habitación:", error);
      res.status(500).json({ Error: "Error al agregar habitación" });
    }
  };

  obtenerHabitaciones = async (req, res) => {
    try {
      const habitacionesT = await habitaciones.find();
      let imagenCompleta;
      let data;
      let habitacioness = [];

      for (let i = 0; i < habitacionesT.length; i++) {
        data = habitacionesT[i].imagen.data;
        imagenCompleta =
          "data:" +
          habitacionesT[i].imagen.contentType +
          ";base64," +
          data.toString("base64");

        habitacioness[i] = {
          nombre: habitacionesT[i].nombre,
          descripcion: habitacionesT[i].descripcion,
          tarifa: habitacionesT[i].tarifa,
          comodidades: habitacionesT[i].comodidades,
          imagen: imagenCompleta,
          cantidad: habitacionesT[i].cantidad,
        };
      }

      if (habitacioness.length === 0) {
        res.status(200).send("No hay Habitaciones en la Base de Datos");
      } else {
        res.status(200).json(habitacioness);
      }
    } catch (error) {
      res.status(500).json({ Error: "Error al obtener Habitaciones" });
    }
  };
}

const habitacionesC = new habitacionesController();

module.exports = habitacionesC;
