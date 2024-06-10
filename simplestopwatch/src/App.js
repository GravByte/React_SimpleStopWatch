import './App.css';
import React from 'react';

function App() {
  const [isOn, setIsOn] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  
  React.useEffect(() => {
    let interval;

    if (isOn) { 
      setStartTime(Date.now() - elapsedTime);
      interval = setInterval(
        () => setElapsedTime(Date.now() - startTime),
        1,
      );
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOn, elapsedTime, startTime]);

  const onReset = () => {
    setIsOn(false);
    setElapsedTime(0);
  };

  const formatTime = () => {
    const timer = elapsedTime;
    const getMinutes = Math.floor((timer / (1000 * 60)) % 60);
    const getSeconds = Math.floor((timer / 1000) % 60);
    const getMilliseconds = Math.floor(timer % 1000);
  
    // Pad the minutes, seconds and milliseconds with zeros on the left if necessary
    const paddedMinutes = String(getMinutes).padStart(2, '0');
    const paddedSeconds = String(getSeconds).padStart(2, '0');
    const paddedMilliseconds = String(getMilliseconds).padStart(3, '0');
  
    // Slice the string to get only the first two digits
    const twoDecimalMilliseconds = paddedMilliseconds.slice(0, 2);
  
    return `${paddedMinutes}:${paddedSeconds}:${twoDecimalMilliseconds}`;
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="timer">{formatTime()}</div>

        {!isOn && (
        <button type="button" onClick={() => setIsOn(true)} className="button">
          Start
        </button>
      )}

      {isOn && (
        <button type="button" onClick={() => setIsOn(false)} className="button">
          Stop
        </button>
      )} 

      <button type="button" disabled={elapsedTime === 0} onClick={onReset} className="button">
        Reset
      </button>

      </header>
    </div>
  );
}

export default App;
