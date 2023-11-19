const Comentarios = require("../models/comentarios");

const agregarComentario = async (req, res) => {
  try {
    const { nombre, comentario } = req.body;

    const cmntr = {
      nombre,
      comentario,
    };

    if(!comentario){
      res.status(500).send({ Error: "Porfavor ingrese un comentario" });
      return
    }
    const nuevoComentario = new Comentarios(cmntr);

    nuevoComentario.save();

    res.status(200).send({message:"¡Reseña Enviada con Exito!"});
  } catch (error) {
    console.log(error)

    res.status(500).send({ Error: "Error al eviar la reseña" });
  }
};

module.exports = agregarComentario;
