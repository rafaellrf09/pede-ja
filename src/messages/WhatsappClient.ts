import { Client, LocalAuth } from "whatsapp-web.js"
import * as qrcode from 'qrcode-terminal';
import { Order } from "../models/Order"

export default class WhatsAppClient {
    private client: Client;
    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
        });
    }

    private _formatOrderMessage(order: Order): string {
        const message =
            `*${order.clientData.firstName} ${order.clientData.lastName}*: Seu pedido foi recebido!
*Itens*: ${order.items.map(item => `${item.name} - Quantidade: ${item.quantity}`)}
*Endereço de Entrega*: ${order.clientData.address} - ${order.clientData.number} - ${order.clientData.complement}
*Forma de Pagamento*: ${order.paymentMethod.paymentType}
*Precisa de Troco?* ${order.paymentMethod.needChange ? `Sim - R$${order.paymentMethod.changeValue.toFixed(2)}` : "Não"}
*Valor Total*: R$${order.total.toFixed(2)}`
        return message;
    }

    public async connect() {
        this.client.on('qr', (qrCode) => {
            console.log('Scan the QR code:');
            qrcode.generate(qrCode, { small: true }, function (qrcode: string) {
                console.log(qrcode);
            });
        });

        this.client.on('authenticated', (session) => {
            console.log('Cliente do WhatsApp autenticado');
            // Salvar a sessão para reutilização futura
            // session.saveSession();
        });

        this.client.on('ready', () => {
            console.log('Cliente do WhatsApp conectado');
        });

        this.client.initialize();
    }

    public async sendOrderMessage(number: string, order: Order): Promise<void> {
        const messageFormated = this._formatOrderMessage(order);
        await this.sendMessage(number, messageFormated);
    }

    public async sendMessage(number: string, message: string): Promise<void> {
        try {
            const chatId = `55${number}@c.us`;
            await this.client.sendMessage(chatId, message);
            console.log(`Mensagem enviada para ${number}: ${message}`);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }
}
