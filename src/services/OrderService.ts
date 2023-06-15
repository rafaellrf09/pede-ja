import { Order, OrderModel } from "src/models/Order";

export default class OrderService {
    async save(order: Order): Promise<Order> {
        const newOrder = await OrderModel.create(order);
        return newOrder;
    }
}