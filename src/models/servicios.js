const { model, Schema } = require("mongoose");

const serviciosSchema = new Schema({
  icono: { data: Buffer, contentType: String },
  servicio: { type: String, required: true },
  descripcion: { type: String, required: true },
});

const servicios = model("Servicios", serviciosSchema);

module.exports = servicios;
