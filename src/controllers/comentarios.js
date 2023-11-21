const Comentarios = require("../models/comentarios");

const agregarComentario = async (req, res) => {
  try {
    const { tipo, nombre, comentario } = req.body;

    const cmntr = {
      tipo,
      nombre,
      comentario,
    };

    if (!comentario) {
      res.status(500).send({ Error: "Porfavor ingrese un comentario" });
      return;
    }
    const nuevoComentario = new Comentarios(cmntr);

    nuevoComentario.save();

    res.status(200).send({ message: "¡Reseña Enviada con Exito!" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ Error: "Error al eviar la reseña" });
  }
};

const getComentario = async (req, res) => {
  try {
    const getComentarios = await Comentarios.find({})
      .sort({ _id: -1 })
      .limit(5);
    res.status(200).json(getComentarios);
  } catch (error) {
    res.status(500).send({ Error: "Error al obtener las reseñas" });
  }
};

const getComentarioHab = async (req, res) => {
  try {
    const getComentarios = await Comentarios.find();
    res.status(200).json(getComentarios);
  } catch (error) {
    res.status(500).send({ Error: "Error al obtener las reseñas" });
  }
};

const filComentarioHab = async (req, res) => {
  const {tipo}=req.body
  console.log(tipo)
  try {
    const getComentarios = await Comentarios.find({tipo:tipo});
    res.status(200).json(getComentarios);
  } catch (error) {
    res.status(500).send({ Error: "Error al obtener las reseñas" });
  }
};

module.exports = { agregarComentario, getComentario, getComentarioHab, filComentarioHab };
