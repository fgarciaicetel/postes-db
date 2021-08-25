'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DistritoSchema = new Schema({
    name: String,
    codigo : String,
    departamento_codigo : String,
    provincia_codigo : String,
    codigo_postal : String
},{
    versionKey: false
})

module.exports = (conn) => conn.model('distrito', DistritoSchema)