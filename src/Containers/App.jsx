import React, { useState } from "react";
import Header from "../Components/Header";
import "./App.css";
import Content from "../Components/Content"

const App = (props) => {

  const [videoID, setVideoID] = useState(null);

  const [showVideos, setShowVideos] = useState(true);
  
  return <div className="App">
    <Header setVideoID={setVideoID} setShowVideos={setShowVideos} showVideos={showVideos}/>
    <Content videoID={videoID} setShowVideos={setShowVideos} showVideos={showVideos}/>
  </div>;
};

export default App;
