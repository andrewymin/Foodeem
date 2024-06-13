import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../components/Modal";
import { randomFoods } from "../spoonTestData";
import { useData } from "../context/DataContext";
import { FaHeart } from "react-icons/fa";
import { customAxios } from "../hooks/axiosInstance";
import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";

interface SavedFood {
  id: number;
  title: string;
  image: string;
  summary: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: [];
  analyzedInstructions: [];
}

const SEARCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/searchfoods"
    : "http://localhost:3001/searchfoods";

function SavedRecipes() {
  const { state, dispatch } = useData();
  const { showError, showSuccess } = useToast();

  // later update states with useReducer?
  const [modalActive, setModalActive] = useState(false);
  const [recipeData, setRecipeData] = useState();
  const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    let savedRecipes = localStorage.getItem("savedRecipes");

    if (savedRecipes) {
      let savedRecipesArray = JSON.parse(savedRecipes);
      console.log(savedRecipesArray);
      setSavedFoods((prevArray) => [...prevArray, savedRecipesArray]);
      console.log(savedFoods);
    }
  }, []);

  const saveRecipe = async (e: React.MouseEvent) => {
    e.preventDefault();
    // stops bubbling after click (doesn't click things behind it)
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    target.style.color = "#d5334f";
    // Getting data attribute thats on target using dataset
    //  the "!"  tells TypeScript that even though something looks like it could be null,
    //  it can trust you that it's not.
    const recipeId = target.dataset.id!;
    // Use the id to make call to get specific recipe and store data to db
    try {
      await customAxios
        .post(
          "searchfoods/save-recipe",
          // .get(
          // "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/searchfoods/recipe",
          {
            id: recipeId,
          }
        )
        .then((res) => {
          // data is sorted on server side
          showSuccess("Saved Recipe! 🎉");
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(res.data.userRecipes)
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const openRecipe = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLDivElement;
    let targetId = target.id;
    dispatch({ type: "LOADING" });

    customAxios
      .get("searchfoods/get-saved-recipe", {
        params: {
          id: targetId,
        },
      }) // place nodejs(aws) created route for url, using server to hide api keys
      .then((response) => {
        setRecipeData(response.data.body);
      })
      .then(() => {
        // after axios call send data to modal
        openModal();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "UNLOADING" });
      });
  };

  const openModal = () => {
    setModalActive(true);
  };

  return (
    <section id="recipe">
      <div className="container">
        <div className="content">
          <div className="results saved-recipes">
            <h2>Saved Recipes: </h2>
            {searchLoading ? (
              <div className="foods" style={{ color: "#1e7943" }}>
                <AiOutlineLoading3Quarters size={60} className="loading" />
              </div>
            ) : (
              <div className="foods">
                {savedFoods.length == 0
                  ? randomFoods.recipes.map((i, k) => (
                      <div
                        id={i.id.toString()}
                        key={k}
                        className="food-item"
                        title={i.title}
                        // set a different function to onClick where the function will call axios then call openModal
                        onClick={openRecipe}
                      >
                        <img src={i.image} alt={i.title} />
                        <h3>{i.title}</h3>

                        <FaHeart
                          className="heart-icon"
                          onClick={saveRecipe}
                          data-id={i.id.toString()}
                        />
                      </div>
                    ))
                  : savedFoods.map((i, k) => (
                      <div
                        id={i.id.toString()}
                        key={k}
                        className="food-item"
                        title={i.title}
                        // set a different function to onClick where the function will call axios then call openModal
                        onClick={openRecipe}
                      >
                        <img src={i.image} alt={i.title} />
                        <h3>{i.title}</h3>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
        <Modal
          recipeData={recipeData}
          modal={modalActive}
          // isLoading={props.isLoading}
        />
      </div>
      <ToastContainer />
    </section>
  );
}

export default SavedRecipes;
