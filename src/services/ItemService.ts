import mongoose from "mongoose";
import { Item, ItemModel } from "../models/Item";

export interface InterfaceItemService {
    save(item: Item): Promise<Item>,
    getAll(): Promise<Item[]>,
    getById(id: string): Promise<Item>,
    changeActive(id: string): Promise<Item>
}

export default class ItemService {
    async save(item: Item): Promise<Item> {
        return await ItemModel.create(item);
    }

    async getAll(): Promise<Item[]> {
        const items: Item[] = await ItemModel.find();
        return items;
    }

    async getById(id: string): Promise<Item> {
        const objId = new mongoose.Types.ObjectId(id);
        const item: Item = await ItemModel.findById(objId);
        return item;
    }

    async changeActive(id: string): Promise<Item> {
        const objId = new mongoose.Types.ObjectId(id);
        const item: Item = await ItemModel.findById(objId);

        item.isActive = !item.isActive;

        item.save();

        return item;
    }
}