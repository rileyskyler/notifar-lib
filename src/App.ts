
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const winston = require('winston')
const graphqlHttp = require('express-graphql');
const graphql = require('graphql');
const fs = require('fs')
const mongoose = require('mongoose');
require('dotenv').load();

const Locations = require('./graphql/resolvers/Locations')

import GraphQLResolvers from './graphql/resolvers/Index'

console.log(GraphQLResolvers)
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
        )
})
    
    
const init : Function = async () : Promise<any> => {
        
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-beat6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        { useNewUrlParser: true }
    )
    
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    const schema = fs.readFileSync('./src/graphql/schema/schema.gql', 'utf8')
    
    app.use('/api', graphqlHttp({
        schema: await graphql.buildSchema(fs.readFileSync('./src/graphql/schema/schema.gql', 'utf8')),
        rootValue: GraphQLResolvers,
        graphiql: false || process.env.GRAPHIQL === 'true' ? true : false
    }))
    
    app.post(`/sms`, (req: any, res: any) => {
        const { To, From, Body } = req.body;
        Locations.createLocation(From, Body)
        logger.info(`SMS received! To: ${To} From: ${From} Message: ${Body}`);
    })

    return app        
}

const main : Function = async () : Promise<any> => {
    
    const PORT = process.env.PORT || 1337;
    
    const app = await init()
   
    http.createServer(app).listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    })

}

main()