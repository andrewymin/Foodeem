import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import pizza from "../assets/img/pizza.svg";
import Modal from "../components/Modal";
import axios from "axios";
import { randomFoods } from "../spoonTestData";
import { useData } from "../context/DataContext";
import { customAxios } from "../hooks/axiosInstance";
import useToast from "../components/Toastify";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
// import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

interface Results {
  id: number;
  title: string;
  image: string;
}

interface RecipeId {
  id: number;
}

const SEARCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/searchfoods"
    : "http://localhost:3001/searchfoods";

function Recipe() {
  const { state } = useAuth();
  const { dataState, dispatch } = useData();
  const navigate = useNavigate();
  // later update states with useReducer?
  const [modalActive, setModalActive] = useState(false);
  const [recipeData, setRecipeData] = useState();
  const [searchFoods, setSearchFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [savedRecipesIds, setRecipesIds] = useState<RecipeId[]>([]);
  const { showSuccess } = useToast();

  useEffect(() => {
    if (dataState.randomRecipe) {
      setRecipeData(dataState.randomRecipe);
      openModal();
    }
  }, [dataState.randomRecipe]);

  useEffect(() => {
    if (state.isAuth) {
      const savedRecipesString = localStorage.getItem("savedRecipes");
      // let savedRecipesIds = [];
      if (savedRecipesString) {
        let savedRecipesArray = JSON.parse(savedRecipesString);
        console.log(savedRecipesArray.length);
        for (let i = 0; i < savedRecipesArray.length; i++) {
          setRecipesIds([savedRecipesArray[i].id]);
        }
      }
    }
    console.log(savedRecipesIds);
    console.log(state.isAuth);
  }, [state.isAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchLoading(true);
    axios
      .get(SEARCH_URL, {
        params: {
          search: search,
        },
      }) // place nodejs(aws) created route for url, using server to hide api keys
      .then((response) => {
        // console.log(response.data.results);
        // after success place data into randomFoods
        // let randomFoods = response.data.meals;
        setSearchFoods(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  const openRecipe = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLDivElement;
    let targetId = target.id;
    dispatch({ type: "LOADING" });

    axios
      // .get("http://localhost:3001/searchfoods/recipe", {
      .get(
        "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/searchfoods/recipe",
        {
          params: {
            id: targetId,
          },
        }
      ) // place nodejs(aws) created route for url, using server to hide api keys
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

  const saveRecipe = async (e: React.MouseEvent) => {
    e.preventDefault();
    // stops bubbling after click (doesn't click things behind it)
    e.stopPropagation();

    const target = e.target as HTMLButtonElement;
    // Getting data attribute thats on target using dataset
    //  the "!"  tells TypeScript that even though something looks like it could be null,
    //  it can trust you that it's not.
    const recipeId = target.dataset.id!;

    if (!state.isAuth) return navigate("/login");
    target.classList.toggle("bookmarked");

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

  const delRecipe = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    target.classList.toggle("bookmarked");
    const recipeId = target.dataset.id!;

    try {
      await customAxios
        .delete(`searchfoods/delete-saved-recipe/${recipeId}`)
        .then((res) => {
          // console.log(res.data.userRecipes);
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(res.data.userRecipes)
          );
          showSuccess("Recipe removed from saved recipes");
          // fetchSavedRecipes();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="recipe">
      <div className="container">
        <div className="content">
          {/* using searched input (handleSubmit=>this.state?) for another api call after submiting data */}
          <form action="get" className="search" onSubmit={handleSearch}>
            <input
              type="search"
              name="search"
              id="searchbar"
              placeholder="Search"
              onChange={handleChange}
            />
            <button type="submit" style={{ padding: "0" }}>
              <AiOutlineSearch size={30} className="search-icon" />
            </button>
          </form>
          {/* // set a different function to onClick where the function will call axios then call openModal */}
          <div className="results">
            <h2>Recipes: </h2>
            {searchLoading ? (
              <div className="foods" style={{ color: "#1e7943" }}>
                <AiOutlineLoading3Quarters size={60} className="loading" />
              </div>
            ) : (
              <div className="foods">
                {searchFoods.length == 0
                  ? randomFoods.recipes.map((i: any, k) => (
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
                        {savedRecipesIds.includes(i.id) ? (
                          <FaBookmark
                            className="save-icon bookmarked"
                            onClick={delRecipe}
                            data-id={i.id.toString()}
                          />
                        ) : (
                          <FaBookmark
                            className="save-icon"
                            onClick={saveRecipe}
                            data-id={i.id.toString()}
                          />
                        )}
                      </div>
                    ))
                  : searchFoods.map((i: any, k) => (
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

                        {savedRecipesIds.includes(i.id) ? (
                          <FaBookmark
                            className="save-icon bookmarked"
                            onClick={delRecipe}
                            data-id={i.id.toString()}
                          />
                        ) : (
                          <FaBookmark
                            className="save-icon"
                            onClick={saveRecipe}
                            data-id={i.id.toString()}
                          />
                        )}
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
        <img src={pizza} alt="pizza" className="food-img" />
      </div>
      <ToastContainer />
    </section>
  );
}

export default Recipe;
