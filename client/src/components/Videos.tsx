import video0 from "../assets/vid/avo_egg.mp4";
import video1 from "../assets/vid/lemon.mp4";
import video2 from "../assets/vid/stew.mp4";
import video3 from "../assets/vid/omlet.mp4";
import video4 from "../assets/vid/pizza.mp4";
import { useEffect } from "react";

interface Props {
  selectVid: number;
}

function Videos(props: Props) {
  const vidChange = (position: number) => {
    let videos = document.querySelectorAll(".video-slide");
    videos[position].classList.add("play");
    videos.forEach((v, index) => {
      if (index != position) {
        v.classList.remove("play");
      }
    });
  };

  // using useEffect for query search after everything has rendered
  useEffect(() => {
    switch (props.selectVid) {
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
  }, [props.selectVid]); // set to render on prop/state change

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
