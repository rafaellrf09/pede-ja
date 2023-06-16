import { Request, Response } from "express";
import { Order, Status } from "../models/Order";
import OrderService from "../services/OrderService";

export default class OrderController {

    private _orderService: OrderService;

    constructor() {
        this._orderService = new OrderService();
    }

    create = async (req: Request, res: Response) => {
        const { items, clientData, paymentMethod } = req.body;

        if (!items || !clientData || !paymentMethod)
            return res.status(400).json({
                errorCode: 400,
                error: `Cannot create order with no parameters: ${!items || !clientData || !paymentMethod}`
            });

        const newOrder = await this._orderService.save({
            ...req.body,
            status: Status.recieved,
        });

        return res.status(201).json(newOrder);
    }
}