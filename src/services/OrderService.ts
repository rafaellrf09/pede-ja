import mongoose from "mongoose";
import { Item } from "../models/Item";
import { Order, OrderModel, Status } from "../models/Order";

export default class OrderService {
    private _calculateTotal(items: Item[]): number {
        return items.reduce(function (a, b) { return a + (b.quantity * b.value); }, 0);
    }

    private _validateChangeStatus(status: string, order: Order): boolean {
        if (order.status === "RECIEVED" && status === "recieved") return false;
        else if (order.status === "CREATED" && (status === "recieved" || status === "created")) return false;
        else if (order.status === "IN_PRODUCTION" && (status === "recieved" || status === "created" || status === "inProduction")) return false;
        else if (order.status === "IN_DELIVERY" && (status === "recieved" || status === "created" || status === "inProduction" || status === "inDelivery")) return false;
        return true;
    }

    async save(order: Order): Promise<Order> {
        const newOrder = { total: this._calculateTotal(order.items), ...order };
        return await OrderModel.create(newOrder);
    }

    async changeStatus(id: string, newStatus: string): Promise<Order> {
        const objId = new mongoose.Types.ObjectId(id);
        const order: Order = await OrderModel.findById(objId);

        if (!this._validateChangeStatus(newStatus, order))
            throw `status: "${newStatus.toUpperCase()}" cannot be change when orderStatus is: "${order.status}"`;

        order.status = Status[newStatus];

        order.save();
        return order;
    }

    async getById(id: string) : Promise<Order>{
        const objId = new mongoose.Types.ObjectId(id);
        const order: Order = await OrderModel.findById(objId);
        return order;
    }
}