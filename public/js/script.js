const _ = el => {
  return document.getElementById(el);
};

const seconds = _("seconds");
const minutes = _("minutes");
const hours = _("hours");
const days = _("days");

const Clear = () => {
  clearInterval(setSeconds);
  clearInterval(checkTime);
};
const checkTime = setInterval(() => {
  if (
    seconds.innerText == 0 &&
    minutes.innerText == 0 &&
    hours.innerText == 0 &&
    days.innerText == 0
  ) {
    Clear();
    document.location.replace(document.location.origin + "/thankyou");
  }
}, 1000);

const setSeconds = setInterval(() => {
  seconds.innerText = parseInt(seconds.innerText) <= 0 ? 59 : parseInt(seconds.innerText) - 1;
  if(parseInt(seconds.innerText) === 59) {
    minutes.innerText = parseInt(minutes.innerText) <= 0 ? 59 : parseInt(minutes.innerText) - 1;
    if(parseInt(minutes.innerText) === 59) {
      hours.innerText = parseInt(hours.innerText) <= 0 ? 23 : parseInt(hours.innerText) - 1;
      if(parseInt(hours.innerText) === 23) {
        days.innerText = parseInt(days.innerText) <= 0 ? 0 : parseInt(days.innerText) - 1;
      }
    }
  }
}, 1000);