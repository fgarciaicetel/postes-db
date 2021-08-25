'use strict'

//const debug = require('debug')('planner:db:idu')
//const { queryOracle } = require('../util/oracledb')
//const moment = require('moment')

module.exports = function setupProvincia(ProvinciaModel) {

    //todas las funciones que requiera consumir en el proyecto web 

    function findAll(departamento){
        return ProvinciaModel.find({'departamento_codigo' : departamento}).exec()
    }

    function create(provincia) {
        return ProvinciaModel.create(provincia)
    }

    function countData(){
        return ProvinciaModel.estimatedDocumentCount()
    }

    return {
        findAll,
        create,
        countData
    }
}
