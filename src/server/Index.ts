const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').load();

const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
    
app.post(`/sms`, (req: any, res: any) => {
    const {To, From, Body} = req.body;
    logger.info(`SMS received. To: ${To} From: ${From} Message: ${Body}`);
})

const PORT = process.env.PORT || 1337;

http.createServer(app).listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
})