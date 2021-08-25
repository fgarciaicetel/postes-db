'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const posteSchema = new Schema({
    item: String,
    proyecto: String,
    ne: String,
    contratista: String,
    descripcion: String,
    marca: String,
    tipo_piso: String,
    direccion: String,
    lote: String,
    distrito: String,
    provincia: String,
    departamento: String,
    latitud: String,
    longitud: String,
    altura: String,
    codigo_departamento: String,
    codigo_distrito: String,
    codigo_provincia: String,
    codigo_poste: Number,
    codigo_final: String,
    responsable: String,
    fecha_asignacion: String,
}, {
    timestamps : true,
    versionKey: false
})



module.exports = (conn) => conn.model('postes', posteSchema)
