import express from 'express';
const router = express.Router();
import getSearchFoods from '../controllers/searchContoller.js';
import getRecipe from '../controllers/recipeController.js';

router.get('/', getSearchFoods);
router.get('/recipe', getRecipe);

export default router;
