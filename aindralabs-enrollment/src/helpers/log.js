const winston = require('winston');
const options = {
  file: {
    level: 'info',
    name: 'file.info',
    filename: `./logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: false,
    "timezone": "+05:30"
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `./logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    "timezone": "+05:30"
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    "timezone": "+05:30"
  },
};

const winstonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple(),
  winston.format.printf(({ level, message, label, timestamp }) => {
    const {correlationId, response, status} = message;

    return JSON.stringify(
      {
      correlationId: correlationId ,
      status: status,
      timestamp: new Date().toLocaleString(),
      data: response,
      },
      null,
      2
    )
  })
)

// your centralized logger object
let logger =  winston.createLogger({
  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.File)(options.errorFile),
    new (winston.transports.File)(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
  format: winstonFormat
  });

module.exports = logger
