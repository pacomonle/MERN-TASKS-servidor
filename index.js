// imprtar servidor-  express
const express = require('express')
// importar conectarDB
const conectarDB = require('./config/db')
// importar cors
const cors = require('cors');
// crear servidor
const app = express()


// conectar a la base de datos
console.log('conectar', conectarDB())
conectarDB()

// habilitar cors
app.use(cors());

// habilitar express.json- para poder leer datos del usuario
app.use( express.json({extended: true }))


// crear puerto de la app
const port = process.env.port || 4000


// importar nuestras rutas - middleware
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app (servidor)
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})

// Definir pagina principal
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})