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

  buscarHabitaciones = async (filtro, busqueda, limite) => {
    try {
      let habitacionesEncontradas = [];
      let data;
      let imagenCompleta;
  
      if (filtro === 'Nombre') {
        habitacionesEncontradas = await habitaciones.find({ nombre: busqueda });
      } else if (filtro === 'Limite') {
        console.log(limite)
        const todasLasHabitaciones = await habitaciones.find({});
        for (let i = 0; i < todasLasHabitaciones.length; i++) {
          if (todasLasHabitaciones[i].cantidad >= limite) {
            habitacionesEncontradas.push(todasLasHabitaciones[i]);
          }
        }
        console.log(habitacionesEncontradas)
      }
  
      for (let i = 0; i < habitacionesEncontradas.length; i++) {
        data = habitacionesEncontradas[i].imagen.data;
        imagenCompleta =
          'data:' +
          habitacionesEncontradas[i].imagen.contentType +
          ';base64,' +
          data.toString('base64');
  
        habitacionesEncontradas[i] = {
          nombre: habitacionesEncontradas[i].nombre,
          descripcion: habitacionesEncontradas[i].descripcion,
          comodidades: habitacionesEncontradas[i].comodidades,
          imagen: imagenCompleta,
          tarifa: habitacionesEncontradas[i].tarifa,
          cantidad: habitacionesEncontradas[i].cantidad,
          review: habitacionesEncontradas[i].review,
        };
      }
  
      return habitacionesEncontradas;
    } catch (error) {
      console.log('Categoría incorrecta');
      throw new Error('Error al buscar habitaciones');
    }
  };
}



const habitacionesC = new habitacionesController();

module.exports = habitacionesC;
