import { createLogger, format, transports } from "winston";

const {printf, combine, timestamp, errors, colorize} = format

const customFormt = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`
})

export const logger = createLogger({
    transports: [
        new transports.Console(),
    ],
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        colorize({ all: true }),
        customFormt
    )
})