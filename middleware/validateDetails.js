const validateDetails = (req, res, next) => {
    const { email, name1, name2, teamName, password, phone } = req.body;
    
    // Validate participant name
    if(!(name1.length >= 3 && name2.length >= 3)) {
      return res.render('signup', {
        err: {
          msg: "Participant Name must be 3 character long.",
          code: 1000
        }
      });
    }

    // Validate team Name
    if((teamName.length < 3)) {
      return res.render('signup', { err: {
        msg: "Team Name should be at least 4 character long.",
        code: 1001
      }});
    }

    // Validate Email
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return res.render("signup", {
        err: {
          msg: "Please enter a valid email address.",
          code: 502
        }
      });
    }
    return next();
};
  
module.exports = validateDetails;