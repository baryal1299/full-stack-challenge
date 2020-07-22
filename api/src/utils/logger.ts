import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = winston.createLogger(
{
        level: process.env.LOG_LEVEL,
        format: winston.format.combine(
            winston.format.colorize({all:true}),
            winston.format.simple(),
            // winston.format.json()
        ),
        transports: [
            new winston.transports.Console({handleExceptions: true})
        ]
    }
);

export default logger;