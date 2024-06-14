import video0 from "../assets/vid/avo_egg.mp4";
import video1 from "../assets/vid/lemon.mp4";
import video2 from "../assets/vid/stew.mp4";
import video3 from "../assets/vid/omlet.mp4";
import video4 from "../assets/vid/pizza.mp4";
import { useEffect } from "react";
import { useData } from "../context/DataContext";

function Videos() {
  const { dataState } = useData();
  // Selecting which video to play and stop
  const vidChange = (position: number) => {
    let videos = document.querySelectorAll(".video-slide");
    // using current video index number add class play to play the video
    videos[position].classList.add("play");
    // Using forEach loop through videos with ".video-slide" class and
    //  check if each index of loop video (v) equals video index number to
    //  stop videos not equal to current video positon that should play
    videos.forEach((v, index) => {
      if (index != position) {
        v.classList.remove("play");
      }
    });
  };

  // using useEffect for query search after everything has rendered
  useEffect(() => {
    switch (dataState.videoNum) {
      case 0:
        vidChange(0);
        // console.log("clicked 0");
        break;
      case 1:
        vidChange(1);
        // console.log("clicked 1");
        break;
      case 2:
        vidChange(2);
        // console.log("clicked 2");
        break;
      case 3:
        vidChange(3);
        // console.log("clicked 3");
        break;
      case 4:
        vidChange(4);
        // console.log("clicked 4");
        break;
    }
  }, [dataState.videoNum]); // set to render on prop/state change

  return (
    <>
      <video
        className="video-slide play"
        src={video0}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <video
        className="video-slide"
        src={video1}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <video
        className="video-slide"
        src={video2}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <video
        className="video-slide"
        src={video3}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <video
        className="video-slide"
        src={video4}
        autoPlay
        muted
        loop
        playsInline
      ></video>
    </>
  );
}

export default Videos;
