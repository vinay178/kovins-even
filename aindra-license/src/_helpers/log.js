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
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};


// your centralized logger object
let logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.errorFile),
        new (winston.transports.File)(options.file)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger