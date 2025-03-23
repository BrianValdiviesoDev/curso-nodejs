try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found", e)
}
import server from "./framework/server"
import { SocketService } from "./framework/sockets"

const start = async () => {
    const app = await server()
    const PORT = process.env.PORT;
    const httpServer = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
    const socketService = new SocketService(httpServer)
    socketService.init()
}

start()
