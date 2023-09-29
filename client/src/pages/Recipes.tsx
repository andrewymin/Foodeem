import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import pizza from "../assets/img/pizza.svg";
import Modal from "../components/Modal";
import axios from "axios";
import { randomFoods } from "../spoonTestData";
// import { useLocation } from "react-router-dom";

interface Props {
  randomRecipe: undefined;
}

interface Results {
  id: number;
  title: string;
  image: string;
}

function Recipe(props: Props) {
  // later update states with useReducer
  const [modalActive, setModalActive] = useState(false);
  const [recipeData, setRecipeData] = useState();
  const [searchFoods, setSearchFoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (props.randomRecipe) {
      setRecipeData(props.randomRecipe);
      openModal();
      // console.log(props.randomRecipe);
    }
  }, [props.randomRecipe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get("http://localhost:3001/searchfoods", {
        params: {
          search: search,
        },
      }) // place nodejs(aws) created route for url, using server to hide api keys
      .then((response) => {
        // after success place data into randomFoods
        // let randomFoods = response.data.meals;
        setSearchFoods(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openRecipe = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.target.id);
    // console.log(typeof e.target.id);
    let target = e.target as HTMLDivElement;
    let targetId = target.id;
    axios
      // .get("http://localhost:3001/searchfoods/recipe", {
      .get(
        "https://hicnd45lab.execute-api.us-west-2.amazonaws.com/prod/searchfoods/recipe",
        {
          params: {
            id: targetId,
          },
        }
      ) // place nodejs(aws) created route for url, using server to hide api keys
      .then((response) => {
        setRecipeData(response.data);
      })
      .then(() => {
        // after axios call send data to modal
        openModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = () => {
    setModalActive(true);
  };

  return (
    <section id="recipe">
      <div className="container">
        <img src={pizza} alt="pizza" className="food-img" />
        {/*need to somehow pass data into this component when set to active*/}
        <Modal recipeData={recipeData} modal={modalActive} />
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recipe;
