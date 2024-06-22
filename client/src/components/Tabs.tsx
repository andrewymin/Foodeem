import Slider from "./Slider";
import { useData } from "../context/DataContext";
import { videoData } from "../assets/vid/videoData";

function Tabs() {
  const { dataState, randomOne } = useData();

  return (
    <section id="content">
      <h2 className="title">
        {dataState.videoNum == 0
          ? videoData[0].title
          : videoData.find((title) => title.id == dataState.videoNum)?.title}
        <span>.</span>
      </h2>
      <h1 className="sub-heading">
        {dataState.videoNum == 0
          ? videoData[0].subHeading
          : videoData.find((title) => title.id == dataState.videoNum)
              ?.subHeading}
      </h1>
      <div className="description">
        <p>
          {dataState.videoNum == 0
            ? videoData[0].description
            : videoData.find((title) => title.id == dataState.videoNum)
                ?.description}
        </p>
      </div>
      <div>
        <button onClick={randomOne}>Random Cookin'</button>
      </div>
      <Slider />
    </section>
  );
}

export default Tabs;
