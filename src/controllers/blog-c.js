const { json } = require("body-parser");
const articulos = require("../models/articulos");

class articulosController {
  // Controlador para guardar un nuevo artículo
  agregarArticulo = async (req, res) => {
    try {
      const { titulo, texto } = req.body;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;

      const tituloArticulos = await articulos.findOne({ titulo });

      if (tituloArticulos) {
        res.status(400).send("Publicación ya registrada");
      } else {
        const nuevoarticulo = new articulos({
          titulo,
          texto,
          imagen: { data: imagenBuffer, contentType },
        });
        await nuevoarticulo.save();
        res.status(201).send("Producto agregado correctamente");
      }
    } catch (error) {
      console.error("Error al agregar articulos:", error);
      res.status(500).json({ Error: "Error al agregar articulos" });
    }
  };

  obtenerArticulos = async (req, res) => {
    try {
      const articulosscom = await articulos.find();
      let imagenCompleta;
      let data;
      let articuloss = [];

      for (let i = 0; i < articulosscom.length; i++) {
        data = articulosscom[i].imagen.data;
        imagenCompleta =
          "data:" +
          articulosscom[i].imagen.contentType +
          ";base64," +
          data.toString("base64");
        console.log(data);

        articuloss[i] = {
          titulo: articulosscom[i].titulo,
          texto: articulosscom[i].texto,
          imagen: imagenCompleta,
        };
      }

      console.log(articuloss);

      if (articuloss.length === 0) {
        res.status(200).send("No hay articuloss en la Base de Datos");
      } else {
        res.status(200).json(articuloss);
      }
    } catch (error) {
      res.status(500).json({ Error: "Error al obtener articuloss" });
    }
  };
}

const articulosC = new articulosController();

module.exports = articulosC;
