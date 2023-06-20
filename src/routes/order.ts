import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import OrderService from '../services/OrderService';

export const orderRouter = Router();

const orderSrvc = new OrderService();
const orderCtrl = new OrderController(orderSrvc);

orderRouter.post('/orders', orderCtrl.create);
orderRouter.get('/orders', orderCtrl.getAll);
orderRouter.get('/orders/:id', orderCtrl.getById);
orderRouter.put('/orders/:id/status/:status', orderCtrl.changeStatus);