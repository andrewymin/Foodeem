import express from 'express';
const router = express.Router();
import getSearchFoods from '../controllers/searchContoller.js';

router.get('/', getSearchFoods);

export default router;
