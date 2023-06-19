import { Router } from 'express';
import ItemController from '../controllers/ItemController';
import ItemService from "../services/ItemService";


export const itemRouter = Router();

const itemSrvc = new ItemService();
const itemCtrl = new ItemController(itemSrvc);

itemRouter.post('/items', itemCtrl.create);
itemRouter.get('/items', itemCtrl.getAll);
itemRouter.get('/items/:id', itemCtrl.getById);
itemRouter.patch('/items/:id', itemCtrl.changeItemActive);