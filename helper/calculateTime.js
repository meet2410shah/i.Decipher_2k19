const calculateTime = eventDate => {
  let time = {};
  let currentDate = Date.now();
  let sec = (eventDate - currentDate) / (1000);
  if (sec < 0) {
    time.err = {
      message: "Competition is completed!"
    };
    time.seconds = 0;
    time.minutes = 0;
    time.hours = 0;
    time.days = 0;
    return time;
  }
  time.seconds = Math.floor(sec % 60);
  let minute = sec / 60;
  time.minutes = Math.floor(minute % 60);
  let hour = minute / 60;
  time.hours = Math.floor(hour % 24);
  time.days = Math.floor(hour / 24);
  return time;
};

module.exports = calculateTime;
