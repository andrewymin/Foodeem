import { useEffect } from "react";

interface Props {
  tabNum: number;
  setVideoNum: React.Dispatch<React.SetStateAction<number>>;
}

function Slider(props: Props) {
  const keys: number[] = [0, 1, 2, 3, 4]; // Replace with video path? use useEffect for querySelector!

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const sliderBtns = document.querySelectorAll(".slider-btn");
    const target = e.target as HTMLElement;
    let targetIndex = parseInt(target.classList[1].slice(1)); // use this to get index of clicked btn

    props.setVideoNum(targetIndex);

    !target.classList.contains("active") && target.classList.toggle("active");

    sliderBtns.forEach((btn: Element) => {
      if (btn != target) {
        btn.classList.remove("active");
      }
      // console.log(index);
    });
  };

  useEffect(() => {
    const sliderBtns = document.querySelectorAll(".slider-btn");
    let currentBtn = sliderBtns[props.tabNum];
    currentBtn.classList.add("active");
    sliderBtns.forEach((btn: Element) => {
      if (btn != currentBtn) {
        btn.classList.remove("active");
      }
      // console.log(index);
    });
  }, [props.tabNum]);

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
