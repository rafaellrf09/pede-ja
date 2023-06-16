import { Request, Response } from "express";
import ItemService from "../services/ItemService";

export default class ItemController {

    private _itemService: ItemService;

    constructor() {
        this._itemService = new ItemService();
    }

    create = async (req: Request, res: Response) => {
        const newItem = await this._itemService.save(req.body);
        return res.status(201).json(newItem);
    }
}