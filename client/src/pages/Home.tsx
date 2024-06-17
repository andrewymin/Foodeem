import Tabs from "../components/Tabs";
import Social from "../components/Social";
import Videos from "../components/Videos";
import { useEffect } from "react";
import { useData } from "../context/DataContext";

function Home() {
  // const [videoNum, setVideoNum] = useState(0);
  // const { intervalId } = useData();
  const { dataState, dispatch } = useData();

  useEffect(() => {
    // setting time interval for videos to loop, 0-4 videos
    const intervalId = setInterval(() => {
      // Get previous videoNum using 'pre' and
      //   increment the count and reset to 0 if it reaches 4
      dispatch({ type: "VID_NUM", payload: (dataState.videoNum + 1) % 5 });
    }, 10000); // 10000 milliseconds = 10 seconds
    // intervalId;
    // console.log("Video Number from Home useEffect: ", dataState.videoNum);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dataState.videoNum]);

  // console.log(videoNum);

  return (
    <>
      <div className="blur"></div>
      <Videos />
      <Tabs />
      <Social />
    </>
  );
}

export default Home;
