const express = require("express");
const counter = require("./routes/counter/counter");
const http = require("http");

const { connectdb } = require("./db");

const app = express();
const server = http.createServer(app);

const passport = require("./setuppassport");
const session = require("express-session");

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/counter", counter);
app.use(express.static("public"));

app.use(
  session({
    secret: "iDecipher iFest 2k19",
    resave: false,
    saveUninitialized: true
    // maxAge: 1000*30
  })
);

app.use(passport.initialize());
app.use(passport.session());

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

app.get("/signup", (req, res) => res.render("signup"));
app.post("/signup", async (req, res) => {
  if (validateEmail(req.body.email)) {
    db = await connectdb("iDecipher");
    const Users = db.collection("users");

    Users.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          let errorM = "username already taken";
          res.render("signup", { errorM });
        } else {
          Users.insertOne({
            name1: req.body.name1,
            name2: req.body.name2,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
          })
            .then(user => {
              console.log(user);
              res.redirect("/");
            })
            .catch(err => {
              console.error(err);
              res.redirect("/signup");
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    let errorM = "enter a valid email";
    res.render("signup", { errorM });
  }
});

function checkLoggedIn(req, res, next) {
  if (req.user) {
    username = req.user.username;
    return next();
  }
  res.redirect("/");
}

app.get("/", (req, res) => res.render("login"));

app.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
    // failureFlash : true
  })
);

app.get("/home", checkLoggedIn, (req, res) => {
  res.render("rules");
});

app.use("*", checkLoggedIn, express.static(__dirname + "/public"));

app.get("/1", checkLoggedIn, (req, res) => {
  let q = { head: "Identify the place ", image: "img1.jpg" };
  res.render("question", { q });
});

const port = process.env.PORT || 4848;

server.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
