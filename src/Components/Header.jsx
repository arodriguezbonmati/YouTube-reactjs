import React, { useState, useEffect } from "react";
import axios from "axios";
import cloneDeep from "clone-deep";
import logoYT from "../Images/logo.png";
import "./Styles.css";

const Header = (props) => {
  const [searchURL, setSearchURL] = useState({
    baseURL: "https://www.googleapis.com/youtube/v3/search",
    maxResults: 10,
    q: "",
  });
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (searchURL.q !== "") {
      axios
        .get(searchURL.baseURL, {
          params: {
            key: process.env.REACT_APP_KEY,
            part: "snippet",
            maxResults: searchURL.maxResults,
            q: searchURL.q,
          },
        })
        .then((response) => {
          setResults(response.data.items);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [searchURL.q]);

  const onInputChange = () => {
    const state = cloneDeep(searchURL);
    state.q = document.getElementById("search").value;
    setSearchURL(state);
    props.setShowVideos(true);
  };

  const refresh = () => {
    window.location.reload(false);
  };

  return (
    <div>
      {console.log(results)}
      <div className="logo_search">
        <div className="logo_container">
          <img
            className="logo_principal"
            src={logoYT}
            alt="logo"
            onClick={() => refresh()}
          />
        </div>
        <input
          className="mainSearch"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
        />
        <button className="search_button" onClick={() => onInputChange()}>
          Search
        </button>
      </div>
      {props.showVideos ? (
        results ? (
          <div className="video_section">
            {results.map((i) => {
              return (
                <div className="video" key={i.etag}>
                  <div
                    className="thumbnail"
                    onClick={() => {
                      return (
                        props.setVideoID(i.id.videoId),
                        props.setShowVideos(false)
                      );
                    }}
                  >
                    <img
                      src={i.snippet.thumbnails.medium.url}
                      alt="thumbnail"
                    ></img>
                  </div>
                  <div className="text">
                    <div className="title"> {i.snippet.title} </div>
                    <div className="channel"> {i.snippet.channelTitle}</div>
                    <div className="description">{i.snippet.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default Header;
