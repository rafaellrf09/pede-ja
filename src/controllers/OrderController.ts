import { Request, Response } from "express";
import { Status } from "../models/Order";
import OrderService from "../services/OrderService";
import RabbitMQClient from "../messages/RabbitMQClient";
import { config } from 'dotenv';

config();
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
        
        const orderMessageQueue = new RabbitMQClient(process.env.QUEUE_ORDERS_RECIEVED);
        await orderMessageQueue.connect();
        await orderMessageQueue.sendMessage(JSON.stringify(newOrder));

        return res.status(201).json(newOrder);
    }
}