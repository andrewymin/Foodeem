import express from 'express';
const router = express.Router();
import getRandomFood from '../controllers/randomController.js';

router.get('/', getRandomFood);

export default router;
