import Slider from "./Slider";
import { useNavigate } from "react-router-dom";

interface Props {
  setVideoNum: React.Dispatch<React.SetStateAction<number>>; // Replace 'string' with the actual type of your state
  setRandomOneOn: React.Dispatch<React.SetStateAction<boolean>>; // Replace 'string' with the actual type of your state
  tabNum: number;
}

const tabHeadings = [
  { id: 0, title: "Breathtaking", subHeading: "tastes" },
  { id: 1, title: "Citris", subHeading: "tendencies" },
  { id: 2, title: "Explore", subHeading: "unknowns" },
  { id: 3, title: "Unique", subHeading: "adventures" },
  { id: 4, title: "relaxing", subHeading: "nights" },
];

function Tabs(props: Props) {
  // console.log(props.tabNum);
  let navigate = useNavigate();

  const randomOne = () => {
    let path = `recipes`;
    navigate(path);
    props.setRandomOneOn(true);
  };

  return (
    <section id="content">
      <h2 className="title">
        {props.tabNum == 0
          ? tabHeadings[0].title
          : tabHeadings.find((title) => title.id == props.tabNum)?.title}
        <span>.</span>
      </h2>
      <h1 className="sub-heading">
        {props.tabNum == 0
          ? tabHeadings[0].subHeading
          : tabHeadings.find((title) => title.id == props.tabNum)?.subHeading}
      </h1>
      <div className="description">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
          consectetur eaque quibusdam eos ipsa minus fugit, a, repellendus vero
          labore ad commodi sequi iure ducimus fugiat nulla quo inventore atque
          aspernatur consequatur, facere iste? Illo quisquam nesciunt in
          voluptas eius fuga veniam distinctio! Sint quis amet quasi neque odio.
          Distinctio.
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
