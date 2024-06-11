export const handleInputChangeMins = (setUserInputMins) => (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 59) {
      value = 59;
    }
    setUserInputMins(value ? value : null);
  };
  
  export const handleInputChangeSeconds = (setUserInputSeconds) => (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 59) {
      value = 59;
    }
    setUserInputSeconds(value ? value : null);
  };