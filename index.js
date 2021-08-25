'use strict'

//const debug = require('debug')('planner:db:index')

/** Methods */
const setupDatabase = require('./lib/db')

const setupPoste = require('./lib/poste')
const setupDepartamento = require('./lib/departamento')
const setupProvincia = require('./lib/provincia')
const setupDistrito = require('./lib/distrito')
const setupCamara = require('./lib/camara')

module.exports = async function(config) {
    /** Connect Mongo */
  
    const conn = await setupDatabase(config)

    //con la conexion creada a mongodb instanciar el modelo de mongoose
    const PosteModel = require('./models/poste')(conn)
    const DepartamentoModel = require('./models/Departamento')(conn)
    const ProvinciaModel = require('./models/Provincia')(conn)
    const DistritoModel = require('./models/Distrito')(conn)
    const CamaraModel = require('./models/Camara')(conn)

    //le pasamos el modelo ya conectado a la db y nos devuelve un object con todas las funciones que necesitamos, findALL, findByID, etc
    const Poste = setupPoste(PosteModel)
    const Departamento = setupDepartamento(DepartamentoModel)
    const Provincia = setupProvincia(ProvinciaModel)
    const Distrito = setupDistrito(DistritoModel)
    const Camara = setupCamara(CamaraModel)

    return {
        Poste,
        Departamento,
        Provincia,
        Distrito,
        Camara
    }
}
