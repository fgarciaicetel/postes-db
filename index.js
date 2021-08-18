'use strict'

const debug = require('debug')('planner:db:index')

/** Methods */
const setupDatabase = require('./lib/db')

const setupIdu = require('./lib/idu')

module.exports = async function(config) {
    /** Connect Mongo */
    const conn = await setupDatabase(config)

    //con la conexion creada a mongodb instanciar el modelo de mongoose
    const IduModel = require('./models/idu')(conn)

    //le pasamos el modelo ya conectado a la db y nos devuelve un object con todas las funciones que necesitamos, findALL, findByID, etc
    const Idu = setupIdu(IduModel)

    return {
        Idu,
    }
}
