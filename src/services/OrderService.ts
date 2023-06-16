import { Item } from "../models/Item";
import { Order, OrderModel } from "../models/Order";

export default class OrderService {
    private _calculateTotal(items: Item[]): number {
        return items.reduce(function (a, b) { return a + (b.quantity * b.value); }, 0);
    }

    async save(order: Order): Promise<Order> {
        const newOrder = { total: this._calculateTotal(order.items), ...order };
        return await OrderModel.create(newOrder);
    }
}