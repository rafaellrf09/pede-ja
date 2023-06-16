import { Item, ItemModel } from "../models/Item";

export default class ItemService {
    async save(item: Item): Promise<Item> {
        return await ItemModel.create(item);
    }
}