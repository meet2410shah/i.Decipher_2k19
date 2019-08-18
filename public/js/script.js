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
