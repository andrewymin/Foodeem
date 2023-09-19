import axios from 'axios';
import dotenv from 'dotenv';
import { response } from 'express';
dotenv.config();
// import axios from 'axios';

const apiKey = process.env.spoonacular;
const testKey = process.env.testKey; 

const getRandomFood = (req, res) => {
    res.send({
        recipes: [
          {
            vegetarian: false,
            vegan: false,
            glutenFree: true,
            dairyFree: false,
            veryHealthy: false,
            cheap: false,
            veryPopular: false,
            sustainable: false,
            lowFodmap: false,
            weightWatcherSmartPoints: 4,
            gaps: "no",
            preparationMinutes: -1,
            cookingMinutes: -1,
            aggregateLikes: 2,
            healthScore: 14,
            creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
            license: "CC BY 3.0",
            sourceName: "Foodista",
            pricePerServing: 169.21,
            extendedIngredients: [
              {
                id: 10716050,
                aisle: "Canned and Jarred",
                image: "cooked-cannellini-beans.png",
                consistency: "SOLID",
                name: "cannellini beans",
                nameClean: "cannellini beans",
                original: "240g cannellini beans, (a can of cooked beans)",
                originalName: "cannellini beans, (a can of cooked beans)",
                amount: 240.0,
                unit: "g",
                meta: ["cooked", "canned", "(a can of beans)"],
                measures: {
                  us: {
                    amount: 8.466,
                    unitShort: "oz",
                    unitLong: "ounces",
                  },
                  metric: {
                    amount: 240.0,
                    unitShort: "g",
                    unitLong: "grams",
                  },
                },
              },
              {
                id: 11209,
                aisle: "Produce",
                image: "eggplant.png",
                consistency: "SOLID",
                name: "aubergines",
                nameClean: "eggplant",
                original: "2 aubergines",
                originalName: "aubergines",
                amount: 2.0,
                unit: "",
                meta: [],
                measures: {
                  us: {
                    amount: 2.0,
                    unitShort: "",
                    unitLong: "",
                  },
                  metric: {
                    amount: 2.0,
                    unitShort: "",
                    unitLong: "",
                  },
                },
              },
              {
                id: 4053,
                aisle: "Oil, Vinegar, Salad Dressing",
                image: "olive-oil.jpg",
                consistency: "LIQUID",
                name: "olive oil",
                nameClean: "olive oil",
                original: "1 Tbs olive oil",
                originalName: "olive oil",
                amount: 1.0,
                unit: "Tbs",
                meta: [],
                measures: {
                  us: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                  metric: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                },
              },
              {
                id: 11215,
                aisle: "Produce",
                image: "garlic.png",
                consistency: "SOLID",
                name: "garlic",
                nameClean: "garlic",
                original: "2 cloves garlic, chopped",
                originalName: "garlic, chopped",
                amount: 2.0,
                unit: "cloves",
                meta: ["chopped"],
                measures: {
                  us: {
                    amount: 2.0,
                    unitShort: "cloves",
                    unitLong: "cloves",
                  },
                  metric: {
                    amount: 2.0,
                    unitShort: "cloves",
                    unitLong: "cloves",
                  },
                },
              },
              {
                id: 10111962,
                aisle: "Produce",
                image: "dried-arbol-chiles.jpg",
                consistency: "SOLID",
                name: "chilis or",
                nameClean: "dried chili pepper",
                original: "1-2 small dried red chilis crushed or chopped",
                originalName: "dried red chilis crushed or chopped",
                amount: 1.0,
                unit: "small",
                meta: ["dried", "red", "crushed", "chopped"],
                measures: {
                  us: {
                    amount: 1.0,
                    unitShort: "small",
                    unitLong: "small",
                  },
                  metric: {
                    amount: 1.0,
                    unitShort: "small",
                    unitLong: "small",
                  },
                },
              },
              {
                id: 2044,
                aisle: "Produce",
                image: "fresh-basil.jpg",
                consistency: "SOLID",
                name: "basil",
                nameClean: "fresh basil",
                original: "1 Tbs fresh basil",
                originalName: "fresh basil",
                amount: 1.0,
                unit: "Tbs",
                meta: ["fresh"],
                measures: {
                  us: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                  metric: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                },
              },
              {
                id: 2044,
                aisle: "Produce",
                image: "basil.jpg",
                consistency: "SOLID",
                name: "basil",
                nameClean: "fresh basil",
                original: "1 Tbs fresh basil",
                originalName: "fresh basil",
                amount: 1.0,
                unit: "Tbs",
                meta: ["fresh"],
                measures: {
                  us: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                  metric: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                },
              },
              {
                id: 10511297,
                aisle: "Produce",
                image: "parsley.jpg",
                consistency: "SOLID",
                name: "parsley",
                nameClean: "fresh parsley",
                original: "1 Tbs fresh parsley, chopped",
                originalName: "fresh parsley, chopped",
                amount: 1.0,
                unit: "Tbs",
                meta: ["fresh", "chopped"],
                measures: {
                  us: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                  metric: {
                    amount: 1.0,
                    unitShort: "Tbs",
                    unitLong: "Tb",
                  },
                },
              },
              {
                id: 6615,
                aisle: "Canned and Jarred",
                image: "chicken-broth.png",
                consistency: "LIQUID",
                name: "vegetable stock from 1 cube",
                nameClean: "vegetable stock",
                original: "500ml vegetable stock from 1 cube",
                originalName: "vegetable stock from 1 cube",
                amount: 500.0,
                unit: "ml",
                meta: [],
                measures: {
                  us: {
                    amount: 2.113,
                    unitShort: "cups",
                    unitLong: "cups",
                  },
                  metric: {
                    amount: 500.0,
                    unitShort: "ml",
                    unitLong: "milliliters",
                  },
                },
              },
              {
                id: 1002030,
                aisle: "Spices and Seasonings",
                image: "pepper.jpg",
                consistency: "SOLID",
                name: "pepper",
                nameClean: "black pepper",
                original: "Freshly ground black pepper",
                originalName: "Freshly ground black pepper",
                amount: 4.0,
                unit: "servings",
                meta: ["black", "freshly ground"],
                measures: {
                  us: {
                    amount: 4.0,
                    unitShort: "servings",
                    unitLong: "servings",
                  },
                  metric: {
                    amount: 4.0,
                    unitShort: "servings",
                    unitLong: "servings",
                  },
                },
              },
              {
                id: 1033,
                aisle: "Cheese",
                image: "parmesan.jpg",
                consistency: "SOLID",
                name: "parmesan cheese",
                nameClean: "parmesan",
                original: "50g Parmesan cheese, grated",
                originalName: "Parmesan cheese, grated",
                amount: 50.0,
                unit: "g",
                meta: ["grated"],
                measures: {
                  us: {
                    amount: 1.764,
                    unitShort: "oz",
                    unitLong: "ounces",
                  },
                  metric: {
                    amount: 50.0,
                    unitShort: "g",
                    unitLong: "grams",
                  },
                },
              },
            ],
            id: 640591,
            title: "Creamy aubergine and cannellini soup",
            readyInMinutes: 45,
            servings: 4,
            sourceUrl:
              "https://www.foodista.com/recipe/VVYWJTJJ/creamy-aubergine-and-cannellini-soup",
            image: "https://spoonacular.com/recipeImages/640591-556x370.jpg",
            imageType: "jpg",
            summary:
              'Creamy aubergine and cannellini soup might be just the hor d\'oeuvre you are searching for. This recipe serves 4. One portion of this dish contains about <b>10g of protein</b>, <b>7g of fat</b>, and a total of <b>190 calories</b>. For <b>$1.69 per serving</b>, this recipe <b>covers 12%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 2 foodies and cooks. It is a good option if you\'re following a <b>gluten free</b> diet. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. If you have garlic, parsley, olive oil, and a few other ingredients on hand, you can make it. <b>Autumn</b> will be even more special with this recipe. It is brought to you by Foodista. Overall, this recipe earns a <b>good spoonacular score of 51%</b>. Try <a href="https://spoonacular.com/recipes/creamy-roasted-mushroom-and-cannellini-bean-soup-1336031">Creamy Roasted Mushroom and Cannellini Bean Soup</a>, <a href="https://spoonacular.com/recipes/creamy-roasted-mushroom-and-cannellini-bean-soup-627078">Creamy Roasted Mushroom and Cannellini Bean Soup</a>, and <a href="https://spoonacular.com/recipes/creamy-cannellini-beans-with-garlic-and-oregano-213902">Creamy Cannellini Beans with Garlic and Oregano</a> for similar recipes.',
            cuisines: [],
            dishTypes: [
              "antipasti",
              "soup",
              "starter",
              "snack",
              "appetizer",
              "antipasto",
              "hor d'oeuvre",
            ],
            diets: ["gluten free"],
            occasions: ["fall", "winter"],
            instructions:
              "Prick the eggplant and bake it on a tray at your oven's highest temperature for 40 minutes.\nIn a deep pan fry the olive oil, garlic, chilli, basil and parsley until garlic is soft but not coloured.\nCut the eggplant and scrape the insides into the pan.\nAdd the cooked beans and stock.\nBring to boil, simmer for 20 minutes.\nPuree half, then mix through the rest. Season with pepper.\nSprinkle abundantly with grated Parmesan cheese and serve.",
            analyzedInstructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Prick the eggplant and bake it on a tray at your oven's highest temperature for 40 minutes.",
                    ingredients: [
                      {
                        id: 11209,
                        name: "eggplant",
                        localizedName: "eggplant",
                        image: "eggplant.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                      },
                    ],
                    length: {
                      number: 40,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 2,
                    step: "In a deep pan fry the olive oil, garlic, chilli, basil and parsley until garlic is soft but not coloured.",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 11297,
                        name: "parsley",
                        localizedName: "parsley",
                        image: "parsley.jpg",
                      },
                      {
                        id: 11819,
                        name: "chili pepper",
                        localizedName: "chili pepper",
                        image: "red-chili.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 2044,
                        name: "basil",
                        localizedName: "basil",
                        image: "basil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 3,
                    step: "Cut the eggplant and scrape the insides into the pan.",
                    ingredients: [
                      {
                        id: 11209,
                        name: "eggplant",
                        localizedName: "eggplant",
                        image: "eggplant.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 4,
                    step: "Add the cooked beans and stock.",
                    ingredients: [
                      {
                        id: 0,
                        name: "beans",
                        localizedName: "beans",
                        image: "kidney-beans.jpg",
                      },
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 5,
                    step: "Bring to boil, simmer for 20 minutes.",
                    ingredients: [],
                    equipment: [],
                    length: {
                      number: 20,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 6,
                    step: "Puree half, then mix through the rest. Season with pepper.",
                    ingredients: [
                      {
                        id: 1002030,
                        name: "pepper",
                        localizedName: "pepper",
                        image: "pepper.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 7,
                    step: "Sprinkle abundantly with grated Parmesan cheese and serve.",
                    ingredients: [
                      {
                        id: 1032,
                        name: "grated parmesan cheese",
                        localizedName: "grated parmesan cheese",
                        image: "parmesan.jpg",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            originalId: null,
            spoonacularSourceUrl:
              "https://spoonacular.com/creamy-aubergine-and-cannellini-soup-640591",
          }
        ]}
    );

  // For axios don't forget to add "https:" before url or get ECONNREFUSED error
    // axios.get(`https://www.themealdb.com/${testKey}`)
    // .then((response)=>{
    //     // console.log(response.data)
    //     res.send(response.data)
    // })
    // .catch((error)=>{
    //     res.send(error)
    // }) 

}

export default getRandomFood;
