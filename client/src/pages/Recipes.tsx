import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import pizza from "../assets/img/pizza.svg";
import Modal from "../components/Modal";
import axios from "axios";
import { randomFoods } from "../spoonTestData";
// import { useLocation } from "react-router-dom";

interface Props {
  randomOneOn: boolean;
}

function Home(props: Props) {
  const [modalActive, setModalActive] = useState(false);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    if (props.randomOneOn) {
      axios
        .get("http://localhost:3001/randomfood") // place nodejs(aws) created route for url, using server to hide api keys
        .then((response) => {
          // this will return a list of recipes, i.e. recipes: array
          // after success place data of that arrayinto recipeData
          setRecipeData(response.data.recipes);
        })
        .then(() => {
          // after axios call send data to modal
          openModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // console.log(randomFoods.recipes);
  // let searchFoods = []; // hold json data of searched foods

  // might change this to useLayoutEffect if need to load layout first
  // useEffect(() => {
  //   // make axios get call for random foods, 1 for testing 8 after
  //   axios
  //     .get("http://localhost:3001/randomfoods") // place nodejs(aws) created route for url, using server to hide api keys
  //     .then((response) => {
  //       // after success place data into randomFoods
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleSearch = () => {
    axios
      .get("http://localhost:3001/randomfoods") // place nodejs(aws) created route for url, using server to hide api keys
      .then((response) => {
        // after success place data into randomFoods
        let randomFoods = response.data.meals;
        console.log(randomFoods[0]);
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
          <div className="search">
            {/* using searched input (handleSubmit=>this.state?) for another api call after submiting data */}
            <input
              type="search"
              name="search"
              id="searchbar"
              placeholder="Search"
            />
            {/* // set a different function to onClick where the function will call axios then call openModal */}
            <button onClick={handleSearch}>
              <AiOutlineSearch size={30} className="search-icon" />
            </button>
          </div>
          <div className="results">
            <h2>Recipes: </h2>
            <div className="foods">
              {/* DON'T FORGET that in mapping either use 'return' or get rid of {} for single return */}
              {randomFoods.recipes.map((i, k) => (
                <div
                  id={i.id.toString()}
                  key={k}
                  className="food-item"
                  title={i.title}
                  // set a different function to onClick where the function will call axios then call openModal
                  onClick={openModal}
                >
                  <img src={i.image} alt={i.title} />
                  <h3>{i.title}</h3>
                  {/* <p>{i.summary}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
