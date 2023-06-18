import { Router } from 'express';
import OrderController from '../controllers/OrderController';

export const orderRouter = Router();

const orderCtrl = new OrderController();

orderRouter.post('/orders', orderCtrl.create);
orderRouter.get('/orders/:id', orderCtrl.getById);
orderRouter.put('/orders/:id/status/:status', orderCtrl.changeStatus);