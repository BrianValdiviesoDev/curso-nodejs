import rateLimit from "express-rate-limit";

export const ddosDefense = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Demasiadas peticiones por segundo",
})

export const bruteForceDefense = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Demasiados intentos fallidos"
})