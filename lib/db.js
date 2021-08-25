'use strict'

const Mongoose = require('mongoose')
Mongoose.set('useUnifiedTopology', true)

let mongoose = null
let conn = null

// singleton db
module.exports = async function setupDatabase(config) {
    const {
        dev,
        dbUser,
        dbPassword,
        dbHost,
        dbPort,
        dbName
    } = config

    if (!conn) {
       // conn = await Mongoose.createConnection(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
        // { useNewUrlParser: true, useCreateIndex: true, debug: dev, useFindAndModify: false })

conn = await Mongoose.createConnection(`mongodb://${dbHost}:${dbPort}/${dbName}`,
         { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })

         

        Mongoose.set('debug', true)
        return conn

        /**
         * Backup Connection
         * */
        // mongoose = await Mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, { useNewUrlParser: true, useCreateIndex: true })

        // mongoose.set('useFindAndModify', false)
    }
    return conn
}
