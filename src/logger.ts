import { createLogger, format, transports } from 'winston';

const passwordMatcher = /'?[Pp]assword'?:*\s*('?[\w\d!-ö]*'?)/g;

/**
 * Scrubs passwords from the log messages.
 * @param message - the log message
 */
function scrubPasswords(message: string): string {
  return message.replace(passwordMatcher, (_, c1) => {
    return message.replace(c1, '******');
  });
}

const logFormat = format.printf(({ level, message, timestamp, service }) => {
  return `[${timestamp}][${service}][${level}] ${scrubPasswords(message)}`;
});

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSSZZ';

const logTransports = [
  new transports.File({
    level: 'error',
    filename: './logs/error.log',
    format: format.json({
      replacer: (key, value) => {
        if (key === 'error') {
          return {
            message: (value as Error).message,
            stack: (value as Error).stack,
          };
        }
        return value;
      },
    }),
  }),
  new transports.Console({
    level: 'debug',
    format: format.combine(
      format.colorize({ all: true }),
      format.timestamp({ format: TIMESTAMP_FORMAT }),
      format.splat(),
      logFormat,
    ),
  }),
];

const logger = createLogger({
  format: format.combine(format.timestamp()),
  transports: logTransports,
  defaultMeta: { service: 'api' },
});

export default logger;
