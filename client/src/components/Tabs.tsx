import Slider from "./Slider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { videoData } from "../assets/vid/videoData";

interface Props {
  setVideoNum: React.Dispatch<React.SetStateAction<number>>; // Replace 'string' with the actual type of your state
  tabNum: number;
}

function Tabs(props: Props) {
  const { dispatch } = useData();
  let navigate = useNavigate();

  const randomOne = () => {
    let path = `recipes`;
    dispatch({ type: "LOADING" });
    axios
      // .get("http://localhost:3001/randomfood") // place nodejs(aws) created route for url, using server to hide api keys
      .get(
        "https://7aypfs7kzc.execute-api.us-west-2.amazonaws.com/prod/randomfood"
      ) // place nodejs(aws) created route for url, using server to hide api keys
      .then((response) => {
        // this will return a list of recipes, i.e. recipes: array
        // after success place data of that arrayinto recipeData
        // props.getRandomRecipe(response.data.body);
        dispatch({ type: "RANDOMRECIPE", payload: response.data.body });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "UNLOADING" });
      });

    navigate(path);
  };

  return (
    <section id="content">
      <h2 className="title">
        {props.tabNum == 0
          ? videoData[0].title
          : videoData.find((title) => title.id == props.tabNum)?.title}
        <span>.</span>
      </h2>
      <h1 className="sub-heading">
        {props.tabNum == 0
          ? videoData[0].subHeading
          : videoData.find((title) => title.id == props.tabNum)?.subHeading}
      </h1>
      <div className="description">
        <p>
          {props.tabNum == 0
            ? videoData[0].description
            : videoData.find((title) => title.id == props.tabNum)?.description}
        </p>
      </div>
      <div>
        <button onClick={randomOne}>Random Cookin'</button>
      </div>
      <Slider tabNum={props.tabNum} setVideoNum={props.setVideoNum} />
    </section>
  );
}

export default Tabs;
