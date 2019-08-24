const calculateTime = eventDate => {
  let time = {};
  remaining = eventDate - Date.now();
  if (remaining < 0) {
    time.err = {
      message: "Competition is completed!"
    };
    time.seconds = 0;
    return time;
  }
  let remainingSeconds = remaining / 1000;
  time.seconds = remainingSeconds;
  return time;
};

module.exports = calculateTime;
