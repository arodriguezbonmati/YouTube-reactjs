import React, { useState, useEffect } from "react";
import axios from "axios";

import cross from "../Images/redcross.svg";

const Content = (props) => {
  const [recommendations, setRecommendations] = useState({
    baseURL: "https://www.googleapis.com/youtube/v3/search",
  });

  useEffect(() => {
    if (props.videoID !== "") {
      axios
        .get(recommendations.baseURL, {
          params: {
            part: "snippet",
            relatedToVideoId: props.videoID,
            type: "video",
            key: process.env.REACT_APP_KEY,
          },
        })
        .then((response) => {
          setRecommendations(response.data.items);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [props.videoID]);

  const url = `https://www.youtube.com/embed/${props.videoID}`;

  const buttonHandler = () => {
    props.setShowVideos(true);
  };

  return props.videoID !== null ? (
    <div className="video_section">
      {console.log(recommendations)}
      <div className="cross">
        <img
          className="redcross"
          src={cross}
          alt="cross"
          onClick={() => buttonHandler()}
        />
      </div>
      <div className="videoFrame">
        <iframe
          title="video"
          src={url}
          width="1024"
          height="600"
          className="videoFrame"
          allowFullScreen
        ></iframe>
      </div>
      <div className="recommendations_section">
        {recommendations.map((i) => {
          return (
            <div className="recommendations" key={i.etag}>
              <div
                className="recommendations_thumbnail"
                onClick={() => {
                  return props.setVideoID(i.id.videoId);
                }}
              >
                <img
                  src={i.snippet.thumbnails.medium.url}
                  alt="recommendations_thumbnail"
                ></img>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Content;
