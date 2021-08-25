'use strict'

//const debug = require('debug')('planner:db:idu')
//const { queryOracle } = require('../util/oracledb')
//const moment = require('moment')

module.exports = function setupDepartamento(DepartamentoModel) {

    //todas las funciones que requiera consumir en el proyecto web 

    function findAll(){
        return DepartamentoModel.find({}).exec()
    }

    function create(departamento) {
        return DepartamentoModel.create(departamento)
    }

    function countData(){
        //const count = DepartamentoModel.estimatedDocumentCount()
        //console.log(count)
        return DepartamentoModel.estimatedDocumentCount()
    }

    return {
        findAll,
        create,
        countData
    }
}
