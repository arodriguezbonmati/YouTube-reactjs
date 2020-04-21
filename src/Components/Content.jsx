import React from "react";

import cross from "../Images/redcross.svg";

const Content = (props) => {
  const url = `https://www.youtube.com/embed/${props.videoID}`;

  const buttonHandler = () => {
    props.setShowVideos(true);
  };

  return props.videoID !== null ? (
    <div className="video_section">
      <div className="cross">
        <img className="redcross" src={cross} alt="cross" onClick={() => buttonHandler()}/>
      </div>
      <div className="videoFrame">
        <iframe
          title="video"
          src={url}
          width="1280"
          height="720"
          className="videoFrame"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  ) : null;
};

export default Content;
