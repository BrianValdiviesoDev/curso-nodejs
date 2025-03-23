try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found")
}
import app from "./framework/server"
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})