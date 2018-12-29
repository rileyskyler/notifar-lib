
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const winston = require('winston')
const graphqlHttp = require('express-graphql');
const graphql = require('graphql');
const fs = require('fs')
require('dotenv').load();

import * as DB from './controllers/DB'

let logger : any

const app = express();

const init : Function = async () : Promise<void> => {
    
    const PORT = process.env.PORT || 1337;
    
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    })
        
    await DB.connect()
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    const schema = fs.readFileSync('./src/schema.gql', 'utf8')

    app.use('/api', graphqlHttp({
        schema: await graphql.buildSchema(fs.readFileSync('./src/schema.gql', 'utf8')),
        rootValue: {
            locations: DB.locations,
            createUser: DB.createUser,
            createDevice: DB.createDevice
        },
        graphiql: false || process.env.GRAPHIQL === 'true' ? true : false
    }))

    app.post(`/sms`, (req: any, res: any) => {
        const { To, From, Body } = req.body;
        DB.createLocation(From, Body)
        logger.info(`SMS received! To: ${To} From: ${From} Message: ${Body}`);
    })

    http.createServer(app).listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    })
    
}

const main : Function = async () : Promise<void> => {
    await init()
}

main()