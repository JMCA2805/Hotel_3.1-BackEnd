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

    editarHabitacion = async (req, res) => {
    try {
      const { nombre, descripcion, tarifa, cantidad, nombreviejo} = req.body;
  
      const imagenBuffer = req.file ? req.file.buffer : undefined;
      const contentType = req.file ? req.file.mimetype : undefined;

  
      const habitacion = await habitaciones.findOne({ nombre: nombreviejo });
      
      console.log(habitacion)
  
      if (!habitacion) {
        return res.status(404).json({ mensaje: "Habitacion no encontrada" });
      }
  
      // Elimina la imagen existente del sistema de archivos
  
      // Actualiza los datos del artículo
      if (nombre) {
        habitacion.nombre = nombre;
      }
      if (descripcion) {
        habitacion.descripcion = descripcion;
      }
      if (tarifa) {
        habitacion.tarifa = tarifa;
      }
      if (cantidad) {
        habitacion.cantidad = cantidad;
      }
      if (imagenBuffer && contentType) {
        habitacion.imagen = { data: imagenBuffer, contentType };
      }
  
      await habitacion.save();


      const imagenCompleta =
      "data:" + habitacion.imagen.contentType + ";base64," + habitacion.imagen.data.toString("base64");
  
      res.json({ mensaje: "Habitación editada correctamente", imagen: imagenCompleta });
    } catch (error) {
      console.error("Error al editar la habitación:", error);
      res.status(500).json({ mensaje: "Error al editar la habitación" });
    }
  };

  eliminarHabitacion = async (req, res) => {
    try {
      const nombre = req.body.nombre;

      const habitacion = await habitaciones.findOne({ nombre: nombre });
      if (!habitacion) {
        return res.status(404).json({ mensaje: 'habitaciones no encontrado' });
      }

      await habitaciones.deleteOne({'nombre': nombre});

      res.json({ mensaje: 'Producto eliminado correctamente' });
      
    } catch (error) {
      console.error('Error al eliminar el habitacion', error);
      res.status(500).json({ mensaje: 'Error al eliminar el habitacion' });
    }
  };
}



const habitacionesC = new habitacionesController();

module.exports = habitacionesC;
