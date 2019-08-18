# i.Decipher_2k19
---
Web App for the event i.Decipher of iFest'19("Evanascent Qualm")
---
## Description
---
### Counter:
#### **async function getTime**
##### File Path: `/public/js/script.js`
##### Create the function given below in script.js
```
  async function getTime(_parameter_) {
      const time = await getEventTime(_parameter_);
      // Here you will get the time object
  }
```
#### Time Object: 
##### This async function will return time object with the following properties
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
