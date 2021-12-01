"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const passwordMatcher = /'?[Pp]assword'?:*\s*('?[\w\d!-ö]*'?)/g;
/**
 * Scrubs passwords from the log messages.
 * @param message - the log message
 */
function scrubPasswords(message) {
    return message.replace(passwordMatcher, (_, c1) => {
        return message.replace(c1, '******');
    });
}
const logFormat = winston_1.format.printf(({ level, message, timestamp, service }) => {
    return `[${timestamp}][${service}][${level}] ${scrubPasswords(message)}`;
});
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSSZZ';
const logTransports = [
    new winston_1.transports.File({
        level: 'error',
        filename: './logs/error.log',
        format: winston_1.format.json({
            replacer: (key, value) => {
                if (key === 'error') {
                    return {
                        message: value.message,
                        stack: value.stack,
                    };
                }
                return value;
            },
        }),
    }),
    new winston_1.transports.Console({
        level: 'debug',
        format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp({ format: TIMESTAMP_FORMAT }), winston_1.format.splat(), logFormat),
    }),
];
const logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp()),
    transports: logTransports,
    defaultMeta: { service: 'api' },
});
exports.default = logger;
//# sourceMappingURL=logger.js.map