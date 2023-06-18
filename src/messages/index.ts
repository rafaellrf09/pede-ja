import { Server } from "http";
import { config } from 'dotenv';
import WhatsAppClient from "./WhatsappClient";
import RabbitMQClient from "./RabbitMQClient";
import SocketIoClient from "./SocketIoClient";
config();

export const whatsappMessager = new WhatsAppClient();

export const rabbitMQClient = new RabbitMQClient(process.env.QUEUE_ORDERS_RECIEVED);

export const socketClient = new SocketIoClient();

export const initMessangers = async (server: Server) => {
    await rabbitMQClient.connect();
    await rabbitMQClient.consumeNewOrdersMessages();
    await whatsappMessager.connect();
    socketClient.connect(server);
}