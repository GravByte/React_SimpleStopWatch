import './App.css';
import React from 'react';
import { useTimer } from './TimerLogic';
import { handleInputChangeMins, handleInputChangeSeconds } from './InputHandlers';
import { formatTime } from './TimeFormatter';

function App() {
  // Variables
  const { isOn, setIsOn, elapsedTime, onReset } = useTimer();
  const [userInputMins, setUserInputMins] = React.useState();
  const [userInputSeconds, setUserInputSeconds] = React.useState();
  const userInputTotalSeconds = (userInputMins || 0) * 60 + (userInputSeconds || 0);
  const elapsedSeconds = Math.floor(elapsedTime / 1000);

  // Timer user input limit
  // Use the imported functions
  const handleMinsChange = handleInputChangeMins(setUserInputMins);
  const handleSecsChange = handleInputChangeSeconds(setUserInputSeconds);

  // Logic for resetting the stopwatch
  const handleStopwatchReset = () => {
    const audio = new Audio('./beep.mp3');
    audio.play();
    onReset();
    return '00:00.00';
  };

  // Use the formatTime function
  const formattedTime = formatTime(elapsedTime, handleStopwatchReset, userInputTotalSeconds, elapsedSeconds);

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

      <div className="timer">{formattedTime}</div>

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
        onChange={handleMinsChange} 
        placeholder="Mins"
        className="input-box"
      />
      <input 
        type="number" 
        min="0"
        max="59"
        value={userInputSeconds} 
        onChange={handleSecsChange} 
        placeholder="Secs"
        className="input-box"
      />
      </div>

      </header>
    </div>
  );
}

export default App;
