const { model, Schema } = require("mongoose");

const ComentarioSchema = new Schema({
  nombre: { type: String, required: true },
  comentario: { type: String, required: true }
});

const comentarios = model("Comentarios", ComentarioSchema);

module.exports = comentarios