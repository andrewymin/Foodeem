import "dotenv/config.js";
import axios from "axios";
// import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// dotenv.config();
// // import axios from 'axios';

const apiKey = process.env.spoonacular;
// only use testKey to not send call
const testKey = process.env.testKey;

const getRecipe = (req, res) => {
  let recipeId = req.query.id;
  // console.log(data)

  // For axios don't forget to add "https:" before url or get ECONNREFUSED error
  axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`
    )
    .then((response) => {
      // console.log(response.data)
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

const saveRecipe = async (req, res) => {
  let recipeId = await req.body.id;
  const token = req.cookies.token;

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      //   req.user_id = decodedToken._id;
      if (err) return res.status(401);
      await axios
        .get(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`
        )
        .then((response) => {
          let recipe = response.data;
          // extract recipe for all needed data that fits recipe schema and push to it
          const recipeData = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            extendedIngredients: recipe.extendedIngredients,
            analyzedInstructions: recipe.analyzedInstructions,
          };

          return recipeData;
        })
        .then(async (recipeData) => {
          const updateduser = await User.findByIdAndUpdate(
            { _id: decodedToken._id },
            { $push: { recipes: recipeData } },
            { new: true }
          );
          if (updateduser)
            return res.status(200).json({ userRecipes: updateduser.recipes });
        })
        .catch((error) => {
          return res.status(401).json({ errorMsg: error });
        });
    }
  );
};

const getSavedRecipe = (req, res) => {
  const token = req.cookie.token;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      //   req.user_id = decodedToken._id;
      if (err) return res.status(401);
      const user = await User.findById(decodedToken._id);
      if (!user) return res.status(401).json({ errorMsg: "User not found" });
      return res.status(200).json({ userRecipes: user.recipes });
    }
  );
  // console.log(data)
};

export { getRecipe, saveRecipe, getSavedRecipe };
