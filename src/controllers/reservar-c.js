const Reservas = require("../models/reserva.js");

const enviarEmail = require("../scripts/nodemailer")

class reservasController {

    agregarReserva = async (req, res) => {
  try {

    const { nombre, apellido, cedula, correo, telefono, fechaEntrada, fechaSalida, nPersonas, tHabitacion } = req.body
    
    const reserva = {
        idUsuario: "12485486571",
        nombre,
        apellido,
        cedula,
        correo ,
        telefono,
        fechaEntrada,
        fechaSalida,
        nPersonas,
        tHabitacion
    }

    enviarEmail(reserva)

    const nuevaReserva = new Reservas(reserva)

    nuevaReserva.save()

    res.status(200).send('Agregado correctamente')

  } catch (error) {
    res.status(500).send({ Error: 'Error agregar la reserva' });
  }; 
}

};
/*
{ 
    "nombre": "Jose", 
    "apellido": "Escalonaa", 
    "cedula": "28206133", 
    "correo": "jose.al.es301@gmail.com", 
    "telefono": "04146528096", 
    "fechaEntrada": "2023-11-16", 
    "fechaSalida": "2023-11-19", 
    "nPersonas": 2, 
    "tHabitacion": "Matrimonial" 
}*/

const reservarC = new reservasController();

module.exports = reservarC;