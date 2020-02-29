import React from "react";
import FlipImage from "../FlipImage/FlipImage";

function FlipImageContainer(props) {
  return (
    <FlipImage
      a="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"
      b="https://upload.wikimedia.org/wikipedia/commons/d/d9/Collage_of_Nine_Dogs.jpg"
    ></FlipImage>
  );
}

export default FlipImageContainer;
