import React from 'react';

export const useTimer = (initialIsOn = false, initialStartTime = 0, initialElapsedTime = 0) => {
  const [isOn, setIsOn] = React.useState(initialIsOn);
  const [startTime, setStartTime] = React.useState(initialStartTime);
  const [elapsedTime, setElapsedTime] = React.useState(initialElapsedTime);

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

  const onReset = () => {
    setIsOn(false);
    setElapsedTime(0);
  };

  return { isOn, setIsOn, elapsedTime, onReset };
};