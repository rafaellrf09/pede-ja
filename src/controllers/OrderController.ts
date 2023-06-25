import { Request, Response } from "express";
import { InterfaceOrderService } from "../services/OrderService";
import { rabbitMQClient, whatsappMessager } from "../messages";
export default class OrderController {

    private _orderService: InterfaceOrderService;

    constructor(orderService: InterfaceOrderService) {
        this._orderService = orderService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const orders = await this._orderService.getAll();
            return res.json(orders);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    create = async (req: Request, res: Response) => {
        const { items, clientData, paymentMethod } = req.body;

        const newOrder = await this._orderService.create(items, clientData, paymentMethod);

        await rabbitMQClient.sendMessage(JSON.stringify(newOrder));

        await whatsappMessager.sendOrderMessage(newOrder.clientData.phone, newOrder);

        return res.status(201).json(newOrder);
    }

    changeStatus = async (req: Request, res: Response) => {
        try {
            const { id, status } = req.params;
            if (!id) return res.status(400).json({ error: `Missing params "id"` });
            if (!status) return res.status(400).json({ error: `Missing params "status"` });

            const order = await this._orderService.changeStatus(id, status);
            await whatsappMessager.sendMessage(order.clientData.phone, `Status Updated: ${order.status}`);
            return res.json(order);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const order = await this._orderService.getById(req.params.id);
            return res.json(order);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}