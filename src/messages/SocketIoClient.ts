import { Server } from "socket.io";
import * as http from "http";

export default class SocketIoClient {
    private _io: Server;

    public connect(server: http.Server) {
        this._io = new Server(server, {
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ['GET', 'POST']
            }
        });

        this._io.on('connection', () => {
            console.log("Web Socket connected")
        });
    }

    public emitMessage(eventName: string, message: any) {
        this._io.emit(eventName, message);
        console.log('new order emited by webSocket');
    }
}