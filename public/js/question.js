const getEventTime = timing => {
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
  const seconds = _("seconds");
  const minutes = _("minutes");
  const hours = _("hours");
  const days = _("days");
  
  getEventTime("End").then(time => {
    if(!time.err) {
      seconds.innerText = parseInt(time.seconds) % 60;
      minutes.innerText = parseInt((time.seconds) / 60) % 60;
      hours.innerText = parseInt(((time.seconds) / 60) / 60) % 24;
      days.innerText = parseInt((((time.seconds) / 60) / 60) / 24);
  
      const Clear = () => {
        clearInterval(setSeconds);
      };
      let timeInSec = time.seconds
      const setSeconds = setInterval(() => {
        if (
          seconds.innerText == 0 &&
          minutes.innerText == 0 &&
          hours.innerText == 0 &&
          days.innerText == 0
        ) {
          Clear();
          document.location.replace(document.location.origin + "/thankyou");
        } else {
          seconds.innerText = parseInt(timeInSec) % 60;
          minutes.innerText = parseInt((timeInSec) / 60) % 60;
          hours.innerText = parseInt(((timeInSec) / 60) / 60) % 24;
          days.innerText = parseInt((((timeInSec) / 60) / 60) / 24);
          timeInSec--;
        }
      }, 1000);
    }
  });
  