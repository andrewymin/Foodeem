import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../components/Modal";
import { randomFoods } from "../spoonTestData";
import { useData } from "../context/DataContext";
import { customAxios, deleteRecipeWithData } from "../hooks/axiosInstance";
import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";
import { FaBookmark } from "react-icons/fa6";

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
  // use data context to get loading comonent
  const { dataState, dispatch } = useData();
  const { showError, showSuccess } = useToast();

  // later update states with useReducer?
  const [modalActive, setModalActive] = useState(false);
  const [recipeData, setRecipeData] = useState();
  const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);

  let savedRecipes = localStorage.getItem("savedRecipes");
  // console.log(savedRecipes);
  const fetchSavedRecipes = () => {
    try {
      if (savedRecipes) {
        let savedRecipesArray = JSON.parse(savedRecipes);
        // console.log(savedRecipesArray[0]);
        for (let i = 0; i < savedRecipesArray.length; i++) {
          setSavedFoods((prevArray) => [...prevArray, savedRecipesArray[i]]);
        }
      } else setSavedFoods([]);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "UNLOADING" }); // set loading to false
    }
  };

  useEffect(() => {
    dispatch({ type: "LOADING" }); // set loading to true
    fetchSavedRecipes();
  }, []);

  const delRecipe = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    const recipeId = target.dataset.id!;

    try {
      await customAxios
        .delete(`searchfoods/delete-saved-recipe/${recipeId}`)
        .then((res) => {
          // data is sorted on server side
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(res.data.userRecipes)
          );
          showSuccess("Recipe removed from saved recipes");
          setSavedFoods(res.data.userRecipes);
          setModalActive(false);

          // fetchSavedRecipes();
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
      .get(`searchfoods/get-saved-recipe/${targetId}`)
      .then((res) => {
        setRecipeData(res.data.userRecipes);
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
            {dataState.isLoading ? (
              <div className="foods" style={{ color: "#1e7943" }}>
                <AiOutlineLoading3Quarters size={60} className="loading" />
              </div>
            ) : (
              <div className="foods">
                {savedFoods.length == 0 ? (
                  <div className="saved-recipes-ph">No Saved Recipes 😢</div> // ph = placeholder
                ) : (
                  savedFoods.map((i, k) => (
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

                      <FaBookmark
                        className="save-icon "
                        onClick={delRecipe}
                        data-id={i.id.toString()}
                      />
                    </div>
                  ))
                )}
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
