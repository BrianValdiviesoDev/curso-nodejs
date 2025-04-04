try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found", e)
}
import app from "./framework/server"
const start = async () => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
}

start()
