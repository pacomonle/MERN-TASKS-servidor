// importar JWT
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');
  console.log('token', token)
    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    }

    // validar el token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        // comprobar id- si esta autenticado se duarda en req.usuario
        console.log('id usuario', cifrado.usuario)
        req.usuario = cifrado.usuario;
       
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'});
    }
}