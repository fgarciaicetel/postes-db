'use strict'

//const debug = require('debug')('planner:db:idu')
//const { queryOracle } = require('../util/oracledb')
//const moment = require('moment')

module.exports = function setupPoste(PosteModel) {

    //todas las funciones que requiera consumir en el proyecto web 

    function findAll(){
        return PosteModel.find({}).exec()
    }

    function create(poste) {
        return PosteModel.create(poste)
    }

    async function update(mId, posteFields) {
        // verificando que la id existe
        const existsPoste = await PosteModel.findById(mId)
        if (!existsPoste) {
            throw [
                {
                    location: 'body',
                    param: 'id',
                    msg: "The NE doesn't exist."
                }
            ]
        }
        // guardando los campos de la idu
        await PosteModel.findByIdAndUpdate(mId, posteFields, {
            runValidators: true
        })
        return PosteModel.findById(mId)
    }

    function remove(mId) {
        return PosteModel.findByIdAndRemove(mId)
    }

    function findById(Id) {
        return PosteModel.findById(Id)
    }

    return {
        findAll,
        create,
        update,
        remove,
        findById
    }
}
