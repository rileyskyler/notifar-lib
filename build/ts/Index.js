var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var PORT = 1337;
var logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
});
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/sms", function (req, res) {
    var _a = req.body, To = _a.To, From = _a.From, Body = _a.Body;
    logger.info("SMS received. To: " + To + " From: " + From + " Body: " + Body);
});
http.createServer(app).listen(PORT, function () {
    logger.info("Server running on port " + PORT);
});
//# sourceMappingURL=Index.js.map