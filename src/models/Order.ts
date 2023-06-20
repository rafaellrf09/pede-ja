import { model, Document, Schema, Model } from 'mongoose';
import { Item } from './Item';
import { ClientData } from './ClientData';
import { PaymentMethod } from './PaymentMethod';

export enum Status {
    RECIEVED = "RECIEVED",
    CREATED = "CREATED",
    IN_PRODUCTION = "IN_PRODUCTION",
    START_TO_DELIVERY = "START_TO_DELIVERY",
    DELIVERED = "DELIVERED",
    CANCELED = 'CANCELED'
}

export interface Order extends Document {
    items: Item[],
    clientData: ClientData;
    paymentMethod: PaymentMethod,
    status: Status,
    total: number,
}

const schema: Schema<Order> = new Schema({
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
}, {
    timestamps: true
});

export const OrderModel: Model<Order> = model<Order>('Order', schema);