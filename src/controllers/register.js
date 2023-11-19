const bcrypt = require("bcrypt");
const Usuario = require("../models/user.js");

const register = async (req, res) => {
  const { nombre, apellido, correo } = req.body;
  const contraseña = req.body.contraseña;

  console.log(contraseña)

  const imagenBuffer = req.file.buffer;
  const contentType = req.file.mimetype;

  Usuario.findOne({ correo }).then((usuario) => {
    if (usuario) {
      return res.status(400).json({ error: "Email already exists" });
    } else if (!nombre || !apellido || !correo || !contraseña || !imagenBuffer) {
      return res.json({ mensaje: "Falta el nombre / apellido / correo / contraseña / imagen" });
    } else {
      bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
        if (error) {
          return res.status(500).json({ error: "Error al hashear la contraseña" });
        } else {
          const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            correo,
            contraseña: contraseñaHasheada,
            rol: "usuario",
            imagen: { data: imagenBuffer, contentType },
          });

          nuevoUsuario
            .save()
            .then((usuarioGuardado) => {
              res.json({ mensaje: "Usuario creado correctamente", usuario: usuarioGuardado });
            })
            .catch((error) => {
              res.status(500).json({ error: "Error al guardar el usuario" });
            });
        }
      });
    }
  });
};

module.exports = register;