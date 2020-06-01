// rutas para crear usuarios
const express= require('express')

// routing de express
const router = express.Router()

// importar controller
const usuarioController = require('../controllers/usuarioController')

// importar express validator
const {check} = require('express-validator')








// crear usuario- endpoint - api/usuarios
router.post('/', 
[
    check('nombre', 'Elnombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe de ser como minimo 6 caracteres').isLength({min: 6})
],

usuarioController.crearUsuario
)

module.exports = router