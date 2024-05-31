import { AiOutlineLoading3Quarters } from "react-icons/ai";
import parse from "html-react-parser";
import { useData } from "../context/DataContext";
// import { Link } from "react-router-dom";

interface Props {
  recipeData: any;
  modal: boolean;
  // isLoading: boolean;
}

interface Step {
  step: string;
}
interface Ingredient {
  original: string;
}

function Modal(props: Props) {
  const { state } = useData();
  let data = props.recipeData;

  return props.modal ? (
    <div className="modal-space">
      <div className="modal">
        {state.isLoading ? (
          <div className="center" style={{ color: "#1e7943" }}>
            <AiOutlineLoading3Quarters size={60} className="loading" />
          </div>
        ) : (
          <div className="modal-content">
            <div>
              <h1>{data.title}</h1>
              <img src={data.image} alt={data.title} />
              <p className="summary line-height">
                {parse(data.summary.split(". ").slice(0, -3).join(". "))}.
              </p>
            </div>
            <div className="details">
              <div className="time line-height">
                <p>
                  <span>Serving Size</span>: {data.servings}
                </p>
                <p>
                  <span>Ready Time {"(Minutes)"}</span>: {data.readyInMinutes}
                </p>
              </div>
              <h2>Ingredients</h2>
              <ul className="ingredients line-height">
                {data.extendedIngredients.map((i: Ingredient, k: number) => (
                  <li key={k}>{i.original}</li>
                ))}
              </ul>
              <h2>Instructions</h2>
              <ol className="instructions line-height">
                {data.analyzedInstructions[0].steps.map(
                  (i: Step, k: number) => (
                    <li key={k}>{i.step}</li>
                  )
                )}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="modal-ph">
      {state.isLoading ? (
        <div className="foods" style={{ color: "#1e7943" }}>
          <AiOutlineLoading3Quarters size={60} className="loading" />
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
