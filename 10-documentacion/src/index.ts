try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found", e)
}
import server from "./framework/server"

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not found")
    }
    const app = await server(process.env.MONGO_URI)
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
}

start()
