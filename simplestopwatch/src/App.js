import './App.css';
import React from 'react';

function App() {
  const [isOn, setIsOn] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  
  React.useEffect(() => {
    let interval;

    if (isOn) { 
      interval = setInterval(
      () => setTimer(timer + 1),
      1000,
      );
    }

    return () => clearInterval(interval);
  }, [isOn, timer]);


  const onReset = () => {
    setIsOn(false);
    setTimer(0);
  };

  return (
    <div className="App">
      <header className="App-header">
      {timer}

        {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Start
        </button>
      )}

      {isOn && (
        <button type="button" onClick={() => setIsOn(false)}>
          Stop
        </button>
      )} 

      <button type="button" disabled={timer === 0} onClick={onReset}>
        Reset
      </button>

      </header>
    </div>
  );
}

export default App;
