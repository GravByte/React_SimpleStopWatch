export function formatTime(elapsedTime, handleStopwatchReset, userInputTotalSeconds, elapsedSeconds) {
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