const calculateTime = eventDate => {
  let time = {};
  remaining = eventDate - Date.now();
  if (remaining < 0) {
    time.err = {
      message: "Competition is completed!"
    };
    return time;
  }
  let remainingSeconds = remaining / 1000;
  time.seconds = Math.floor(remainingSeconds % 60);
  let remainingMinutes = remainingSeconds / 60;
  time.minutes = Math.floor(remainingMinutes % 60);
  let remaingHours = remainingMinutes / 60;
  time.hours = Math.floor(remaingHours % 24);
  time.days = Math.floor(remaingHours / 24);
  return time;
};

module.exports = calculateTime;
