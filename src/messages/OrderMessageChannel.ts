import { Channel, connect } from "amqplib";
import { config } from "dotenv";
import { Server } from "socket.io";
import * as http from 'http';
import { Order } from "src/models/Order";
import OrderMessageQueue from "./RabbitMQClient";
config();

export default class OrderMessageChannel {
    private _channel: OrderMessageQueue;
    private _io: Server;

    constructor(server: http.Server) {
        this._channel = new OrderMessageQueue(process.env.QUEUE_ORDERS_RECIEVED);
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

    async consumeMessages() {
        const channel = await this._channel.connect();
        if (channel) {
            channel.consume(process.env.QUEUE_ORDERS_RECIEVED, async msg => {
                const orderObj = JSON.parse(msg.content.toString());
                console.log('message received');
                channel.ack(msg);
                const order: Order = orderObj;
                console.log('order received', order);
                this._io.emit(process.env.SOCKET_EVENT_NAME, order);
                console.log('new order emited by webSocket');
            })
            console.log('order consumer started');
        }
    }

}