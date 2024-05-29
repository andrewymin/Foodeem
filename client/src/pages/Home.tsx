import Tabs from "../components/Tabs";
import Social from "../components/Social";
import Videos from "../components/Videos";
import { useState, useEffect } from "react";

function Home() {
  const [videoNum, setVideoNum] = useState(0);

  useEffect(() => {
    // console.log("did this log once?");
    const intervalId = setInterval(() => {
      // Increment the count and reset to 0 if it reaches 4
      setVideoNum((prevVideoNum) => (prevVideoNum + 1) % 5);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // console.log(videoNum);

  return (
    <>
      <div className="blur"></div>
      <Videos selectVid={videoNum} />
      <Tabs tabNum={videoNum} setVideoNum={setVideoNum} />
      <Social />
    </>
  );
}

export default Home;
