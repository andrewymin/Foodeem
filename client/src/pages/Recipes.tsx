import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import pizza from "../assets/img/pizza.svg";
import Modal from "../components/Modal";
import axios from "axios";
import { randomFoods } from "../spoonTestData";
import { useData } from "../context/DataContext";

interface Results {
  id: number;
  title: string;
  image: string;
}

const SEARCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/searchfoods"
    : "http://localhost:3001/searchfoods";

function Recipe() {
  const { state, dispatch } = useData();
  // later update states with useReducer?
  const [modalActive, setModalActive] = useState(false);
  const [recipeData, setRecipeData] = useState();
  const [searchFoods, setSearchFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (state.randomRecipe) {
      setRecipeData(state.randomRecipe);
      openModal();
    }
  }, [state.randomRecipe]);

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
                      </div>
                    ))
                  : searchFoods.map((i: Results, k) => (
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
        <img src={pizza} alt="pizza" className="food-img" />
      </div>
    </section>
  );
}

export default Recipe;
