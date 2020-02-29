import React, { useState } from "react";

function FlipImage(props) {
  const [currImg, setCurrImg] = useState(true);

  function changeImage() {
    setCurrImg(!currImg);
  }

  function imgSrc() {
    if (currImg) {
      return props.a;
    } else {
      return props.b;
    }
  }

  return (
    <div>
      <img
        alt="image a"
        src={imgSrc()}
        width={400}
        height={400}
        onClick={function() {
          changeImage();
        }}
      ></img>
    </div>
  );
}

export default FlipImage;
