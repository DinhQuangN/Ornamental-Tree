import express from 'express';
import {
  createOrder,
  getOrder,
  getOrderByUser,
  groupDate
} from '../controllers/orderController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/createOrder', auth, createOrder);
router.get('/getOrder', auth, getOrder);
router.get('/getOrderByUser/:userId', auth, getOrderByUser);
router.get('/getOrderUser', auth, groupDate);

export default router;
