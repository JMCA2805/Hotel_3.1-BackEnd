const Usuario = require("../models/user.js");

const getUserById = async (req, res) => {
  const { _id } = req.user;

  if (_id.length === 24) {
    Usuario.findById(_id).then((usuario) => {
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