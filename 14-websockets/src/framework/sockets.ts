import { Server } from 'http'
import {Server as SocketIOServer} from 'socket.io'

export class SocketService{
    httpServer: Server
    io: SocketIOServer;
    constructor(httpServer: Server) {
        this.httpServer = httpServer;
        this.io = new SocketIOServer(httpServer)        
    }

    init() {
        this.io.on('connection', (socket) => {
            console.log("Un cliente se ha conectado")

            socket.on('test', (data) => {
                this.print('test', data)
            })

            socket.on('send-notification', (data) => {
                this.print('send-notification', data)
                this.send('notification', data)
            })

            socket.on('disconnect', () => {
                console.log("El cliente se ha desconectado")
            })
        })
    }

    print(event:string, data:string) {
        console.log(`Event: ${event}`)
        console.log(`Data: ${data}`)
    }


    send(event: string, data: string) {
        this.io.emit(event, data)
    }

}