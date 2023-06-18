import { Client, LocalAuth } from "whatsapp-web.js"
import * as qrcode from 'qrcode-terminal';

export default class WhatsAppClient {
    private client: Client;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
        });
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
