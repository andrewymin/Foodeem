import axios from 'axios';
import dotenv from 'dotenv';
import { response } from 'express';
dotenv.config();
// import axios from 'axios';

const apiKey = process.env.spoonacular;
const testKey = process.env.testKey; 

const getSearchFoods = (req, res) => {
    let query = req.query.search;

  // For axios don't forget to add "https:" before url or get ECONNREFUSED error
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=8&apiKey=${apiKey}`)
    .then((response)=>{
        res.send(response.data)
    })
    .catch((error)=>{
        res.send(error)
    }) 

}

export default getSearchFoods;
