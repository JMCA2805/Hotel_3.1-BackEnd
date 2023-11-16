const express = require("express");
const router = express.Router();
const register = require("../controllers/register.js")
const getUserById = require("../controllers/getUserById.js")
const login = require("../controllers/login.js")
const verifyToken = require("../middlewares/verifytoken.js")
const controller = require('../controllers/user-c.js');
const decodetoken = require('../middlewares/decodetoken')




router.post("/register", register);
router.get("/decode", decodetoken)

router.get("/users", controller.obtenerUsuarios)


router.put('/users/editar/', (req, res) => {
    controller.editarUsuario(req, res);
  });
  
router.get('/user/:id', verifyToken, getUserById);
router.post("/login", login);
router.get('/user/:id', verifyToken, getUserById);




module.exports = router;

