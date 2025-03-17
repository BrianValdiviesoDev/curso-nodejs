import { createLogger, format, transports } from "winston";
import LokiTransport from "winston-loki";

const {printf, combine, timestamp, errors, colorize} = format

const customFormt = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`
})

export const logger = createLogger({
    transports: [
        new transports.Console(),
        new LokiTransport({
            host: process.env.LOKI_URL || 'http://localhost:3100',
            labels: { job: 'curso-node' },
            json: true,
            level: 'debug'
        })
    ],
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        colorize({ all: true }),
        customFormt
    )
})