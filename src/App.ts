const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphql = require('graphql')
import * as fs from 'fs'
import * as Mongoose from 'mongoose'

import Message from './types/Misc'

require('dotenv').load();

import * as Location from './graphql/resolvers/Location'
import GraphQLResolvers from './graphql/resolvers/Index'
import { Configuration } from './types/Configuration'
const cors = require('cors')


import * as Authentication from './middlewear/Authenticaton'

import logger from './helpers/Logger'

export const init : Function = async (conf: Configuration) : Promise<any> => {

    
    const db = await Mongoose.connect(
            `mongodb+srv://skyler:${conf.mongo.password}@cluster0-beat6.mongodb.net/${conf.mongo.database}?retryWrites=true`,
            { useNewUrlParser: true }
    )

    const app = express();

    app.use(bodyParser.json());
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(Authentication.verify)

    app.use('/api',graphqlHttp({
        schema: await graphql.buildSchema(
            fs.readFileSync('./src/graphql/schema/schema.gql', 'utf8')
        ),
        rootValue: new GraphQLResolvers(conf).methods,
        graphiql: conf.mongo.graphiql
    }))

    app.post(`/sms`, (message : Message) => {
        Location.create(message.From, message.Body)
        conf.logger.info(`SMS received! To: ${message.To} From: ${message.From} Message: ${message.Body}`);
    })
    
    return app        
}

const main : Function = async () : Promise<any> => {

    
    const conf : Configuration  = {

        port: +process.env.PORT,

        mongo: {
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            database: process.env.MONGO_DB,
            graphiql: false || process.env.GRAPHIQL === 'true' ? true : false
        },

        logger
    }

    const app = await init(conf)
    const PORT = conf.port || 3000;
    await http.createServer(app).listen(PORT, () => {
        conf.logger.info(`[App] Notifar server running on port ${PORT}`);
    })

}

main()