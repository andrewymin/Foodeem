import express from "express";
const router = express.Router();
import getSearchFoods from "../controllers/searchContoller.js";
import {
  getRecipe,
  saveRecipe,
  getSavedRecipe,
  deleteSavedRecipe,
} from "../controllers/recipeController.js";

router.get("/", getSearchFoods);
router.get("/recipe", getRecipe);
router.post("/save-recipe", saveRecipe);
router.get("/get-saved-recipe/:id", getSavedRecipe);
router.delete("/delete-saved-recipe/:id", deleteSavedRecipe);

export default router;
