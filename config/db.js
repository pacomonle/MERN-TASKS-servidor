// importar mongoose
const mongoose = require('mongoose')
// importar variables de entorno - dotenv
require('dotenv').config({path: 'variables.env'})

// conectar base datos
const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
           useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB conectada')
    } catch (error) {
        console.log(error)
        process.exit(1) // detener la app si hay error de conexion
    }
}



// Exportar modulo (fichero actual) -> para poder usar app fuera de este archivo
module.exports = conectarDB;