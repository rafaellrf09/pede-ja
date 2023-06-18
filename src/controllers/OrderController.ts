import { Request, Response } from "express";
import { Status } from "../models/Order";
import OrderService from "../services/OrderService";
import { rabbitMQClient, whatsappMessager } from "../messages";
export default class OrderController {

    private _orderService: OrderService;

    constructor() {
        this._orderService = new OrderService();
    }

    create = async (req: Request, res: Response) => {
        const newOrder = await this._orderService.save({
            ...req.body,
            status: Status.recieved,
        });

        await rabbitMQClient.sendMessage(JSON.stringify(newOrder));

        await whatsappMessager.sendMessage(newOrder.clientData.phone, JSON.stringify(newOrder));

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