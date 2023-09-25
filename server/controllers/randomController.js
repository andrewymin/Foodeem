import axios from 'axios';
import dotenv from 'dotenv';
import { response } from 'express';
dotenv.config();
// import axios from 'axios';

const apiKey = process.env.spoonacular;
const testKey = process.env.testKey; 

const getRandomFood = (req, res) => {

    axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`)
    .then((response)=>{
        // console.log(response.data)
        res.send(response.data.recipes[0])
    })
    .catch((error)=>{
        res.send(error)
    }) 

}

export default getRandomFood;
