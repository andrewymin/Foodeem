import { useEffect } from "react";
import { useData } from "../context/DataContext";

// interface Props {
//   tabNum: number;
//   setVideoNum: React.Dispatch<React.SetStateAction<number>>;
// }

function Slider() {
  const { state, dispatch } = useData();
  const keys: number[] = [0, 1, 2, 3, 4]; // Replace with video path? use useEffect for querySelector!

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const sliderBtns = document.querySelectorAll(".slider-btn");
    const target = e.target as HTMLElement;
    let targetIndex = parseInt(target.classList[1].slice(1)); // use this to get index of clicked btn

    dispatch({ type: "VID_NUM", payload: targetIndex }); // send clicked index to set state
    // props.setVideoNum(targetIndex); // send clicked index to set state
    // console.log("This is state after clicking dot nav: ", state.videoNum);

    !target.classList.contains("active") && target.classList.toggle("active"); // if target doesn't have class 'active' toggle it on

    // loop through each slider button and remove active class if not the clicked target
    sliderBtns.forEach((btn: Element) => {
      if (btn != target) {
        btn.classList.remove("active");
      }
      // console.log(index);
    });
  };

  useEffect(() => {
    const sliderBtns = document.querySelectorAll(".slider-btn");
    let currentBtn = sliderBtns[state.videoNum];
    currentBtn.classList.add("active");
    sliderBtns.forEach((btn: Element) => {
      if (btn != currentBtn) {
        btn.classList.remove("active");
      }
    });
  }, [state.videoNum]);

  return (
    <div className="slider-nav">
      {keys.map((btnNum, index) => (
        <div
          onClick={handleClick}
          key={index}
          className={
            index == 0 ? "slider-btn s0 active" : `slider-btn s${btnNum}`
          }
        ></div>
      ))}
    </div>
  );
}

export default Slider;
