import * as amqp from 'amqplib';
import { config } from 'dotenv';

config();
class RabbitMQClient {
    private connection: amqp.Connection;
    private channel: amqp.Channel;
    private queue: string;

    constructor(queue: string) {
        this.queue = queue;
    }

    public async connect(): Promise<amqp.Channel> {
        try {
            this.connection = await amqp.connect(process.env.RABBITMQ_SERVER);
            this.channel = await this.connection.createChannel();
            console.log('conectado ao RabbitMQ:', this.queue);
            await this.channel.assertQueue(this.queue, { durable: false });
            return this.channel;
        } catch (error) {
            console.error('Erro ao conectar ao RabbitMQ:', error);
            return null;
        }
    }

    public async sendMessage(message: string): Promise<void> {
        try {
            await this.channel.sendToQueue(this.queue, Buffer.from(message));
            console.log(`Mensagem enviada: ${message}`);
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

    // public async consumeMessage(): Promise<any> {
    //     try {
    //         await this.channel.consume(this.queue, (message) => {
    //             if (message !== null) {
    //                 console.log(`Mensagem recebida: ${message.content.toString()}`);
    //                 this.channel.ack(message); // Confirma o processamento da mensagem
    //                 return message;
    //             }
    //         }, { noAck: false });
    //     } catch (error) {
    //         console.error('Erro ao consumir mensagem:', error);
    //         throw error;
    //     }
    // }
}

export default RabbitMQClient;
