// rutas para crear auth - autenticar usuarios
const express= require('express')

// routing de express
const router = express.Router()

// importar controller
const authController = require('../controllers/authController');

// importar express validator
const {check} = require('express-validator')

// importar auth del middleware
const auth = require('../middleware/auth');



// endpoint - api/auth
// Iniciar sesión

router.post('/', 
    authController.autenticarUsuario
);

// Obtiene el usuario autenticado

 router.get('/',
    auth,
    authController.usuarioAutenticado
)


module.exports = router;