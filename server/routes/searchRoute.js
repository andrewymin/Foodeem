import express from "express";
const router = express.Router();
import getSearchFoods from "../controllers/searchContoller.js";
import {
  getRecipe,
  saveRecipe,
  getSavedRecipe,
} from "../controllers/recipeController.js";

router.get("/", getSearchFoods);
router.get("/recipe", getRecipe);
router.post("/save-recipe", saveRecipe);
router.get("/get-saved-recipe", getSavedRecipe);

export default router;
