import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
  const playerRef = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [duration,setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleVisibilityChange = () => {
    if (document.hidden && playerRef.current) {
      setisPlaying(false);
    }else{
      setisPlaying(true);
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  const handleTimeUpdate = (time) => {
    let currentTime = Math.round(time);
    setCurrentTime(currentTime);
    console.log(currentTime);
    if ((currentTime == 5) && !showMessage) {
      setShowMessage(true);
      if (playerRef.current) {
        console.log("hola");
        setisPlaying(false);
      }
    }
  };

  const handleResume = () => {
    setShowMessage(false);
    setisPlaying(true);
  };

  const handleOnPlay = () => {
    if (isPlaying == false) setisPlaying(true)
    if (showMessage) {
      setShowMessage(false);
    }
    console.log("estoy repro");
  };

  const handlePause = () => {
    console.log("me pause");
    if (playerRef.current) {
    }
  };

  const handleDuration = (duration) => {
    let totalDuration = Math.round(duration);
   
    setDuration(totalDuration)
  }


  return (
    <div className="App">
      <h1>Video Player</h1>
      <div className="video-player">
        <ReactPlayer
          ref={playerRef}
          url="https://d1lkn153fcyomr.cloudfront.net/100117698.mp4"
          playing={isPlaying}
          controls
          onProgress={(progress) => handleTimeUpdate(progress.playedSeconds)}
          onPlay={handleOnPlay}
          onPause={handlePause}
          onDuration={handleDuration}
        
        />
        {showMessage && (
          <div className="message">
            <p>Video pausando</p>
            <button onClick={handleResume}>reanudar</button>
          </div>
        )}
      </div>
      <div className="controls">
        <p>tiempo reproducido: {currentTime.toFixed(2)} segundos</p>
        <p>duracion total: {duration.toFixed(2)} segundos</p>

      </div>
    </div>
  );
}

export default App;