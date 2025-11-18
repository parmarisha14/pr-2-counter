import React, { useState, useRef, useEffect } from "react";
import "./Counter.css";

const Counter = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const startRef = useRef(0);
  const intervalRef = useRef(null);

  // START
  const start = () => {
    setRunning(true);
    startRef.current = Date.now() - time;
  };

  // STOP
  const stop = () => {
    setRunning(false);
  };

  // RESET
  const reset = () => {
    setRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startRef.current);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  // FORMAT TIME
  const formatTime = () => {
    const minutes = String(Math.floor((time / 1000 / 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const ms = String(Math.floor((time % 1000) / 10)).padStart(2, "0");

    return `${minutes}:${seconds}:${ms}`;
  };

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>

      <div className="controls">
        <button className="start-button" onClick={start}>Start</button>
        <button className="stop-button" onClick={stop}>Stop</button>
        <button className="reset-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
