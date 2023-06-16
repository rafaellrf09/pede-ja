import { Router } from 'express';
import ItemController from '../controllers/ItemController';

export const itemRouter = Router();

const itemCtrl = new ItemController();

itemRouter.post('/items', itemCtrl.create);