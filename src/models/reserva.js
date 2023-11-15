const { model, Schema } = require("mongoose");

const reservaSchema = new Schema({
  idUsuario: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: {type: String, required: true},
  correo: { type: String, required: true },
  cedula: { type: String, required: true },
  telefono: { type: String, required: true },
  fechaEntrada: { type: Date, required: true },
  fechaSalida: { type: Date, required: true },
  nPersonas: { type: Number, required: true },
  tHabitacion: { type: String, required: true }

});

const reserva = model("Reservas", reservaSchema);

module.exports = reserva