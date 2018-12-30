
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
import * as Winston from 'Winston'
const graphqlHttp = require('express-graphql');
const graphql = require('graphql')
import * as fs from 'fs'
import * as Mongoose from 'mongoose'

const fileName = require('./helpers/File').getFileName(__filename, __dirname)

import Message from './types/Message'

require('dotenv').load();

import * as Location from './graphql/resolvers/Location'
import GraphQLResolvers from './graphql/resolvers/Index'
import { Configuration } from './types/Configuration'



const init : Function = async (conf: Configuration) : Promise<any> => {

    await Mongoose.connect(
        `mongodb+srv://${conf.mongo.user}:${conf.mongo.password}@cluster0-beat6.mongodb.net/${conf.mongo.database}?retryWrites=true`,
        { useNewUrlParser: true }
    )

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

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

    const myFormat = (info : any) => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    };
    
    const conf : Configuration  = {

        port: +process.env.PORT,

        mongo: {
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            database: process.env.MONGO_DB,
            graphiql: false || process.env.GRAPHIQL === 'true' ? true : false
        },

        logger: Winston.createLogger({
            format: Winston.format.combine(
                Winston.format.colorize(),
                Winston.format.simple()
            ),
            transports: [
                new Winston.transports.Console()
            ]
        })
    }

    const app = await init(conf)
    
    const PORT = conf.port || 3000;
    await http.createServer(app).listen(PORT, () => {
        conf.logger.info(`[${fileName}] Notifar server running on port ${PORT}`);
    })

}

main()