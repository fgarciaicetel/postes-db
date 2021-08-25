'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const provinciaSchema = new Schema({
    name: String,
    codigo : String,
    departamento_codigo : String,
    codigo_postal : String
},{
    versionKey: false
})

module.exports = (conn) => conn.model('provincia', provinciaSchema)