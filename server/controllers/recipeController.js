import axios from 'axios';
import dotenv from 'dotenv';
import { response } from 'express';
dotenv.config();
// import axios from 'axios';

const apiKey = process.env.spoonacular;
const testKey = process.env.testKey; 

const getRecipe = (req, res) => {
    let recipeId = req.query.id;
    // console.log(data)

  // For axios don't forget to add "https:" before url or get ECONNREFUSED error
    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`)
    .then((response)=>{
        // console.log(response.data)
        res.send(response.data)
    })
    .catch((error)=>{
        res.send(error)
    }) 
}

export default getRecipe;
