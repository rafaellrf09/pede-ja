import { Request, Response } from "express";
import ItemService, { InterfaceItemService } from "../services/ItemService";

export default class ItemController {

    private _itemService: InterfaceItemService;

    constructor(itemService: InterfaceItemService) {
        this._itemService = itemService;
    }

    create = async (req: Request, res: Response) => {
        const newItem = await this._itemService.save(req.body);
        return res.status(201).json(newItem);
    }

    getById = async (req: Request, res: Response) => {
        try {
            const item = await this._itemService.getById(req.params.id);
            return res.json(item);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const item = await this._itemService.getAll();
            return res.json(item);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    changeItemActive = async (req: Request, res: Response) => {
        try {
            const item = await this._itemService.changeActive(req.params.id);
            return res.status(200).json(item);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}