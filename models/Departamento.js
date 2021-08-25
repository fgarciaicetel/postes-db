'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departamentoSchema = new Schema({
    name: String,
    codigo : String
},{
    versionKey: false
})

module.exports = (conn) => conn.model('departamento', departamentoSchema)