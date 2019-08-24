# i.Decipher_2k19
Web App for the event i.Decipher of iFest'19("Evanascent Qualm")
## How to start the app?
STEP: 1 Run `npm install`  
STEP: 2 Run `nodemon`  
STEP: 3 Open `localhost`
---
## Description
### Counter:
#### **The Async function getTime:**
>  Create the function given below in script.js  
>  File Path: `/public/js/script.js`  
>   _parameter_ has two value :  
>>  1. `  "Start"` : This will return the start time of the event. (EVENT_DURATION = TWO_HOURS)
>>  2. `  "End"` : This will return the end time of the event.
```
  async function getTime() {
      const time = await getEventTime(_parameter_);
      // Here you will get the time object
  }
```
***
#### **Time Object**: 
> This async function will return time object with the following properties  
> `err` obeject is undefined until the event ends;
```
  let time: {
    err: {
      message: string;
    };
    seconds: number
  };
```
***
