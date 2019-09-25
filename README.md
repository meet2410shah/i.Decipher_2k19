# i.Decipher_2k19
Web App for the event i.Decipher of iFest'19 (Evanascent Qualm)
## How to start the app?  
> STEP: 1 Run `npm install`  
> STEP: 2 Run `nodemon`  
> STEP: 3 Open `localhost`
---
## Description
### Routes:
#### welcome  
> If user is not registered or logged in, then user will get this route as "/".
#### rules  
> Registered User is redirected to "/rules" to accept all the rules.
#### login  
> If a user wants to log in. One need to go to "/login".
#### signup  
> If a user wants to sign in. One need to go to "/signup".
#### logout  
> If a user wants to log in. One need to go to "/logout" (POST).
#### question  
> If the event is stared then redirected to "/question/:id".
#### questions  
> An extra route to redirect to current question.
#### dashboard  
> If the event is not started yet, then it is redirected to "/dashboard".
#### unautherized  
> If the user is not autherized then it is redirected to "/unautherized".
#### thankyou  
> If the event is completed then user is redirected to "/thankyou"

### Counter:
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
