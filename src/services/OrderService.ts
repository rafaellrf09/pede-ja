import mongoose from "mongoose";
import { Order, OrderModel } from "../models/Order";
import { OrderStatus } from "src/enums/orderStatus";
import { Item } from "src/models/Item";
import { ClientData } from "src/models/ClientData";
import { PaymentMethod } from "src/models/PaymentMethod";

export interface InterfaceOrderService {
    create(items: Item[], clientData: ClientData, paymentMethod: PaymentMethod): Promise<Order>,
    changeStatus(id: string, newStatus: string): Promise<Order>,
    getById(id: string): Promise<Order>,
    getAll(): Promise<Order[]>,
}

export default class OrderService {

    private _calculateTotal(items: Item[]): number {
        return items.reduce(function (a: any, b: any) { return a + (b.quantity * b.value); }, 0);
    }

    private _validateChangeStatus(order: Order, newStatus: string): boolean {
        if (order.status === OrderStatus.DELIVERED && (newStatus === "CANCELED")) return false;
        else if ((order.status === OrderStatus.RECIEVED) && (newStatus === "RECIEVED")) return false;
        else if ((order.status === OrderStatus.CREATED) && (newStatus === "RECIEVED" || newStatus === "CREATED")) return false;
        else if ((order.status === OrderStatus.IN_PRODUCTION) && (newStatus === "RECIEVED" || newStatus === "CREATED" || newStatus === "IN_PRODUCTION")) return false;
        else if ((order.status === OrderStatus.START_TO_DELIVERY) && (newStatus === "RECIEVED" || newStatus === "CREATED" || newStatus === "IN_PRODUCTION" || newStatus === "START_TO_DELIVERY")) return false;
        order.status = OrderStatus[newStatus];
        return true;
    }

    public async create(items: Item[], clientData: ClientData, paymentMethod: PaymentMethod): Promise<Order> {
        const total = this._calculateTotal(items);
        return await OrderModel.create({
            items, clientData, paymentMethod, status: OrderStatus.RECIEVED, total
        });
    }

    public async changeStatus(id: string, newStatus: string): Promise<Order> {
        const objId = new mongoose.Types.ObjectId(id);
        const order: Order = await OrderModel.findById(objId);

        if (!this._validateChangeStatus(order, newStatus.toUpperCase()))
            throw `status: "${newStatus.toUpperCase()}" cannot be change when orderStatus is: "${order.status}"`;

        order.save();
        return order;
    }

    public async getById(id: string): Promise<Order> {
        const objId = new mongoose.Types.ObjectId(id);
        const order: Order = await OrderModel.findById(objId);
        return order;
    }

    public async getAll(): Promise<Order[]> {
        const orders: Order[] = await OrderModel.find();
        return orders;
    }
}