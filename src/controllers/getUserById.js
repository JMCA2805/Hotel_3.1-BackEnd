const Usuario = require("../models/user.js");

const getUserById = async (req, res) => {
  const { id } = req.params; // Accede al ID de usuario desde los parámetros de la ruta
  console.log(id);

  if (id) {
    Usuario.findById(id).then((usuario) => {
      if (!usuario) {
        return res.json({
          mensaje: "No se encontró ningún usuario con ese ID",
        });
      } else {
        const { _id, contraseña, __v, ...resto } = usuario._doc;
        res.json(resto);
      }
    });
  } else {
    res.json({ mensaje: "Estás enviando un ID incorrecto" });
  }
};

module.exports = getUserById;