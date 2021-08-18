'use strict'

const debug = require('debug')('planner:db:idu')
const { queryOracle } = require('../util/oracledb')
const moment = require('moment')

module.exports = function setupIdu(IduModel) {

    //todas las funciones que requiera consumir en el proyecto web 

    function findAll() {
        return IduModel.find({}, { ports: 0 }).lean()
    }

    function findAllServFijos() {
        return IduModel.find({ iduType: 'Serv. Fijos' }, { ports: 0 })
    }

    function findAllTx() {
        return IduModel.find({ iduType: 'Tx' }, { ports: 0 })
    }

    function findAllTxWithoutPorts() {
        return IduModel.find(
            {
                $or: [{
                    iduType: 'Tx',
                    ports: null
                }, {
                    iduType: 'Tx',
                    ports: []
                }]
            }
        )
    }

    function findById(mId) {
        return IduModel.findById(mId)
    }

    function findByMe(me) {
        return IduModel.findOne({ me })
    }

    function findByLsrId(lsrId) {
        return IduModel.findOne({ lsrId })
    }

    function findByName(name) {
        return IduModel.findOne({ iduName: name })
    }

    async function findCurrentInstancesByMe(me){
        const now = new Date()
        const end = new Date(now)

        const query = `
                    SELECT DEVICE_ID, DEVICE_NAME, RESOURCE_NAME FROM TX_HUAWEI.VW_U2020_RTN_PTN_HH@DBGENLNK
                    WHERE COLLECTION_TIME BETWEEN TO_DATE('${moment(now.setDate(now.getDate() - 2)).format("DD/MM/YYYY HH:mm")}', 'DD/MM/YYYY HH24:MI') AND TO_DATE('${moment(end).format("DD/MM/YYYY HH:mm")}', 'DD/MM/YYYY HH24:MI') AND DEVICE_ID=${me}
                    GROUP BY DEVICE_ID, DEVICE_NAME, RESOURCE_NAME
                `
        const result = await queryOracle(query)
        return result.rows.map(i => i.RESOURCE_NAME)
    }

    async function findMaxUtilizationByInstanceAndDate(instanceName, startDate){

        const query = `
                    SELECT MAX(PORT_RX_BW_UTILIZATION_MAX) FROM TX_HUAWEI.VW_U2020_RTN_PTN_HH@DBGENLNK
                    WHERE COLLECTION_TIME BETWEEN TO_DATE('${moment(startDate).format("DD/MM/YYYY 00:00")}', 'DD/MM/YYYY HH24:MI') AND TO_DATE('${moment(startDate).format("DD/MM/YYYY 23:59")}', 'DD/MM/YYYY HH24:MI') AND RESOURCE_NAME='${instanceName}'
                `
        console.log('-- query --')
        console.log(query)
        const result = await queryOracle(query)
        if(result && result.rows && result.rows.length > 0 && result.rows[0] && typeof result.rows[0]['MAX(PORT_RX_BW_UTILIZATION_MAX)'] === 'number'){
            return result.rows[0]['MAX(PORT_RX_BW_UTILIZATION_MAX)']
        }
        return null
    }

    async function findSiteNameByMe(me){
        const iduFound = await IduModel.findOne(
            { me },
            'siteName siteNameTx'
        )
        if (iduFound) {
            if (
                iduFound.siteNameTx &&
                iduFound.siteNameTx.value &&
                iduFound.siteNameTx.value.length > 0
            ) {
                return iduFound.siteNameTx.value
            }
            return iduFound.siteName
        }
        return iduFound
    }

    async function findSiteNameByIduName(iduName) {
        const iduFound = await IduModel.findOne(
            { iduName },
            'siteName siteNameTx'
        )
        if (iduFound) {
            if (
                iduFound.siteNameTx &&
                iduFound.siteNameTx.value &&
                iduFound.siteNameTx.value.length > 0
            ) {
                return iduFound.siteNameTx.value
            }
            return iduFound.siteName
        }
        return iduFound
    }

    async function findIduMeByIduName(iduName) {
        const iduFound = await IduModel.findOne({ iduName }, 'me')
        if (iduFound) {
            return iduFound.me
        }
        return iduFound
    }

    // buscar idu names con parte de su nombre
    function findIduNamesByText(partIduName) {
        return IduModel.find(
            {
                iduName: { $regex: `.*${partIduName}.*`, $options: 'i' },
                neStatus: 1
            },
            'iduName'
        ).limit(10)
    }

    function create(idu) {
        return IduModel.create(idu)
    }

    async function update(mId, iduFields) {
        // verificando que la idu existe
        const existsIdu = await IduModel.findById(mId)
        if (!existsIdu) {
            throw [
                {
                    location: 'body',
                    param: 'id',
                    msg: "The NE doesn't exist."
                }
            ]
        }
        // guardando los campos de la idu
        await IduModel.findByIdAndUpdate(mId, iduFields, {
            runValidators: true
        })
        return IduModel.findById(mId)
    }

    async function updateSetStatusZero(){
        return IduModel.updateMany(
            {},
            {
                $set: {
                    neStatus: 0
                }
            }
        )
    }

    async function updateByMe(me, iduFields) {
        // verificando que la idu existe
        const existsIdu = await IduModel.findOne({ me })
        if (existsIdu) {
            // guardando los campos de la idu
            await IduModel.findByIdAndUpdate(existsIdu._id, iduFields, {
                runValidators: true
            })
            return IduModel.findById(existsIdu._id)
        }
        return existsIdu
    }

    function remove(mId) {
        return IduModel.findByIdAndRemove(mId)
    }

    return {
        findAll,
        findAllServFijos,
        findAllTx,
        findAllTxWithoutPorts,
        findByMe,
        findCurrentInstancesByMe,
        findMaxUtilizationByInstanceAndDate,
        findSiteNameByMe,
        findSiteNameByIduName,
        findIduMeByIduName,
        findByLsrId,
        findById,
        findByName,
        findIduNamesByText,
        create,
        update,
        updateByMe,
        updateSetStatusZero,
        remove
    }
}
