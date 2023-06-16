import { Router } from 'express';
import OrderController from '../controllers/OrderController';

export const orderRouter = Router();

const orderCtrl = new OrderController();

orderRouter.post('/orders', orderCtrl.create);