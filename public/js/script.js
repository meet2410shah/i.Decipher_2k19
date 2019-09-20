/*const getEventTime = timing => {
  return new Promise((resolve, reject) => {
    let time = {};
    var hr = new XMLHttpRequest();
    hr.onreadystatechange = function() {
      if (hr.readyState === 4 && hr.status === 200) {
        try {
          time = JSON.parse(hr.responseText);
          resolve(time);
        } catch (e) {
          reject(e);
        }
      }
    };
    hr.open("GET", `/counter/getEvent${timing}Time`, true);
    hr.send();
  });
};

const _ = el => {
  return document.getElementById(el);
};

const seconds = _("seconds");
const minutes = _("minutes");
const hours = _("hours");
const days = _("days");

getEventTime("Start").then(time => {
  if(!time.err) {
    seconds.innerText = parseInt(time.seconds) % 60;
    minutes.innerText = parseInt((time.seconds) / 60) % 60;
    hours.innerText = parseInt(((time.seconds) / 60) / 60) % 24;
    days.innerText = parseInt((((time.seconds) / 60) / 60) / 24);

    const Clear = () => {
      clearInterval(setSeconds);
      clearInterval(checkSeconds);
    };
    let timeInSec = time.seconds;
    const checkSeconds = setInterval(() => {
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
      seconds.innerText = parseInt(timeInSec) % 60;
      minutes.innerText = parseInt((timeInSec) / 60) % 60;
      hours.innerText = parseInt(((timeInSec) / 60) / 60) % 24;
      days.innerText = parseInt((((timeInSec) / 60) / 60) / 24);
      timeInSec--;
    }, 1000);
  } else {
    seconds.innerText = 0;
    minutes.innerText = 0;
    hours.innerText = 0;
    days.innerText = 0;
  }
});*/

// New Logic for counter
/*const _ = el => {
  return document.getElementById(el);
};

const seconds = _("seconds");
const minutes = _("minutes");
const hours = _("hours");
const days = _("days");

const setSeconds = setInterval(() => {
  seconds.innerText = parseInt(seconds.innerText) <= 0 ? 59 : --parseInt(seconds.innerText);
  if(parseInt(seconds.innerText) === 59) {
    minutes.innerText = parseInt(minutes.innerText) <= 0 ? 59 : --parseInt(minutes.innerText);
    if(parseInt(minutes.innerText) === 59) {
      hours.innerText = parseInt(hours.innerText) <= 0 ? 23 : --parseInt(hours.innerText);
      if(parseInt(hours.innerText) === 23) {
        days.innerText = parseInt(days.innerText) <= 0 ? 0 : --parseInt(days.innerText);
      }
    }
  }
}, 1000);*/