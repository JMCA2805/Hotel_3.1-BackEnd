const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  descripcion: { type: String },
  telefono: { type: Number },
  rol: { type: String, required: true },
  imagen: { data: Buffer, contentType: String },
});

const Usuario = model("Usuario", UsuarioSchema);

module.exports = Usuario;