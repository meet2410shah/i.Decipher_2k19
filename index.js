// Database Connection
const connection = require(`./database/connection`);

// Configuration File
const config = require(`config`);
const URL = config.get(`SERVER.URL`);
const PORT = process.env.PORT || config.get(`SERVER.PORT`);

// Express App Setup
const express = require(`express`);
const app = express();

// Modules
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);
const favicon = require(`serve-favicon`);

// Routes Required
const welcome = require(`./routes/welcome`);
const rules = require(`./routes/rules`);
const login = require(`./routes/login`);
const signup = require(`./routes/signup`);
const logout = require(`./routes/logout`);
const question = require(`./routes/question`);
const questions = require(`./routes/questions`);
const dashboard = require(`./routes/dashboard`);
const unautherized = require(`./routes/unautherized`);
const thankyou = require(`./routes/thankyou`);

// View Engine Setup
app.set(`view engine`, `ejs`);

// Express App Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));
app.use(cookieParser());
app.use(cors());
app.use(favicon(`${__dirname}/public/images/favicon.ico`));

// Routes Setup
app.use(`/`, welcome);
app.use(`/rules`, rules);
app.use(`/login`, login);
app.use(`/signup`, signup);
app.use(`/question`, question);
app.use(`/logout`, logout);
app.use(`/questions`, questions);
app.use(`/dashboard`, dashboard);
app.use(`/unautherized`, unautherized);
app.use(`/thankyou`, thankyou);
app.get(`*`, (req, res) => {
  res.redirect(`/`);
});

// App Listening
app.listen(PORT, () => {
  console.log(`Server started on ${URL} : ${PORT}`);
});