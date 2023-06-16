import { model, Document, Schema } from 'mongoose';

export interface Item extends Document {
    name: string
    quantity: number,
    description: string
    value: number
    isActive: boolean
}

const schema = new Schema<Item>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
})

export const ItemModel = model<Item>('Item', schema);