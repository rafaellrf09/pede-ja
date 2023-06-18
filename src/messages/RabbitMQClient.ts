import * as amqp from 'amqplib';
import { Order } from 'whatsapp-web.js';
import { socketClient } from '.';
class RabbitMQClient {
    private connection: amqp.Connection;
    private channel: amqp.Channel;
    private queue: string;

    constructor(queue: string) {
        this.queue = queue;
    }

    public async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_SERVER);
            this.channel = await this.connection.createChannel();
            console.log('conectado ao RabbitMQ:', this.queue);
            await this.channel.assertQueue(this.queue, { durable: false });
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ:', error);
            return null;
        }
    }

    public async sendMessage(message: string): Promise<void> {
        try {
            await this.channel.sendToQueue(this.queue, Buffer.from(message));
            console.log(`Mensagem enviada RabbitMQ: ${message}`);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    public async close(): Promise<void> {
        try {
            await this.channel.close();
            await this.connection.close();
        } catch (error) {
            console.error('Erro ao fechar a conexão:', error);
            throw error;
        }
    }

    public async consumeNewOrdersMessages() {
        if (this.channel) {
            this.channel.consume(process.env.QUEUE_ORDERS_RECIEVED, async msg => {
                const orderObj: Order = JSON.parse(msg.content.toString());
                console.log('message received');
                this.channel.ack(msg);
                socketClient.emitMessage(process.env.SOCKET_EVENT_NAME, orderObj)
            })
            console.log('order consumer started');
        }
    }
}

export default RabbitMQClient;
