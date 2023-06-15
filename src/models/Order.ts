import { model, Document, Schema } from 'mongoose';
import { Item } from './Item';
import { ClientData } from './ClientData';
import { PaymentMethod } from './PaymentMethod';

export enum Status {
    recieved = "RECIEVED",
    created = "CREATED",
    inProduction = "IN_PRODUCTION",
    inDelivery = "IN_DELIVERY",
    delivered = "DELIVERED",
}

export interface Order extends Document {
    items: Item[],
    clientData: ClientData;
    paymentMethod: PaymentMethod,
    status: Status,
    total: number
}

const schema = new Schema<Order>({
    items: {
        type: [Schema.Types.Mixed],
        required: true,
    },
    clientData: {
        type: Schema.Types.Mixed,
        required: true,
    },
    paymentMethod: {
        type: Schema.Types.Mixed,
        required: true,
    },
    status: { type: String, required: true },
    total: { type: Number, required: true }
});

export const OrderModel = model<Order>('Order', schema);