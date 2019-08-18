# i.Decipher_2k19
Web App for the event i.Decipher of iFest'19("Evanascent Qualm")
## Description
### Counter:
#### **async function getTime**
##### File Path: `/public/js/script.js`
##### Create the function given below in script.js
##### _parameter_ has two value :
##### 1. `  "Start"` : This will return the start time of the event. (EVENT_DURATION = TWO_HOURS)
##### 2. `  "End"` : This will return the end time of the event.
```
  async function getTime() {
      const time = await getEventTime(_parameter_);
      // Here you will get the time object
  }
```
#### Time Object: 
##### This async function will return time object with the following properties
##### `err` obeject is undefined until the eventEnds;
```
  let time: {
    err: {
      message: string;
    };
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
```
