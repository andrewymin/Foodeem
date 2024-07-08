import "dotenv/config.js";
import axios from "axios";
// import dotenv from "dotenv";
import { LikedRecipes, User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// dotenv.config();
// // import axios from 'axios';

const apiKey = process.env.spoonacular;
// only use testKey to not send call
const testKey = process.env.testKey;

const getRecipe = async (req, res) => {
  let recipeId = await req.query.id;

  // For axios don't forget to add "https:" before url or get ECONNREFUSED error
  await axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`
    )
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
      // return response.data;
    })
    .catch((error) => {
      res.send(error);
      // return res.status(401).json({ errorMsg: "Recipe not found" });
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
          // check if recipe already exists in LikedRecipes
          //   db to be saved or retrieve that already existing recipe
          const recipeExists = await LikedRecipes.findOne({
            id: recipeData.id,
          }).exec();
          if (!recipeExists) {
            // create a new recipe to fetch later for all users
            const newRecipe = await LikedRecipes(recipeData);
            // Save this recipe to db
            await newRecipe.save();
            return newRecipe;
          }
          // if recipe already saved, send existing saved recipe
          return recipeExists;
        })
        .then(async (recipe) => {
          // Find user using decoded token and add the recipe id for reference
          const updateduser = await User.findByIdAndUpdate(
            { _id: decodedToken._id },
            { $push: { recipes: recipe._id } },
            { new: true }
          ) // using populate to be able to send recipes to frontend
            .populate("recipes")
            .exec();
          // if user exists send recipes
          if (updateduser)
            return res.status(200).json({ userRecipes: updateduser.recipes });
        })
        .catch((error) => {
          return res.status(401).json({ errorMsg: error });
        });
    }
  );
};

const getSavedRecipe = async (req, res) => {
  let recipeIdString = await req.params.id;
  const recipeId = Number(recipeIdString);

  // getting saved recipe list to get objectId of recipe
  const retrievedRecipe = await LikedRecipes.findOne({ id: recipeId });

  if (!retrievedRecipe)
    return res.status(401).json({ errorMsg: "Recipe not found" });
  return res.status(200).json({ userRecipes: retrievedRecipe });
  // console.log(data)
};

const deleteSavedRecipe = async (req, res) => {
  const token = await req.cookies.token;
  let recipeIdString = await req.params.id;
  const recipeId = Number(recipeIdString);
  // console.log("deleting recipe!");
  // console.log(typeof recipeId);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      //   req.user_id = decodedToken._id;
      if (err) return res.status(401);
      // getting saved recipe list to get objectId of recipe
      const recipe = await LikedRecipes.findOne({ id: recipeId });
      // getting user and updating by using the $pull operator to remove
      //   the recipe from the array
      const user = await User.findByIdAndUpdate(
        decodedToken._id,
        { $pull: { recipes: recipe._id } },
        { new: true }
      ).populate("recipes");
      if (!user) return res.status(401).json({ errorMsg: "User not found" });
      return res.status(200).json({ userRecipes: user.recipes });
    }
  );

  // console.log(data)
};

export { getRecipe, saveRecipe, getSavedRecipe, deleteSavedRecipe };
