import './App.css';
import React from 'react';

function App() {
  // Variables
  const [isOn, setIsOn] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [userInputMins, setUserInputMins] = React.useState();
  const [userInputSeconds, setUserInputSeconds] = React.useState();
  const userInputTotalSeconds = (userInputMins || 0) * 60 + (userInputSeconds || 0);
  const elapsedSeconds = Math.floor(elapsedTime / 1000);

  // Timer user input limit
  // Minutes
  const handleInputChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 59) {
      value = 59;
    }
    setUserInputMins(value ? value : null);
  };
  // Seconds
  const handleInputChangeSeconds = (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 59) {
      value = 59;
    }
    setUserInputSeconds(value ? value : null);
  };

  // Logic for resetting the stopwatch
  const handleStopwatchReset = () => {
    const audio = new Audio('./beep.mp3');
    audio.play();
    onReset();
    return '00:00.00';
  };
  
  // Stopwatch timer logic
  React.useEffect(() => {
    let interval;

    if (isOn) { 
      setStartTime(Date.now() - elapsedTime);
      interval = setInterval(
        () => setElapsedTime(Date.now() - startTime),
        100,
      );
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOn, elapsedTime, startTime]);

  // Reset the stopwatch when called
  const onReset = () => {
    setIsOn(false);
    setElapsedTime(0);
  };

  // Format the time to display on the stopwatch like 00:00.00 (mm:ss.ms)
  const formatTime = () => {
    const timer = elapsedTime;
    const getMinutes = Math.floor((timer / (1000 * 60)) % 60);
    const getSeconds = Math.floor((timer / 1000) % 60);
    const getMilliseconds = Math.floor(timer % 1000);

    // If the timer hits 60 minutes, reset the stopwatch
    if (getMinutes >= 60) {
      return handleStopwatchReset();
    }
    
    // If the user enters a time, stop the stopwatch when the time is reached
    if (userInputTotalSeconds > 0 && elapsedSeconds >= userInputTotalSeconds) {
      return handleStopwatchReset();
    }

    // Pad the minutes, seconds and milliseconds with zeros on the left if necessary
    const paddedMinutes = String(getMinutes).padStart(2, '0');
    const paddedSeconds = String(getSeconds).padStart(2, '0');
    const paddedMilliseconds = String(getMilliseconds).padStart(2, '0');
  
    // Slice the string to get only the first two digits
    const twoDecimalMilliseconds = paddedMilliseconds.slice(0, 2);
  
    // Return the formatted time to display on the stopwatch
    return `${paddedMinutes}:${paddedSeconds}.${twoDecimalMilliseconds}`;
  }

  return (
    <div className="App">
      <header className="App-header"> <h1>Simple Stopwatch</h1>
      <paragraph className="app-paragraph">
      <h2>Instructions:</h2>
      <p>Click Start to begin the stopwatch.</p>
      <p>Click Stop to pause the stopwatch.</p>
      <p>Click Reset to stop & return the stopwatch to 00:00.00.</p>
      <p>The stopwatch auto resets once time specified has passed or otherwise 60 minutes if specified time is null/0.</p>
      </paragraph>

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

      <p>Set an end time:</p>

      <div className="input-container">
      <input 
        type="number" 
        min="0"
        max="59"
        value={userInputMins} 
        onChange={handleInputChange} 
        placeholder="Mins"
        className="input-box"
      />
      <input 
        type="number" 
        min="0"
        max="59"
        value={userInputSeconds} 
        onChange={handleInputChangeSeconds} 
        placeholder="Secs"
        className="input-box"
      />
      </div>

      </header>
    </div>
  );
}

export default App;
