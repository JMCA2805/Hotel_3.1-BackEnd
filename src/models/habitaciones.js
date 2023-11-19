const {Schema, model} = require('mongoose');

const habitacionesEsquema = new Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    comodidades: {
        type: Array,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    },
    tarifa: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    review: {
        type: Array
    }

},
{
    timestamps: true
});


const habitaciones = model('habitaciones', habitacionesEsquema);

// Exportar el modelo de usuario
module.exports = habitaciones;