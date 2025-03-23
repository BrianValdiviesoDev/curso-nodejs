import server from "./frameworks/server";

const start = async () => {
    const app = await server()
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
}

start()