const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf((info : any, opt: any) => {
    return `${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: __filename.slice(__dirname.length + 1) }),
    timestamp(),
    format.colorize(),
    format.prettyPrint(),
    customFormat
  ),
  transports: [new transports.Console()]
});

export default logger;