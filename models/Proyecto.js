// importar mongoose
const mongoose = require('mongoose')

// Definir Schema
const ProyectoSchema = mongoose.Schema({
   //nombre proyecto
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    //usuario - cada uno tiene su id - ObjectId - ref (del schema Usuario)
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    //fecha creacion
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);