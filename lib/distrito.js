'use strict'

//const debug = require('debug')('planner:db:idu')
//const { queryOracle } = require('../util/oracledb')
//const moment = require('moment')

module.exports = function setupDistrito(DistritoModel) {

    //todas las funciones que requiera consumir en el proyecto web 

    function findAll(departamento, provincia){
        return DistritoModel.find({'departamento_codigo' : departamento, 'provincia_codigo' : provincia}).exec()
    }

    function create(distrito) {
        return DistritoModel.create(distrito)
    }

    function countData(){
        return DistritoModel.estimatedDocumentCount()
    }

    return {
        findAll,
        create,
        countData
    }
}
