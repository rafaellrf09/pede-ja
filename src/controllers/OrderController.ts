import { Request, Response } from "express";
import { ClientData } from "src/models/ClientData";
import { Item } from "src/models/Item";
import { Order, Status } from "src/models/Order";
import { PaymentMethod } from "src/models/PaymentMethod";
import OrderService from "src/services/OrderService";

export default class OrderController {

    private _orderService: OrderService;

    constructor() {
        this._orderService = new OrderService();
    }

    create = async (req: Request, res: Response) => {
        const { items, clientData, paymentMethod, status, total } = req.body;

        if (!items || !clientData || !paymentMethod || !status || !total)
            return res.status(400).json({
                errorCode: 400,
                error: `Cannot create order with no parameters: ${!items || !clientData || !paymentMethod || !status || !total}`
            });

        const newOrder: Order = {
            ...req.body,
            status: Status.recieved,
        }

        await this._orderService.save(newOrder);
    }
}