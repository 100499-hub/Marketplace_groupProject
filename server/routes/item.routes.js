import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getItems,
    createItem,
    updateItem,
    deleteItem,
    buyItem
} from '../controllers/item.controller.js';

const router = Router();

router.route('/')
    .get(getItems)
    .post(protect, createItem);

router.route('/:id')
    .put(protect, updateItem)
    .delete(protect, deleteItem);

router.post('/:id/buy', protect, buyItem);

export default router;
