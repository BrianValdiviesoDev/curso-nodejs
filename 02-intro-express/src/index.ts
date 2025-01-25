import express, { NextFunction, Request, Response } from "express";

const app = express()

app.get('/hello', (req: Request, res: Response, next: NextFunction) => {
    console.log("Endpoint /hello recibido")
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Servidor escuchando...")
})