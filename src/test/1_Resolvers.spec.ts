import 'mocha';
import { expect, assert } from 'chai';
import * as Mongoose from 'mongoose'

import { init } from '../App'

import logger from '../helpers/Logger'
import { Configuration } from '../types/Configuration'
require('dotenv').load();

import GraphQLResolvers from '../graphql/resolvers/Index'


describe('Test', () => {

    const conf : Configuration  = {

        port: +process.env.PORT,

        mongo: {
            database: 'testr',
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            graphiql: false || process.env.GRAPHIQL === 'true' ? true : false
        },

        logger
    }

    const resolver = new GraphQLResolvers(conf).methods
    
    before('before', async () => {
       
        await Mongoose.connect(
            `mongodb+srv://${conf.mongo.user}:${conf.mongo.password}@cluster0-beat6.mongodb.net/${conf.mongo.database}?retryWrites=true`,
            { useNewUrlParser: true }
        )

        Mongoose.connection.db.createCollection('users')
    })

    let userId : any;

    const userArgs : any = {
        userInput: {
            name: 'Trs'
        }
    }

    it('Create a user', async () => {
        const res = await resolver.createUser(userArgs)
        userId = res._id
        assert.equal(res.name, userArgs.userInput.name)
    })
    
    it('Get a user', async () => {
        const user = await resolver.user(userId)
        assert.equal(user.name, userArgs.userInput.name)
    })

    let deviceId : any
    
    const deviceArgs : any = {
        deviceInput: {
            tel: "+123456789"
        }
    }

    // it('Create a device', async () => {
    //     const res = await resolver.createDevice(deviceArgs)
    //     deviceId = res._id
    //     assert.equal(res.tel, deviceArgs.deviceInput.tel)
    // })

    after('after', async () => {

    })
})