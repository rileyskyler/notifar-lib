
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const winston = require('winston')
const graphqlHttp = require('express-graphql');

require('dotenv').load();

import * as DB from './controllers/DB'
import * as Schema from './Schema'
import { GraphQLSchema } from './Schema'

const app = express();

let logger : any

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
    
    app.use('/api', graphqlHttp({
        schema: GraphQLSchema,
        graphiql: true
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