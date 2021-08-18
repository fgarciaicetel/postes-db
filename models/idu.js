'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parameterSchema = new Schema({
    name: {
        type: String
    },
    value: {
        type: String
    }
})

const transmissionParameterSchema = new Schema({
    layerRate: {
        type: String
    },
    parameterList: {
        type: [parameterSchema]
    }
})

// const iduAlarmSchema = new Schema({})

const portSchema = new Schema({
    ptp: {
        type: String
    },
    slot: {
        type: String
    },
    port: {
        type: String
    },
    nativeEMSName: {
        type: String
    },
    description: {
        type: String
    },
    direction: {
        type: String
    },
    transmissionParametersList: {
        type: [transmissionParameterSchema],
        default: []
    }
})

const IduSchema = new Schema({
    me: {
        type: String
    },
    iduName: {
        type: String
    },
    communicationIPAddress: {
        type: String
    },
    GateWay: {
        type: String
    },
    phyID: {
        type: String
    },
    resourceState: {
        type: String
    },
    manufacturer: {
        type: String
    },
    productName: {
        type: String
    },
    softwareVersion: {
        type: String
    },
    isInSyncState: {
        type: String
    },
    communicationState: {
        type: String
    },
    ipaddress: {
        type: String
    },
    iduStatus: {
        type: Number
    },
    lastUpdateDate: {
        type: Date,
        default:  Date.now
    },

    /**
     * Ruben fields
     * */
    neStatus: {
        type: Number
    },
    siteName: {
        type: String
    },
    iduType: {
        type: String
    },
    siteNameTx: {
        value: {
            type: String
        },
        createdDate: {
            type: Date
        },
        username: {
            type: String
        }
    },
    lsrId: {
        type: String
    },
    agg: {
        type: String,
        enum: ['SI', 'NO']
    },
    ports: {
        type: [portSchema],
        default: []
    },
    instances: {
        type: [String],
        default: []
    },
    lastInstancesUpdatedDate: {
        type: Date
    }
    // alarms: {
    //     type: [iduAlarmSchema],
    //     default: []
    // }
})

module.exports = (conn) => conn.model('idus_dev', IduSchema)
