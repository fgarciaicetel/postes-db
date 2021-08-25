'use strict'

//const debug = require('debug')('planner:db:idu')
//const { queryOracle } = require('../util/oracledb')
//const moment = require('moment')

module.exports = function setupCamara(CamaraModel) {

    //todas las funciones que requiera consumir en el proyecto web 

    function findAll(){
        return CamaraModel.find({}).exec()
    }

    function create(camara) {
        return CamaraModel.create(camara)
    }

    async function update(mId, camaraFields) {
        // verificando que la id existe
        const existsCamara = await CamaraModel.findById(mId)
        if (!existsCamara) {
            throw [
                {
                    location: 'body',
                    param: 'id',
                    msg: "The NE doesn't exist."
                }
            ]
        }
        // guardando los campos de la idu
        await CamaraModel.findByIdAndUpdate(mId, camaraFields, {
            runValidators: true
        })
        return CamaraModel.findById(mId)
    }

    function remove(mId) {
        return CamaraModel.findByIdAndRemove(mId)
    }

    function findById(Id) {
        return CamaraModel.findById(Id)
    }

    return {
        findAll,
        create,
        update,
        remove,
        findById
    }
}
