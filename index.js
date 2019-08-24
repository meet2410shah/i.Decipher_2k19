// Database Connection
const connection = require('./database/connection');

const config = require('config');
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();

// Different Routes are Added.
const counter = require("./routes/counter/counter");
const signup = require("./routes/signup");
const thankyou = require("./routes/thankyou");
const question = require("./routes/question");
const questions = require("./routes/questions");
const login = require("./routes/login");
const welcome = require("./routes/welcome");
const rules = require("./routes/rules");
const verification = require('./routes/verification');

// Set View Engine
app.set("view engine", "ejs");

// Set up express App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Setup
app.use('/', welcome);
app.use('/rules', rules);
app.use('/login', login);
app.use("/signup", signup);
app.use("/counter", counter);
app.use("/question", question);
app.use('/questions', questions);
app.use("/thankyou", thankyou);
app.use("/verification", verification);

const PORT = process.env.PORT || config.get('SERVER.PORT');
app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});