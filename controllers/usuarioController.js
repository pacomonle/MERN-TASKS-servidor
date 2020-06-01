// importar el modelo
const Usuario = require('../models/Usuario')
// importar dependencia para hashear el password
const bcryptjs = require('bcryptjs')
// importar resultado validaciones
const {validationResult} = require('express-validator')
// importar jsonwebtoken
const jwt = require('jsonwebtoken')









exports.crearUsuario = async(req, res) => {
// console.log('req', req.body) - con req.body se accede a los valores 

// comprobar validaciones- revisar errores
const errores = validationResult(req)
if(!errores.isEmpty()){
return res.status(400).json({errores: errores.array()})
}


// extraer email y password
const {email, password} = req.body
console.log('req', email, password)

try {
    // VALIDACIONES - comprobar que el usuario es unico
  let usuario = await Usuario.findOne({email})

  if(usuario){
      return res.status(400).json({msg: 'El usuario ya existe'})
  }
  
    // crear el nuevo usuario 
      usuario = new Usuario(req.body)
    // Hashear el password
     const salt = await bcryptjs.genSalt(10) 
     usuario.password= await bcryptjs.hash(password, salt) 
    // guardar el nuevo usuario
    await usuario.save()
    // crear y firmar JWT
    const payload= {
        usuario: {
            id: usuario.id
        }
    }
    // firmar JWT (token)
    jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 3600000  // segundos
    }, (error, token) => {
        if(error) throw error
    // mensaje confirmacion   
        res.json({token: token})
        
    })

    // mensaje confirmacion   
  //  res.json({msg: 'Usuario creado correctamente'})
// res.send('Usuario creado correctamente')


} catch (error) {
    console.log(error)
    res.status(400).send('Hubo un error')
}

}