// import React from "react";
import parse from "html-react-parser";
// import { Link } from "react-router-dom";

interface Props {
  recipeData: any[];
  modal: boolean;
}

interface Step {
  step: string;
}
interface Ingredient {
  original: string;
}

function Modal(props: Props) {
  let data = props.recipeData[0];

  return props.modal ? (
    <div className="modal-space">
      <div className="modal">
        <div className="modal-content">
          <h1>{data.title}</h1>
          <img src={data.image} alt={data.title} />
          <p>{parse(data.summary.split(". ").slice(0, -3).join(". "))}.</p>
          <ul className="summary">
            <li>Serving Size: {data.servings}</li>
            <li>
              Ready Time {"(Minutes)"}: {data.readyInMinutes}
            </li>
          </ul>
          <h2>Ingredients</h2>
          <ul className="ingredients">
            {data.extendedIngredients.map((i: Ingredient, k: number) => (
              <li key={k}>{i.original}</li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <ul className="instructions">
            {data.analyzedInstructions[0].steps.map((i: Step, k: number) => (
              <li key={k}>{i.step}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div className="modal-ph"></div>
  );
}

export default Modal;
