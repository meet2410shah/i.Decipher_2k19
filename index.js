// Database Connection
const connection = require(`./database/connection`);

// Configuration File
const config = require(`config`);
const URL = config.get(`SERVER.URL`);
const PORT = process.env.PORT || config.get(`SERVER.PORT`);

// Express App Setup
const express = require(`express`);
const app = express();

// Database connection
const Teams = require(`./database/models/teams`);

// Middleware require
const {
  checkIdentity,
  checkEventEndTime,
  setLocals
} = require(`./middleware/index/main`);

// Modules
const cors = require(`cors`);
const cookieParser = require(`cookie-parser`);
const favicon = require(`serve-favicon`);
const fileUpload = require(`express-fileupload`);

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
const admin = require(`./routes/admin`);

// View Engine Setup
app.set(`view engine`, `ejs`);

// Express App Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));
app.use(cookieParser());
app.use(cors());
app.use(favicon(`${__dirname}/public/images/favicon.ico`));
app.use(fileUpload());

// Routes Setup
app.use(checkIdentity);
app.use(setLocals);
app.use(checkEventEndTime);
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
app.use(`/admin`, admin);
app.get(`*`, (req, res) => {
  res.redirect(`/`);
});

// App Listening
app.listen(PORT, () => {
  console.log(`Server started on ${URL} : ${PORT}`);
});
